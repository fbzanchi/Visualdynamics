import { OnQueueActive, OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { SIMULATION_TYPE } from "database";
import { existsSync, rmSync, writeFileSync } from "fs";
import * as path from "path";
import { chdir } from "process";
import { PrismaService } from "src/prisma/prisma.service";
import { executeCommands } from "src/utils/executeCommands";
import { loadCommands } from "src/utils/loadCommands";

interface SimulateData {
  simulationId: string;
  userName: string;
  type: SIMULATION_TYPE;
}

@Processor("simulation")
export class SimulationConsumer {
  constructor(private prisma: PrismaService) {}

  @OnQueueActive()
  async onActive(job: Job<SimulateData>): Promise<void> {
    console.log(`Processing job ${job.id}...`);
    await this.prisma.simulation.update({
      where: {
        id: job.data.simulationId,
      },
      data: {
        status: "RUNNING",
        startedAt: new Date(),
      },
    });
    const queuedFilePath = `/files/${job.data.userName}/queued`;
    const runningFilePath = `/files/${job.data.userName}/running`;
    if (existsSync(queuedFilePath)) {
      rmSync(queuedFilePath);
    }
    writeFileSync(runningFilePath, job.data.type);
  }

  @OnQueueFailed()
  async onError(job: Job<SimulateData>, error: Error): Promise<void> {
    console.log(`Error in job: ${job.id}. Error: ${error.message}`);
    await this.prisma.simulation.update({
      where: {
        id: job.data.simulationId,
      },
      data: {
        status: "ERRORED",
        endedAt: new Date(),
        errorCause: error.message,
      },
    });
    rmSync(`/files/${job.data.userName}/running`);
  }

  @Process("simulate")
  async simulate({ data }: Job<SimulateData>): Promise<void> {
    const { type, userName } = data;

    const folder = path.resolve(`/files/${userName}/${type.toLowerCase()}`);

    const folderRun = path.resolve(folder, "run");
    const fileLogPath = path.resolve(folderRun, "logs", "gmx.log");
    const fileStepPath = path.resolve(folder, "steps.txt");
    const fileEndedPath = path.resolve(folder, "ended");

    const commands = await loadCommands(folder);

    chdir(folderRun);
    await executeCommands(commands, fileStepPath, fileLogPath);

    await this.prisma.simulation.update({
      where: {
        id: data.simulationId,
      },
      data: {
        endedAt: new Date(),
        status: "COMPLETED",
      },
    });

    writeFileSync(fileEndedPath, "ended");
    rmSync(`/files/${userName}/running`);
  }
}

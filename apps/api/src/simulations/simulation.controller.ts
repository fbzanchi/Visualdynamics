import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from "@nestjs/platform-express";
import { Express, Request } from "express";
import multerConfig from "src/multer.config";
import { UsernameGuard } from "src/username.guard";

import { SimulationService } from "./simulation.service";
import type { NewSimulationBody } from "./simulation.types";

@Controller("simulation")
export class SimulationController {
  constructor(private simulationService: SimulationService) {}

  @UseGuards(UsernameGuard)
  @Post("/acpype")
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: "filePDB",
          maxCount: 1,
        },
        {
          name: "fileLigandITP",
          maxCount: 1,
        },
        {
          name: "fileLigandPDB",
          maxCount: 1,
        },
      ],
      multerConfig
    )
  )
  async newACPYPESimulation(
    @UploadedFiles()
    files: {
      filePDB: Express.Multer.File[];
      fileLigandITP: Express.Multer.File[];
      fileLigandPDB: Express.Multer.File[];
    },
    @Body() body: NewSimulationBody,
    @Req() request: Request
  ) {
    const { fileLigandITP, fileLigandPDB, filePDB } = files;
    const { simulationId, commands } =
      await this.simulationService.newACPYPESimulation(
        filePDB[0].filename,
        fileLigandITP[0].filename,
        fileLigandITP[0].originalname,
        fileLigandPDB[0].filename,
        body
      );

    if (body.shouldRun && body.shouldRun === "true") {
      await this.simulationService.addSimulationToQueue(
        simulationId,
        request.userName,
        "ACPYPE"
      );

      return "added-to-queue";
    }

    return commands;
  }

  @UseGuards(UsernameGuard)
  @Post("/apo")
  @UseInterceptors(FileInterceptor("filePDB", multerConfig))
  async newAPOSimulation(
    @UploadedFile() filePDB: Express.Multer.File,
    @Body() body: NewSimulationBody,
    @Req() request: Request
  ) {
    if (!filePDB) {
      throw new HttpException("no-pdb-file", HttpStatus.BAD_REQUEST);
    }

    const { simulationId, commands } =
      await this.simulationService.newAPOSimulation(filePDB.filename, body);

    if (body.shouldRun && body.shouldRun === "true") {
      await this.simulationService.addSimulationToQueue(
        simulationId,
        request.userName,
        "APO"
      );

      return "added-to-queue";
    }

    return commands;
  }
}

"use client";
import { Button } from "@mantine/core";
import { Simulation } from "database";

import { getCommandsTxt } from "@/actions/simulation/getCommandsTxt";

interface Props {
  simulation: Simulation;
}

export function DownloadCommands({ simulation }: Props) {
  async function handleDownload() {
    const data = await getCommandsTxt(simulation.type);

    const link = document.createElement("a");
    link.download = `${simulation.type}-${simulation.moleculeName}-${simulation.createdAt}-commands.txt`;
    const blobUrl = window.URL.createObjectURL(
      new Blob([new Uint8Array(Buffer.from(data, "base64"))])
    );

    link.href = blobUrl;
    link.click();
    window.URL.revokeObjectURL(blobUrl);
  }

  return <Button onClick={handleDownload}>Download Commands</Button>;
}

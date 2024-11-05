"use client";
import { Button } from "@mantine/core";
import { Simulation } from "database";

import { getGromacsLogs } from "@/actions/simulation/getGromacsLogs";

interface Props {
  simulation: Simulation;
}

export function DownloadGromacsLogs({ simulation }: Props) {
  async function handleDownload() {
    const data = await getGromacsLogs(simulation.type);

    const link = document.createElement("a");
    link.download = `${simulation.type}-${simulation.moleculeName}-${simulation.createdAt}-logs.txt`;
    const blobUrl = window.URL.createObjectURL(
      new Blob([new Uint8Array(Buffer.from(data, "base64"))])
    );

    link.href = blobUrl;
    link.click();
    window.URL.revokeObjectURL(blobUrl);
  }

  return <Button onClick={handleDownload}>Download Logs</Button>;
}

"use client";

import { Button } from "@mantine/core";
import { Simulation } from "database";

import { getFiguresZip } from "@/actions/simulation/getFiguresZip";

interface Props {
  simulation: Simulation;
}

export function DownloadFigures({ simulation }: Props) {
  async function handleDownload() {
    const data = await getFiguresZip(simulation.type);

    const link = document.createElement("a");
    link.download = `${simulation.type}-${simulation.moleculeName}-${simulation.createdAt}-figures.zip`;
    const blobUrl = window.URL.createObjectURL(
      new Blob([new Uint8Array(Buffer.from(data, "base64"))])
    );

    link.href = blobUrl;
    link.click();
    window.URL.revokeObjectURL(blobUrl);
  }

  return <Button onClick={handleDownload}>Download Figures</Button>;
}

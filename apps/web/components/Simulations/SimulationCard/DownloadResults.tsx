"use client";
import { Button } from "@mantine/core";
import { Simulation } from "database";

import { getResults } from "@/actions/simulation/getResults";

interface Props {
  simulation: Simulation;
}

export function DownloadResults({ simulation }: Props) {
  async function handleDownload() {
    const data = await getResults(simulation.type);

    const link = document.createElement("a");
    link.download = `${simulation.type}-${simulation.moleculeName}-${simulation.createdAt}-results.zip`;
    const blobUrl = window.URL.createObjectURL(
      new Blob([new Uint8Array(Buffer.from(data, "base64"))])
    );

    link.href = blobUrl;
    link.click();
    window.URL.revokeObjectURL(blobUrl);
  }

  return <Button onClick={handleDownload}>Download Results</Button>;
}

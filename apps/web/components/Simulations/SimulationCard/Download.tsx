"use client";
import { useState } from "react";
import { Button } from "@mantine/core";
import { IconDownload, IconTxt, IconZip } from "@tabler/icons-react";
import { Simulation } from "database";

import { getCommandsTxt } from "@/actions/simulation/getCommandsTxt";
import { getFiguresZip } from "@/actions/simulation/getFiguresZip";
import { getGromacsLogs } from "@/actions/simulation/getGromacsLogs";
import { getResultsZip } from "@/actions/simulation/getResultsZip";

import classes from "./Download.module.css";

const download = {
  commands: {
    label: "Download Commands",
    file: "commands.txt",
    fn: getCommandsTxt,
    Icon: IconTxt,
  },
  figures: {
    label: "Download Figures",
    file: "figures.zip",
    fn: getFiguresZip,
    Icon: IconZip,
  },
  gromacsLogs: {
    label: "Download GROMACS Logs",
    file: "logs.txt",
    fn: getGromacsLogs,
    Icon: IconTxt,
  },
  results: {
    label: "Download Results",
    file: "results.zip",
    fn: getResultsZip,
    Icon: IconZip,
  },
};

type Target = keyof typeof download;

interface Props {
  simulation: Simulation;
  target: Target;
}

export function Download({ simulation, target }: Props) {
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadInfo = download[target];

  async function handleDownload() {
    setIsDownloading(true);
    const data = await downloadInfo.fn(simulation.type);
    let filename = simulation.type;

    if (simulation.type === "acpype") {
      filename += `-${simulation.moleculeName}-${simulation.ligandITPName}-${simulation.ligandPDBName}`;
    } else {
      filename += `-${simulation.moleculeName}`;
    }

    filename += `-${simulation.createdAt}`;

    const link = document.createElement("a");
    link.download = `${filename}-${downloadInfo.file}`;
    const blobUrl = window.URL.createObjectURL(
      new Blob([new Uint8Array(Buffer.from(data, "base64"))])
    );

    link.href = blobUrl;
    link.click();
    window.URL.revokeObjectURL(blobUrl);

    setIsDownloading(false);
  }

  return (
    <Button
      loading={isDownloading}
      leftSection={<IconDownload />}
      classNames={{
        root: classes.root,
        inner: classes.inner,
      }}
      onClick={handleDownload}
      rightSection={<downloadInfo.Icon className={classes.bg_icon} size={64} />}
    >
      {downloadInfo.label}
    </Button>
  );
}

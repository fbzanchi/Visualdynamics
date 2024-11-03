"use client";
import { Box, Card, Text, Title } from "@mantine/core";
import { clsx } from "clsx";
import { Simulation, SIMULATION_TYPE } from "database";
import Link from "next/link";

import { dateFormat } from "@/utils/dateFormat";

import { DownloadFigures } from "./DownloadFigures";

import classes from "./SimulationCard.module.css";

interface Props {
  simulation: Simulation | null;
  type: SIMULATION_TYPE;
}

interface LineProps {
  label: string;
  value?: string | null;
}

function Line({ label, value }: LineProps) {
  if (!value) {
    return null;
  }

  return (
    <Box className={classes.line_info}>
      <Text className={classes.line_info_label}>{label}:</Text>
      <Text className={classes.line_info_value}>{value}</Text>
    </Box>
  );
}

export function SimulationCard({ simulation, type }: Props) {
  const background = clsx({
    [classes.queued]: simulation?.status === "QUEUED",
    [classes.errored]: simulation?.status === "ERRORED",
    [classes.running]: simulation?.status === "RUNNING",
    [classes.completed]: simulation?.status === "COMPLETED",
  });

  const border = clsx({
    [classes.queued_border]: simulation?.status === "QUEUED",
    [classes.errored_border]: simulation?.status === "ERRORED",
    [classes.running_border]: simulation?.status === "RUNNING",
    [classes.completed_border]: simulation?.status === "COMPLETED",
  });

  return (
    <Card
      component={simulation?.status === "RUNNING" ? Link : undefined}
      href="/simulations/running"
      className={clsx(classes.default, background, border)}
      withBorder
    >
      <Card.Section className={border} withBorder>
        <Title className={classes.title}>{type}</Title>
      </Card.Section>
      <Box>
        <Title className={classes.section_title}>Simulation Info</Title>
        <Line label="Molecule name" value={simulation?.moleculeName} />
        <Line label="Ligand ITP name" value={simulation?.ligandITPName} />
        <Line label="Ligand PDB name" value={simulation?.ligandPDBName} />
        <Line label="Submitted in" value={dateFormat(simulation?.createdAt)} />
        <Line label="Started at" value={dateFormat(simulation?.startedAt)} />
        <Line label="Ended at" value={dateFormat(simulation?.endedAt)} />
        <Line label="Error cause" value={simulation?.errorCause} />
      </Box>
      {(simulation?.status === "COMPLETED" ||
        simulation?.status === "ERRORED") && (
        <Box>
          <Title className={classes.section_title}>Downloads</Title>
          <DownloadFigures simulation={simulation} />
        </Box>
      )}
    </Card>
  );
}

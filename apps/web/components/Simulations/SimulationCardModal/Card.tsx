"use client";

import { Card, Text, Title } from "@mantine/core";
import { clsx } from "clsx";
import { Simulation } from "database";

import classes from "./Card.module.css";

interface Props {
  simulation: Simulation | null;
  open(): void;
  type: "apo" | "acpype" | "prodrg";
}

export function SimulationCard({ open, simulation, type }: Props) {
  const statusClasses = clsx(classes.default, {
    [classes.null]: !simulation,
    [classes.opacity]: simulation,
    [classes.queued]: simulation?.status === "QUEUED",
    [classes.errored]: simulation?.status === "ERRORED",
    [classes.running]: simulation?.status === "RUNNING",
    [classes.completed]: simulation?.status === "COMPLETED",
  });

  return (
    <Card
      className={statusClasses}
      onClick={simulation ? open : undefined}
      withBorder
    >
      <Card.Section className={statusClasses} withBorder>
        <Title ta="center">{type.toUpperCase()}</Title>
      </Card.Section>
      <Text>Molecule Name: {simulation?.moleculeName}</Text>
      <Text>Status: {simulation?.status}</Text>
      <Text>
        createdAt:{" "}
        {new Date(simulation?.createdAt ?? new Date()).toDateString()}
      </Text>
    </Card>
  );
}

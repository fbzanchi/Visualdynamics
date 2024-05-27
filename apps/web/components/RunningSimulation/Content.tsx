"use client";

import { useRunningSimulation } from "@/hooks/simulation/useRunningSimulation";

import { Container } from "../Layout/Container";

import { Log } from "./Log";

import classes from "./Content.module.css";

export function RunningSimulationContent() {
  const { data, isLoading } = useRunningSimulation();

  if (data === "unauthenticated") {
    return null;
  }

  if (isLoading) {
    return <Container className={classes.container}>loading</Container>;
  }

  if (!data || data === "not-running") {
    return <Container className={classes.container}>Not Running</Container>;
  }

  return (
    <Container className={`${classes.container} ${classes.isRunningContainer}`}>
      <Log logLines={data.logData} />
    </Container>
  );
}

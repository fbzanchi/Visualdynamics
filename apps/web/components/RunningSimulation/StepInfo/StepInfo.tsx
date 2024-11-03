"use client";
import { Box, Loader } from "@mantine/core";

import { useRunningSimulation } from "@/hooks/simulation/useRunningSimulation";

import classes from "./StepInfo.module.css";

export function StepInfo() {
  const { data, isLoading } = useRunningSimulation();

  if (isLoading) {
    return <Loader />;
  }

  if (!data || data === "unauthenticated") {
    return "failed";
  }

  if (data === "not-running") {
    return null;
  }

  return <Box className={classes.container}>running</Box>;
}

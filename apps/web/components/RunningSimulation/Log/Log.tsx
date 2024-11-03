"use client";
import { Box, Loader, Text } from "@mantine/core";

import { useRunningSimulation } from "@/hooks/simulation/useRunningSimulation";

import classes from "./Log.module.css";

export function Log() {
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

  return (
    <Box className={classes.container}>
      {data.logData.map((line, idx) => (
        <Text key={line + idx}>{line}</Text>
      ))}
    </Box>
  );
}

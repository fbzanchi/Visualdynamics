"use client";
import { Box, Loader, Text, Title } from "@mantine/core";
import { IconExclamationMark } from "@tabler/icons-react";

import { useRunningSimulation } from "@/hooks/simulation/useRunningSimulation";

import { RefetchTime } from "./RefetchTime";

import classes from "./Log.module.css";

export function Log() {
  const { data, isLoading } = useRunningSimulation();

  if (isLoading) {
    return (
      <Box className={classes.container}>
        <Loader />
      </Box>
    );
  }

  if (!data || data === "unauthenticated") {
    return "failed";
  }

  if (data === "not-running") {
    return (
      <Box className={classes.not_running_container}>
        <IconExclamationMark size={64} />
        <Title order={3}>You have no simulation running.</Title>
      </Box>
    );
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.container_title}>
        <Title order={3}>Logs</Title>
        <RefetchTime />
      </Box>
      {data.logData.map((line, idx) => (
        <Text key={line + idx}>{line}</Text>
      ))}
    </Box>
  );
}

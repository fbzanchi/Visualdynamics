"use client";
import { Box, Loader, Text } from "@mantine/core";

import { useRunningSimulation } from "@/hooks/simulation/useRunningSimulation";

import classes from "./SubmissionInfo.module.css";

function InfoText({ label, value }: { label: string; value?: string }) {
  return (
    <Box className={classes.text_container}>
      <Text fw="bold" size="xl">
        {label}:
      </Text>
      <Text size="xl">{value}</Text>
    </Box>
  );
}

export function SubmissionInfo() {
  const { data, isLoading } = useRunningSimulation();

  console.log(data);

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
      <InfoText label="Simulation Type" value={data.submissionInfo.type} />
      <InfoText
        label="Molecule Name"
        value={data.submissionInfo.moleculeName}
      />
    </Box>
  );
}

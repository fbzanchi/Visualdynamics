"use client";
import { Fragment } from "react";
import { Box, Loader, Text } from "@mantine/core";

import { useRunningSimulation } from "@/hooks/simulation/useRunningSimulation";
import { dateFormat } from "@/utils/dateFormat";

import classes from "./SubmissionInfo.module.css";

function InfoText({ label, value }: { label: string; value?: string | null }) {
  if (!value) {
    return null;
  }

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
        label="Molecule name"
        value={data.submissionInfo.moleculeName}
      />
      {data.submissionInfo.type === "acpype" && (
        <Fragment>
          <InfoText
            label="Ligand ITP name"
            value={data.submissionInfo.ligandITPName}
          />
          <InfoText
            label="Ligand PDB name"
            value={data.submissionInfo.ligandPDBName}
          />
        </Fragment>
      )}
      <InfoText
        label="Started at"
        value={dateFormat(data.submissionInfo.startedAt)}
      />
      <InfoText
        label="Submitted at"
        value={dateFormat(data.submissionInfo.createdAt)}
      />
    </Box>
  );
}

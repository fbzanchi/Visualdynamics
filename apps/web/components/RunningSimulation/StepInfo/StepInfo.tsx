"use client";
import { Fragment } from "react";
import { Box, Loader, Title } from "@mantine/core";
import { IconArrowDown } from "@tabler/icons-react";

import { useRunningSimulation } from "@/hooks/simulation/useRunningSimulation";

import { Step } from "./Step";

import classes from "./StepInfo.module.css";

const steps = {
  topology: "Topology definition",
  solvate: "Defining Box and Solvating",
  ions: "Adding Ions",
  minimizationsteepdesc: "Steep Descent Minimization",
  minimizationconjgrad: "Conjugate Gradient Minimization",
  equilibrationnvt: "NVT Equilibration",
  equilibrationnpt: "NPT Equilibration",
  productionmd: "MD Production",
  analyzemd: "MD Analysis",
};

export function StepInfo() {
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
    return null;
  }

  return (
    <Box className={classes.container}>
      <Title order={3}>Steps</Title>
      {Object.entries(steps).map(([key, value]) => {
        const isRunning = data.stepData[data.stepData.length - 1] === `#${key}`;
        const isDone = data.stepData
          .slice(0, data.stepData.length - 1)
          .some((k) => k === `#${key}`);

        let state: StepState = "waiting";

        if (isDone) {
          state = "done";
        }

        if (isRunning) {
          state = "inprogress";
        }

        return (
          <Fragment key={key}>
            <Step state={state} label={value} />
            {key !== "analyzemd" && (
              <IconArrowDown className={classes.arrow_down_icon} />
            )}
          </Fragment>
        );
      })}
    </Box>
  );
}

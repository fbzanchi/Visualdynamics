"use client";
import { Box, Loader } from "@mantine/core";

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
          console.log(
            data.stepData[data.stepData.length - 1],
            key,
            state,
            value
          );
          state = "inprogress";
        }

        return <Step key={key} state={state} label={value} />;
      })}
    </Box>
  );
}

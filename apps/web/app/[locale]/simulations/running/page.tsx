import { Box, Title } from "@mantine/core";

import { PageLayout } from "@/components/Layout/PageLayout";
import { Log } from "@/components/RunningSimulation/Log/Log";
import { StepInfo } from "@/components/RunningSimulation/StepInfo/StepInfo";
import { SubmissionInfo } from "@/components/RunningSimulation/SubmissionInfo/SubmissionInfo";

import classes from "./page.module.css";

export default function Page() {
  return (
    <PageLayout>
      <Title>Running Simulation</Title>

      <Box className={classes.container}>
        <StepInfo />
        <Box className={classes.container_stack}>
          <SubmissionInfo />
          <Log />
        </Box>
      </Box>
    </PageLayout>
  );
}

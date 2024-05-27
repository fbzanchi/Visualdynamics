import { Title } from "@mantine/core";

import { PageLayout } from "@/components/Layout/PageLayout";
import { RunningSimulationContent } from "@/components/RunningSimulation/Content";

export default function Page() {
  return (
    <PageLayout>
      <Title>Running Simulation</Title>

      <RunningSimulationContent />
    </PageLayout>
  );
}

import { Title } from "@mantine/core";

import { PageLayout } from "@/components/Layout/PageLayout";
import { SimulationsContent } from "@/components/Simulations/Content";

export default function Page() {
  return (
    <PageLayout>
      <Title>Running Simulation</Title>

      <SimulationsContent />
    </PageLayout>
  );
}

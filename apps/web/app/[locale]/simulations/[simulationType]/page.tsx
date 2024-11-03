import { Title } from "@mantine/core";

import { PageLayout } from "@/components/Layout/PageLayout";
import { NewSimulationForm } from "@/components/NewSimulationForm";

interface Props {
  params: Promise<{
    simulationType: SimulationType;
  }>;
}

export default async function NewSimulationPage({ params }: Props) {
  const { simulationType } = await params;

  return (
    <PageLayout>
      <Title>New {simulationType.toUpperCase()} Simulation</Title>
      <NewSimulationForm simulationType={simulationType} />
    </PageLayout>
  );
}

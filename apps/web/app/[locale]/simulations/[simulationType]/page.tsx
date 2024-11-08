import { Title } from "@mantine/core";
import { SIMULATION_TYPE } from "database";

import { PageLayout } from "@/components/Layout/PageLayout";
import { NewSimulationForm } from "@/components/NewSimulationForm";

interface Props {
  params: Promise<{
    simulationType: SIMULATION_TYPE;
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

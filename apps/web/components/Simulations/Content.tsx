"use client";

import { useLatestSimulations } from "@/hooks/simulation/useLatestSimulations";

import { Container } from "../Layout/Container";

import { SimulationCardModal } from "./SimulationCardModal";

import classes from "./Content.module.css";

export function SimulationsContent() {
  const { data, isLoading } = useLatestSimulations();

  if (data === "unauthenticated") {
    return null;
  }

  if (isLoading) {
    return <Container className={classes.container}>loading</Container>;
  }

  if (!data) {
    return null;
  }

  return (
    <Container className={classes.container}>
      {Object.keys(data).map((s, i) => (
        <SimulationCardModal
          key={data[s as keyof typeof data]?.id ?? `${i}-simulation-card`}
          simulation={data[s as keyof typeof data]}
          type={s as keyof typeof data}
        />
      ))}
    </Container>
  );
}

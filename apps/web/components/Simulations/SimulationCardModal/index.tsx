"use client";

import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Simulation } from "database";

import { SimulationCard } from "./Card";

interface Props {
  simulation: Simulation | null;
  type: "apo" | "acpype" | "prodrg";
}

export function SimulationCardModal({ simulation, type }: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <SimulationCard open={open} simulation={simulation} type={type} />

      <Modal opened={opened} centered onClose={close} title="Authentication">
        {/* Modal content */}
      </Modal>
    </>
  );
}

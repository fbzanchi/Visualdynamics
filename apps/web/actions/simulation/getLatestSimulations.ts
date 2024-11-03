"use server";
import { Simulation, SIMULATION_TYPE } from "database";

import { api } from "@/lib/apis";

import { validateSession } from "../auth/validateSession";

export type LatestSimulations = {
  [key in SIMULATION_TYPE]: Simulation | null;
};

export async function getLatestSimulations() {
  const { user } = await validateSession();

  if (!user) {
    return "unauthenticated";
  }

  const response = await api.get<LatestSimulations>("/simulation/latest", {
    headers: {
      "x-username": user.userName,
    },
  });

  return response.data;
}

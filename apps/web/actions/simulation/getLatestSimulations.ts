"use server";
import { Simulation, SIMULATION_TYPE } from "database";

import { api } from "@/lib/apis";

import { validateAuth } from "../auth/validateAuth";

export type LatestSimulations = {
  [key in SIMULATION_TYPE]: Simulation | null;
};

export async function getLatestSimulations() {
  const { user } = await validateAuth();

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

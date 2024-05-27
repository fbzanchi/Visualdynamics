"use server";

import { Simulation } from "database";

import { api } from "@/lib/apis";
import { validateRequest } from "@/lib/lucia";

export interface LatestSimulations {
  apo: Simulation | null;
  acpype: Simulation | null;
  prodrg: Simulation | null;
}

export async function fetchLatestSimulations() {
  const { user } = await validateRequest();

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

"use server";

import { api } from "@/lib/apis";
import { validateRequest } from "@/lib/lucia";

export type RunningSimulation =
  | {
      logData: string[];
      stepData: string[];
    }
  | "not-running";

export async function getRunningSimulation() {
  const { user } = await validateRequest();

  if (!user) {
    return "unauthenticated";
  }

  const response = await api.get<RunningSimulation>("/simulation", {
    headers: {
      "x-username": user.userName,
    },
  });

  return response.data;
}

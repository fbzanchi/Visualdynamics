"use server";
import { Simulation } from "database";

import { api } from "@/lib/apis";

import { validateAuth } from "../auth/validateAuth";

export type RunningSimulation =
  | {
      logData: string[];
      stepData: string[];
      submissionInfo: Partial<Simulation>;
    }
  | "not-running"
  | "queued";

export async function getRunningSimulation() {
  const { user } = await validateAuth();

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

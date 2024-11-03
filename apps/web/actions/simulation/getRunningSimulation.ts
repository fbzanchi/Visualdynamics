"use server";
import { Simulation } from "database";

import { api } from "@/lib/apis";

import { validateSession } from "../auth/validateSession";

export type RunningSimulation =
  | {
      logData: string[];
      stepData: string[];
      submissionInfo: Partial<Simulation>;
    }
  | "not-running";

export async function getRunningSimulation() {
  const { user } = await validateSession();

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

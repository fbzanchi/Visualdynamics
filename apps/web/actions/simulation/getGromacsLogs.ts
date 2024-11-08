"use server";
import { SIMULATION_TYPE } from "database";

import { api } from "@/lib/apis";

import { validateAuth } from "../auth/validateAuth";

export async function getGromacsLogs(simulationType: SIMULATION_TYPE) {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  const response = await api.get(
    `/simulation/downloads/logs?type=${simulationType}`,
    {
      headers: {
        "x-username": user.userName,
      },
      responseType: "arraybuffer",
    }
  );

  return Buffer.from(response.data).toString("base64");
}

"use server";
import { SIMULATION_TYPE } from "database";

import { api } from "@/lib/apis";

import { validateSession } from "../auth/validateSession";

export async function getResultsZip(simulationType: SIMULATION_TYPE) {
  const { user } = await validateSession();

  if (!user) {
    return "unauthenticated";
  }

  const response = await api.get(
    `/simulation/downloads/results?type=${simulationType}`,
    {
      headers: {
        "x-username": user.userName,
      },
      responseType: "arraybuffer",
    }
  );

  return Buffer.from(response.data).toString("base64");
}

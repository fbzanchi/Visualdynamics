"use server";
import { api } from "@/lib/apis";

import { validateAuth } from "../auth/validateAuth";

type ResponseData = string[] | "added-to-queue" | "queued-or-running";

export async function submitNewSimulation(
  data: FormData,
  simulationType: SimulationType
) {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  try {
    const response = await api.post<ResponseData>(
      `/simulation/${simulationType}`,
      data,
      {
        headers: {
          "x-username": user.userName,
        },
      }
    );

    return response.data;
  } catch (err: any) {
    if (err.status === 409) {
      return "queued-or-running";
    }

    return "unknown-error";
  }
}

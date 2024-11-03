"use server";
import { api } from "@/lib/apis";

import { validateSession } from "../auth/validateSession";

type ResponseData = string[] | "added-to-queue";

export async function submitNewSimulation(
  data: FormData,
  simulationType: SimulationType
) {
  const { user } = await validateSession();

  if (!user) {
    return "unauthenticated";
  }

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
}

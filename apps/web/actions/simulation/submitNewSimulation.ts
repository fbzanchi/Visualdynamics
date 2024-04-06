"use server";

import { api } from "@/lib/apis";
import { validateRequest } from "@/lib/lucia";

type ResponseData = string[] | "added-to-queue";

export async function submitNewSimulation(
  data: FormData,
  simulationType: SimulationType
) {
  const { user } = await validateRequest();

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

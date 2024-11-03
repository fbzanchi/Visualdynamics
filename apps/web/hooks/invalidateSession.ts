"use server";
import { cookies } from "next/headers";

import { validateSession } from "@/actions/auth/validateSession";
import { lucia } from "@/lib/lucia";

export async function invalidateSession() {
  const { session } = await validateSession();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(sessionCookie.name, sessionCookie.value);
}

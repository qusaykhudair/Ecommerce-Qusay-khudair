'use server'

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export default async function getMyToken() {
  const session = await getServerSession(authOptions);

  if (!session || !session.token) {
    console.error("❌ No session or token found in getMyToken");
    return null;
  }

  return session.token as string;
}

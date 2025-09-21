'use server';

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken() {
  try {

    const data = await cookies();

 
    const encryptedToken =
      data.get("next-auth.session-token") || 
      data.get("__Secure-next-auth.session-token"); 

    if (!encryptedToken) {
      console.warn("❌ No session cookie found!");
      return null;
    }

    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) {
      console.error("❌ NEXTAUTH_SECRET is missing in your environment variables!");
      return null;
    }

    const decoded = await decode({
      token: encryptedToken.value,
      secret,
    });

    if (!decoded) {
      console.error("❌ Failed to decode token! Probably invalid or expired.");
      return null;
    }

    console.log("✅ Decoded JWT:", decoded);

    return decoded.token || null;
  } catch (err) {
    console.error("❌ Error in getMyToken:", err);
    return null;
  }
}

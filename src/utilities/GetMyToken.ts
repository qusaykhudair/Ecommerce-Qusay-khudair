'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken() {
  const data = await cookies();
  const encryptedToken = data.get('next-auth.session-token') || data.get('__Secure-next-auth.session-token');

  if (!encryptedToken) {
return null;
  }

  const token = await decode({ 
    token: encryptedToken?.value, 
    secret: process.env.AUTH_SECRET! 
  });

  if (!token?.token) {
    throw new Error("Login to add to cart");
  }

  return token?.token;
}

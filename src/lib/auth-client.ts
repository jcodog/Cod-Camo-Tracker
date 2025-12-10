import { createAuthClient } from "better-auth/client";
import { adminClient } from "better-auth/client/plugins";
import { emailOTPClient } from "better-auth/client/plugins";
import { ac, roles } from "@/lib/auth/permissions";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  plugins: [
    adminClient({
      ac,
      roles,
    }),
    emailOTPClient(),
  ],
});

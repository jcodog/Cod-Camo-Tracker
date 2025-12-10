import { getDb } from "@/lib/db/prisma";
import {
  sendPasswordResetEmail,
  sendVerificationOtpEmail,
} from "@/lib/email/functions";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { emailOTP } from "better-auth/plugins";
import { ac, roles } from "@/lib/auth/permissions";
import { nextCookies } from "better-auth/next-js";

const baDBFetch = () => {
  if (!process.env.DATABASE_URL) {
    console.error(
      "[Initialize Better Auth Server Client] Error: Missing DATABASE_URL environment variable."
    );
    return;
  }

  return getDb(process.env.DATABASE_URL);
};

const db = baDBFetch();

if (!db) {
  throw new Error(
    "[Initialize Better Auth Server Client] Error: Unable to initialise db connection."
  );
}

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  plugins: [
    admin({
      ac,
      roles,
      defaultRole: "user",
    }),
    emailOTP({
      overrideDefaultEmailVerification: true,
      otpLength: 6,
      sendVerificationOnSignUp: true,
      sendVerificationOTP: async (payload) => {
        const { email, otp, type } = payload;
        const user = await db.user.findFirst({ where: { email } });
        const name = user?.name;
        await sendVerificationOtpEmail({
          email,
          otp,
          name,
          type,
        });
      },
    }),
    nextCookies(),
  ],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 64,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendPasswordResetEmail({
        email: user.email,
        url,
        name: user.name,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 3600,
    autoSignInAfterVerification: true,
  },
});

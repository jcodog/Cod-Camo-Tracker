import { getDb } from "@/lib/db/prisma";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "@/lib/email/functions";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

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
    enabled: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerificationEmail({
        email: user.email,
        url,
        name: user.name,
      });
    },
  },
});

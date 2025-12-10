import "dotenv/config";
import { createAuthClient } from "better-auth/client";
import { adminClient } from "better-auth/client/plugins";

async function main() {
  const userId = process.env.SEED_ADMIN_USER_ID;
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME ?? "Admin";
  const baseURL =
    process.env.SEED_APP_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000";

  const client = createAuthClient({
    baseURL,
    plugins: [adminClient()],
  });

  if (!userId && (!email || !password)) {
    console.error(
      "Provide SEED_ADMIN_USER_ID to promote an existing user, or SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD to create one."
    );
    process.exit(1);
  }

  // Promote an existing user to admin using BetterAuth admin plugin
  if (userId) {
    try {
      await client.admin.setRole({ userId, role: "admin" });
      console.log("Promoted existing user to admin:", userId);
      return;
    } catch (err) {
      console.error("Failed to promote user to admin", err);
      process.exit(1);
    }
  }

  // Create a new admin user via BetterAuth admin plugin
  try {
    const { data, error } = await client.admin.createUser({
      email: email!,
      password: password!,
      name,
      role: "admin",
    });
    if (error) {
      console.error("Failed to seed admin user", error);
      process.exit(1);
    }
    console.log("Seeded admin user", data?.user.id);
  } catch (err: any) {
    if (err?.code === "USER_ALREADY_EXISTS") {
      console.log(
        "Admin user already exists. Set SEED_ADMIN_USER_ID to promote explicitly if needed."
      );
      return;
    }
    console.error("Failed to seed admin user", err);
    process.exit(1);
  }
}

main();

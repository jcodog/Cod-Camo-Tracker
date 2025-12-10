import { createAccessControl } from "better-auth/plugins/access";

// Define resources and actions for access control
export const ac = createAccessControl({
  dashboard: ["read"],
  weapons: ["read", "write"],
  tickets: ["read", "reply", "close"],
  admin: ["read", "manage"],
} as const);

const user = ac.newRole({
  dashboard: ["read"],
  weapons: ["read"],
});

const staff = ac.newRole({
  ...user.statements,
  tickets: ["read", "reply"],
});

const admin = ac.newRole({
  ...staff.statements,
  weapons: ["read", "write"],
  tickets: ["read", "reply", "close"],
  admin: ["read", "manage"],
});

export const roles = { user, staff, admin };
export type AppRole = keyof typeof roles;

export const isStaff = (role: string | null | undefined) =>
  role === "staff" || role === "admin";

export const isAdmin = (role: string | null | undefined) => role === "admin";

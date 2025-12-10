# Cod Camo Tracker

The opensource Call Of Duty Camo Tracking application.

## Design Diagrams

- [Architecture](design/markdown/architecture.md)
- [Auth & RBAC](design/markdown/auth_rbac.md)
- [Weapon & Challenge Management](design/markdown/weapon_challenge_management.md)
- [User Progress Flow](design/markdown/user_progress.md)
- [Ticket Flow](design/markdown/ticket_flow.md)
- [Live Chat](design/markdown/live_chat.md)
- [AI Assistant](design/markdown/ai_assistant.md)

## Environment Variables

Copy `.env.example` to `.env` and provide the following values:

- `DATABASE_URL` – Prisma Accelerate connection string (`prisma://…`) used by the runtime client. Generate this from the Prisma Console when enabling Accelerate for the Neon database.
- `DIRECT_URL` – Direct Neon Postgres connection string (`postgresql://…?sslmode=require`) used by Prisma CLI commands via `prisma.config.ts`.

`DATABASE_URL` is required at runtime (the API middleware throws if it is missing) and `DIRECT_URL` is required for local migrations/validation. Keep both secrets out of version control.

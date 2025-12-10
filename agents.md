# AGENTS.md – Cod Camo Tracker

> Guidance for AI coding agents (Codex, etc.) working on this repository.

# Project overview

This repository is **Cod Camo Tracker**, a web app to track Call of Duty weapon camo challenges.

High level:

- Frontend: Next.js App Router (v16+), fully typed TypeScript, deployed on Vercel.
- Backend: Hono app hosted through JStack, mounted under the Next.js app as API route handlers.
- Auth: BetterAuth + Prisma adapter, with roles: `USER`, `STAFF`, `ADMIN`.
- Database: Neon Postgres with Prisma ORM and Prisma Accelerate extension.
- Realtime: JStack WebSockets (for live chat support).
- AI: Vercel AI SDK for an in-app AI assistant that reasons about user camo progress.
- Infra conventions: Bun, strict TypeScript, edge friendly where possible.

Design and planning documents live in:

- `/design/markdown/*.md` (architecture, ticketing, live chat, AI, etc).

When you need context about how a feature should work, prefer these design docs and the GitHub issues over guessing.

---

# Repository structure

Assume the project roughly uses this structure:

- `/app` – Next.js App Router routes (user dashboard, weapons, support, admin areas).
- `/server` or `/api` – Hono app and RPC routes, grouped by domain (weapons, progress, support tickets, live chat, AI).
- `/prisma` – Prisma schema and migrations.
- `/server/db.ts` (or similar) – Prisma client wrapper with Accelerate extension.
- `/server/auth` – BetterAuth configuration and role helpers.
- `/design/markdown` – diagrams and feature specs used by GitHub issues and project epics.
- `/scripts` – utility scripts (e.g. GitHub bootstrap script that seeds epics and tasks).

Respect this structure when adding new files; prefer feature-based folders instead of random new root folders.

---

# Working from issues and project epics

The **GitHub Project** and **Issues** are the source of truth for what to build.

- Each EPIC in the project board is a high level feature.
- Each sub-issue under an epic is a concrete task.
- Issues often link to `/design/markdown/*.md` diagrams. Treat those as specs.

When you are invoked from:

- A **GitHub issue** (via the coding agent, or via VS Code GitHub extension), treat that issue as the single task you are working on.
- VS Code with the **GitHub Pull Requests and Issues** extension, assume the developer has selected an issue that represents the current task.

Before writing code:

1. Summarize the active issue in your own words.
2. Open and skim any linked design docs under `/design/markdown`.
3. Identify which epic the issue belongs to (architecture, weapons & challenges, user progress, ticket support, live chat, AI assistant).
4. Propose a small plan of steps scoped only to that issue.
5. Then implement file changes step by step, keeping the plan up to date if things change.

Do **not** invent new requirements if they are not in the issue, epic description or design docs.

---

# Using Context7 for framework and SDK docs

This repository uses frameworks that evolve quickly: Next.js, Hono, Prisma, BetterAuth, Neon, Vercel AI SDK, JStack, etc.

When you need exact, up-to-date documentation or examples for these tools:

- Prefer using the **Context7 MCP** integration instead of hallucinating.
- Use prompts that include `use context7` at the end when you need current docs, for example:

  - “Show me how to mount a Hono app under a Next.js route handler, use context7”
  - “Give me the correct Prisma Accelerate client wrapper pattern for Neon, use context7”
  - “Show a minimal BetterAuth + Prisma adapter setup, use context7”

Only rely on your internal training data for framework APIs when you are confident and the change is small. For anything non-trivial or version-sensitive, use Context7.

---

# Auth and RBAC rules

BetterAuth is the only auth system; never roll your own sessions.

Roles:

- `USER` – normal players tracking camo progress.
- `STAFF` – support staff who can view tickets and live chat sessions, but cannot change weapons/challenges.
- `ADMIN` – full control. Can manage weapons, camo challenges, and reset user progress.

When editing or creating backend endpoints:

- Always enforce `requireUser`, `requireStaff` or `requireAdmin` on the server side.
- Do not rely on frontend checks for security.
- For admin-only functionality (weapons, challenges, resets), **always** require `ADMIN`.
- For support tools (tickets, live chat), require `STAFF` or `ADMIN` as appropriate.

If you add new endpoints, document the required role in comments and in the issue you are working on.

---

# Data model and feature domains

Key Prisma models (conceptual):

- `User` with a `role: UserRole` enum.
- `Weapon`, `CamoChallenge`, `GameMode`.
- `UserProgress` for per-user challenge progress.
- `SupportTicket` and `TicketMessage` for async ticket support.
- `ChatSession` and `ChatMessage` for live chat.
- Additional enums for statuses and sender roles.

When changing the schema:

- Keep enums and relations consistent with existing models.
- Update Zod schemas and RPC types in the same branch.
- After schema changes, update any affected design docs or issues.

---

# Code style and patterns

- TypeScript strict mode, no `any` unless absolutely necessary.
- Use Zod for input validation on all RPC routes and web handlers.
- Prefer functional, composable utilities over huge god files.
- Keep server code side-effect free where possible (pure functions for business logic, thin IO layers).
- For Next.js, use server components by default, client components only where required (stateful UI, hooks).

Always update or create tests / small usage examples when you introduce a new pattern or helper.

---

# How to work with support and live chat features

Ticket support:

- Async tickets live in `SupportTicket` and `TicketMessage`.
- Users can create tickets and reply to their own threads.
- Staff/admin can list all tickets, reply, and change status.
- Respect RBAC helpers when touching ticket endpoints or UI.

Live chat:

- Uses JStack WebSockets for real-time communication between users and staff.
- `ChatSession` identifies a room, `ChatMessage` stores messages.
- Prefer a single source of truth for session state; do not create ad hoc state stores for the same data.

When touching these domains, always check the corresponding design doc under `/design/markdown`.

---

# How to interact with issues and the project board

- When asked to implement or modify something, first look for an issue whose title or description matches the request.
- If the developer references an issue number, use that issue and its parent epic to understand scope.
- Respect labels like `feature`, `backend`, `frontend`, `auth`, `support-system`, `live-chat`, `ai-integration` when reasoning about where code should live.

When you create example commits or file changes in explanations, mention which epic/task they belong to so it stays aligned with the project board.

---

# General behaviour

- Be conservative with large refactors; prefer incremental changes tied to specific issues.
- When in doubt, propose a small plan and ask the developer to confirm before making sweeping edits.
- Keep explanations concise but clear, and reference the relevant issue/epic so work stays traceable.

# App Architecture

```mermaid
flowchart TD
  Browser["User Browser<br/>Next.js 15 Frontend"]
    -->|"HTTP / WebSocket"| JStack["JStack App<br/>Next.js + Hono Backend"]

  JStack -->|"Prisma Client"| Neon["Neon Postgres<br/>Weapons, Challenges,<br/>UserProgress, Support"]
```
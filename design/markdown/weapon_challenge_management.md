# Weapon & Challenge Management (Admin)

```mermaid
flowchart TD
  AdminPanel["Admin panel"] --> AddWeapon["Add weapon<br/>name, category, metadata"]
  AddWeapon --> AddChallenge["Add challenge<br/>mode, goal, description, camoName"]
  AddChallenge --> DB["Prisma / Neon<br/>Weapon & Challenge tables"]
```
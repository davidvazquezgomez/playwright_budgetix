# Agents folder

This folder contains templates and guidance to prepare autonomous agents for repository tasks.

Usage:
- Add agent definitions using `.agent.md`, `.instructions.md`, and `.prompt.md` files.
- Keep templates small and focused. Use `AGENTS.md` to list available agents.

Files:
- `AGENTS.md` — index of agents and purpose.
- `bdd-playwright-agent.agent.md` — agent metadata for Playwright BDD.
- `bdd-playwright-agent.instructions.md` — instructions for the agent.
- `bdd-playwright-agent.prompt.md` — prompt template the agent should use.

Example usage (run tests for login scenario on mobile):
```powershell
npx bddgen
npx playwright test .features-gen/features/login.feature.spec.js -g "Login con usuario y contraseña" --project=Android --project=iPhone
```


Uso:
- Añade definiciones de agentes mediante archivos `.agent.md`, `.instructions.md` y `.prompt.md`.
- Mantén las plantillas pequeñas y enfocadas en un propósito específico. Utiliza `AGENTS.md` para listar los agentes disponibles.

Archivos:
- `AGENTS.md` — índice de los agentes y su propósito.
- `sample-agent.agent.md` — ejemplo de metadatos de un agente.
- `sample-agent.instructions.md` — instrucciones para el agente.
- `sample-agent.prompt.md` — plantilla de prompt que debe utilizar el agente.


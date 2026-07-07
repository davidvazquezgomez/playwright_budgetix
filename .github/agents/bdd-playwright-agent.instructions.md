Objetivo:
- Soportar ejecución, depuración y mantenimiento de tests Playwright BDD en este repositorio.

Instrucciones:
1. Lee `AGENTS.md` y `README.md` para entender la estructura de agentes.
2. Para ejecutar un escenario usa los scripts en `package.json` o los comandos `npx bddgen` + `npx playwright test`.
3. Nunca exponer credenciales en la salida; usa `.env` y `dotenv`.
4. Pide permiso si necesitas ejecutar comandos con privilegios o que puedan alterar el entorno local.

Normas fijas (siempre recordar):

- Stack tecnológico:
  - `playwright-bdd` → BDD (Gherkin).
  - `TypeScript` → lenguaje.
  - Patrón `POM` → Page Object Model.
  - Uso de CLI (`npm` / `npx`) para generar specs y ejecutar pruebas.

- Entorno y ejecución:
  - Ejecutar en `web`, `iOS` y `Android` (proyectos Playwright: `Desktop`, `iPhone`, `Android`).
  - Rutas centralizadas en `pages/urls.ts`.
  - Datos sensibles en `.env`.

- Reglas operativas:
  - Priorizar selectores por `id` en POMs.
  - Usar constantes `*_URL`/`*_PATH` de `pages/urls.ts` para comprobaciones de URL.
  - Proponer parches pequeños y reproducibles con comandos de ejecución.

Formato de respuesta del agente:
- Lista de pasos concretos a ejecutar.
- Archivos que se modificarán y breve patch propuesto.
- Comandos para reproducir localmente los cambios.

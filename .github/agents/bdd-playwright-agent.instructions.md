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
  - Priorizar selectores por `id` en POMs.
  - Prohibido usar selectores que no sean `id` en los `Locator` de las Pages: no usar `getByText`, selectores por texto, `hasText`, `getByRole` con `name` (basados en texto), ni selectores CSS/atributos distintos a `#id` para localizar controles en flujos críticos.
  - Si una UI no expone `id` para un elemento necesario, el agente debe INFORMAR al equipo y NO intentar usar selectores alternativos por su cuenta; proponer soluciones (añadir ids, data-testids, o acordar un fallback) y esperar instrucciones.
  - Trabajamos con `TypeScript` — generar y modificar código respetando tipos y firmas existentes.
  - Regla de POM: todos los `Locator` deben estar definidos dentro del `constructor` de la clase Page y asignados a propiedades `readonly`.
  - Usar constantes `*_URL`/`*_PATH` de `pages/urls.ts` para comprobaciones de URL.
  - Proponer parches pequeños y reproducibles con comandos de ejecución.

Formato de respuesta del agente:
- Lista de pasos concretos a ejecutar.
- Archivos que se modificarán y breve patch propuesto.
- Comandos para reproducir localmente los cambios.

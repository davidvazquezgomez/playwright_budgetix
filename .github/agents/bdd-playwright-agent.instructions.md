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

  Política POM (para este agente)

  - Objetivo: Asegurar que los `Locator` vivan únicamente en los Page Objects y que exista una `Page Object` por página, componente o flujo reutilizable.
  - Reglas prácticas que el agente debe respetar siempre:
    - Crear o actualizar una `Page Object` por **página**, **componente** o **flujo** reutilizable (por ejemplo `LoginPage`, `HomePage`, `ProfileFlow`).
    - Definir los `Locator` dentro del `constructor` de la Page Object y exponer propiedades `readonly` o métodos de acción (por ejemplo `clickContinuarConGoogle()`).
    - Priorizar `id` como selector: los `Locator` deben usar `#id` siempre que sea posible.
    - Prohibido en `steps`/tests el uso de `page.locator(...)`, `getByText(...)`, `getByRole(...)` con literales, selectores por texto, o selectores CSS distintos a `#id` para flujos críticos.
    - Si la UI no expone `id` para un elemento necesario, el agente debe INFORMAR al equipo y NO usar selectores alternativos sin autorización; proponer añadir `id` o `data-testid` como solución.

  Flujo automático que el agente puede ejecutar (cuando se le autorice):
  1. Buscar selectores literales en `features/**` y `features/**/*.ts` que no residan en `pages/`.
  2. Inferir la Page Object objetivo desde el contexto del step o la ruta del feature; si no existe, crear `pages/<Name>Page.ts` con una implementación mínima y tipos correctos.
  3. Extraer el `Locator` al Page Object (en el `constructor`) y crear un método de acción apropiado (p. ej. `clickContinuarConGoogle()`).
  4. Reemplazar en los `steps`/tests el uso literal por la llamada al método/locator del Page Object.
  5. Ejecutar `npx tsc --noEmit` y, si procede, un conjunto limitado de tests (`npx playwright test --grep "login"`) para validar que no se rompa el tipo o el flujo.
  6. Crear rama `agent/pom-extract/<timestamp>`, commitear los cambios con mensaje claro y abrir un PR para revisión humana. No mergear automáticamente.

  Reglas de seguridad y calidad para este flujo:
  - Si el cambio afecta más de N archivos (configurable, p. ej. 10), el agente debe detenerse y pedir revisión humana.
  - No incluir credenciales ni valores sensibles en los commits o en la salida del agente.
  - Documentar en el PR los archivos modificados y un resumen de las refactorizaciones realizadas.

  Formato de entrega del agente (recordatorio reforzado):
  - Lista de pasos ejecutados.
  - Archivos modificados y diff/patch propuesto.
  - Comandos para reproducir localmente los cambios.

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

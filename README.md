# Budgetix — Tests Playwright (Notas de autenticación Google)

Este repositorio contiene tests E2E con Playwright y BDD. Aquí hay una nota breve sobre cómo regenerar la sesión de Google usada por los tests (`auth/google.json`).

## Propósito
Almacenar `auth/google.json` permite reutilizar una sesión autenticada en `accounts.google.com` y evitar re-preguntas de verificación como captchas durante los tests. No es 100% garantizado (Google puede pedir verificación si detecta actividad inusual), pero funciona en la mayoría de los casos.

## Regenerar `auth/google.json`
1. Ejecuta el script interactivo que abre un navegador para que inicies sesión manualmente:

```bash
node scripts/save-google-auth.js
```

2. En la ventana del navegador que se abre, inicia sesión con la cuenta deseada (por ejemplo `lvargasreboredo@gmail.com`) y completa cualquier verificación manual.
3. Vuelve a la terminal y pulsa `ENTER` para guardar el estado en `auth/google.json`.

## Usar la sesión en Playwright
El proyecto ya está configurado para reutilizar `auth/google.json` mediante `storageState` en `playwright.config.ts`. Para ejecutar el test de Google Login en modo debug:

```bash
PWDEBUG=1 npx bddgen && PWDEBUG=1 npx playwright test .features-gen/features/google_login.feature.spec.js --headed
```

> Nota: En PowerShell usa:`$env:PWDEBUG='1'; npx.cmd bddgen; $env:PWDEBUG='1'; npx.cmd playwright test .features-gen/features/google_login.feature.spec.js --headed`

## Seguridad
- `auth/google.json` está incluido en `.gitignore` para evitar subirlo al repositorio.
- Guarda `auth/google.json` en un lugar seguro y elimínalo si la cuenta debe invalidar la sesión.

## Restaurar configuración anterior
Si quieres deshacer la inserción de `storageState` en `playwright.config.ts`, hay una copia de seguridad en `playwright.config.ts.bak` en la raíz del repo. Restaurar:

PowerShell:

```powershell
Move-Item playwright.config.ts.bak playwright.config.ts -Force
Remove-Item auth/google.json -ErrorAction SilentlyContinue
```

Bash:

```bash
mv playwright.config.ts.bak playwright.config.ts
rm -f auth/google.json
```

---

Si quieres, puedo añadir más detalles (por ejemplo, un script `npm` en `package.json` para ejecutar el flujo).
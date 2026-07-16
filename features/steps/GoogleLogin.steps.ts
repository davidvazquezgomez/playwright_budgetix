import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';
import { GoogleOAuthPage } from '../../pages/Google_loginPage';
import * as fs from 'fs';

const { Given, When, Then } = createBdd(test);

Given('que estoy en la página de login', async ({ loginPage }) => {
  await loginPage.goto();
});

Given('que tengo sesión de Google guardada', async () => {
  const exists = fs.existsSync('auth/google.json');
  if (!exists) {
    const msg = [
      'auth/google.json no existe — se saltará este test porque el flujo OAuth requiere interacción humana (captcha).',
      'Para ejecutar el test puedes regenerar el estado de sesión con:',
      '  1) node scripts/save-google-auth.js',
      "  2) Inicia sesión en la ventana que se abre y pulsa ENTER en la terminal para guardar 'auth/google.json'",
      '  3) Vuelve a ejecutar el test (p. ej. `npx bddgen && npx playwright test .features-gen/features/google_login.feature.spec.js --headed`)',
      'O revisa README.md para más detalles.',
    ].join('\n');
    console.warn('[WARN] ' + msg);
    test.skip(true, msg);
  } else {
    console.log('[INFO] auth/google.json exists: true');
  }
});

When('hace click en el link de Google', async ({ loginPage, homePage }) => {
  const email = process.env.GOOGLE_ACCOUNT_EMAIL || process.env.USER_NAME || '';
  // We only run the short path because the full OAuth popup flow is not automatable reliably (captcha)
  console.log('[INFO] Using saved Google session — performing short path');
  await homePage.clickContinuarConGoogle().catch(() => null);
  const page = (homePage as any).page;
  // Wait for app redirect or logged-in indicator
  await page.waitForURL(/\/app\//, { timeout: 15000 }).catch(() => null);
});

Then('debería iniciar sesión correctamente mediante Google', async ({ loginPage }) => {
  await loginPage.expectLoggedIn();
});

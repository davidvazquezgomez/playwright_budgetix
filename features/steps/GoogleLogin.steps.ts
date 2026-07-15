import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { Given, When, Then } = createBdd(test);

Given('que estoy en la página de login', async ({ loginPage }) => {
  await loginPage.goto();
});

When('hace click en el link de Google', async ({ loginPage, homePage }) => {
  const email = process.env.GOOGLE_ACCOUNT_EMAIL || process.env.USER_NAME || '';

  // Use Page Object method to click and retrieve the OAuth popup
  const popup = await homePage.clickContinuarConGoogle();
  if (!popup) throw new Error('OAuth popup did not open after clicking Continuar con Google');
  await popup.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => null);

  // If Google asks for the email, fill it and click Next. Otherwise try to select the account by visible text.
  try {
    if (email) {
      const emailInput = popup.locator('#identifierId, input[name="identifier"], input[type="email"]');
      if (await emailInput.count() > 0) {
        await emailInput.first().fill(email);
        // Click the explicit identifierNext button (preferred) with fallbacks
        await popup.locator('#identifierNext').first().click().catch(() => null);
        await popup.locator('button:has-text("Siguiente"), button:has-text("Next")').first().click().catch(() => null);
        // wait a bit for the next step to load
        await popup.waitForLoadState('networkidle', { timeout: 7000 }).catch(() => null);
      } else {
        // fallback: try select account by visible text
        await popup.getByText(email).first().click({ timeout: 5000 }).catch(() => null);
      }
    }
  } catch (e) {
    // ignore and try fallback
  }

  // Click the continue button on Google's consent page
  try {
    await popup.getByRole('button', { name: /continue|Continuar|Allow|Aceptar/i }).first().click({ timeout: 7000 }).catch(() => null);
  } catch (e) {
    // fallback: click any primary button
    try {
      await popup.locator('button').filter({ hasText: /continue|Continuar|Allow|Aceptar/i }).first().click({ timeout: 5000 }).catch(() => null);
    } catch (e) {
      // swallow
    }
  }

  // Wait for popup to close or redirect back
  await popup.waitForEvent('close', { timeout: 10000 }).catch(() => null);
});

Then('debería iniciar sesión correctamente mediante Google', async ({ loginPage }) => {
  await loginPage.expectLoggedIn();
});

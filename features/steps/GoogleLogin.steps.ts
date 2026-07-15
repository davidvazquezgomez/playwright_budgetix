import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';
import { GoogleOAuthPage } from '../../pages/Google_loginPage';

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

  const google = new GoogleOAuthPage(popup);
  await google.fillEmailIfAsked(email);
  await google.acceptConsent();
  await google.waitForClose();
});

Then('debería iniciar sesión correctamente mediante Google', async ({ loginPage }) => {
  await loginPage.expectLoggedIn();
});

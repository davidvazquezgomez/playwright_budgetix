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
  let target = await homePage.clickContinuarConGoogle();
  if (!target) {
    // Fallback: navigation may have happened in the same page
    console.log('[DEBUG] clickContinuarConGoogle returned null, falling back to homePage.page');
    target = (homePage as any).page;
  }
  await target.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => null);

  const google = new GoogleOAuthPage(target);
  await google.fillEmailIfAsked(email);
  await google.acceptConsent();
  await google.waitForCloseOrCallback();
});

Then('debería iniciar sesión correctamente mediante Google', async ({ loginPage }) => {
  await loginPage.expectLoggedIn();
});

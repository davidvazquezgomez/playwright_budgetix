import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';


const { Given, When, Then } = createBdd(test);

//Login con usuario y contraseña
Given('que el usuario está en la página de login', async ({ loginPage }) => {
  await loginPage.goto();
});

When('introduce un nombre de usuario válido {string}', async ({ loginPage }, username: string) => {
  const user = username === 'ENV_USER' ? (process.env.TEST_USER || '') : username;
  await loginPage.fillUsername(user);
});

When('introduce una contraseña válida {string}', async ({ loginPage }, password: string) => {
  const pass = password === 'ENV_PASS' ? (process.env.TEST_PASSWORD || '') : password;
  await loginPage.fillPassword(pass);
});

When('hace click en el botón {string}', async ({ loginPage }, boton: string) => {
  await loginPage.clickButton(boton);
});

Then('debería acceder a la aplicación', async ({ loginPage }) => {
  await loginPage.expectLoggedIn();
});

//Login con Google
When('hace click en "Continuar con Google"', async ({ loginPage }) => {
  const popup = await loginPage.clickContinuarGoogleAndWaitForPopup();
  // Interact with the popup if needed, for example:
  // await popup.fill('input[type="email"]', 'user@example.com');
  // await popup.click('button[type="submit"]');
  // For now wait a short time to let manual/placeholder actions occur
  await popup.waitForTimeout(500);
});

When('selecciona una cuenta válida', async ({ loginPage }) => {
  // Use the popup saved on the LoginPage POM when clicking the Google button
  const popup = (loginPage as any).lastPopup as import('@playwright/test').Page | undefined;
  if (!popup) throw new Error('No OAuth popup found. Ensure the previous step opened the Google popup.');

  const email = process.env.TEST_USER || 'user@example.com';
  const displayName = process.env.TEST_NAME || '';

  // 1) Try direct match by email text
  const byEmail = popup.getByText(email);
  if (await byEmail.count() > 0) {
    await byEmail.first().click();
    await popup.waitForLoadState('load').catch(() => null);
    await popup.waitForTimeout(500);
    return;
  }

  // 2) Try role=button entries that contain the email
  const accountButton = popup.locator('div[role="button"]').filter({ hasText: email });
  if (await accountButton.count() > 0) {
    await accountButton.first().click();
    await popup.waitForLoadState('load').catch(() => null);
    await popup.waitForTimeout(500);
    return;
  }

  // 3) Try match by display name
  if (displayName) {
    const byName = popup.getByText(displayName);
    if (await byName.count() > 0) {
      await byName.first().click();
      await popup.waitForLoadState('load').catch(() => null);
      await popup.waitForTimeout(500);
      return;
    }
  }

  // 4) Click "Usar otra cuenta" if present
  const usarOtra = popup.getByText('Usar otra cuenta');
  if (await usarOtra.count() > 0) {
    await usarOtra.first().click();
    // then fill email
    const emailInput = popup.locator('input[type="email"]');
    await emailInput.fill(email).catch(() => null);
    await popup.locator('button:has-text("Next")').click().catch(() => null);
    await popup.locator('button:has-text("Siguiente")').click().catch(() => null);
    await popup.waitForLoadState('load').catch(() => null);
    await popup.waitForTimeout(500);
    return;
  }

  // 5) Fallback: fill email input if exists
  const emailInput = popup.locator('input[type="email"]');
  if (await emailInput.count() > 0) {
    await emailInput.fill(email).catch(() => null);
    await popup.locator('button:has-text("Next")').click().catch(() => null);
    await popup.locator('button:has-text("Siguiente")').click().catch(() => null);
    await popup.waitForLoadState('load').catch(() => null);
    await popup.waitForTimeout(500);
    return;
  }

  // 6) Last resort: click the first selectable button-like element
  const first = popup.locator('[role="button"]').first();
  await first.click().catch(() => null);
  await popup.waitForLoadState('load').catch(() => null);
  await popup.waitForTimeout(500);
});




import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';
import { expect, Locator } from '@playwright/test';

const { Given, When, Then } = createBdd(test);


Given('que el usuario está en la página de login', async ({ loginPage }) => {
  await loginPage.goto();
});

When('introduce un nombre de usuario válido {string}', async ({ loginPage }, username: string) => {
  const user = username === 'ENV_USER' ? (process.env.USER_NAME || '') : username;
  await loginPage.fillUsername(user);
});

When('introduce una contraseña válida {string}', async ({ loginPage }, password: string) => {
  const pass = password === 'ENV_PASS' ? (process.env.USER_PASSWORD || '') : password;
  await loginPage.fillPassword(pass);
});

// Variant without parameter: use env var
When('introduce una contraseña válida', async ({ loginPage }) => {
  const pass = process.env.USER_PASSWORD || '';
  await loginPage.fillPassword(pass);
});

// Variant without parameter: use env var
When('introduce un nombre de usuario válido', async ({ loginPage }) => {
  const user = process.env.USER_NAME || '';
  await loginPage.fillUsername(user);
});

When('introduce una contraseña inválida', async ({ loginPage }) => {
  const pass = process.env.INVALID_PASS || 'wrong-password';
  await loginPage.fillPassword(pass);
});

When('introduce credenciales inválidas', async ({ loginPage }) => {
  await loginPage.fillInvalidCredentials();
});

When('introduce un nombre de usuario vacío', async ({ loginPage }) => {
  await loginPage.fillUsername('');
});

When('introduce una contraseña vacía', async ({ loginPage }) => {
  await loginPage.fillPassword('');
});

Then('debería ser redirigido al dashboard', async ({ loginPage }) => {
  await loginPage.expectLoggedIn();
  await loginPage.handlePostLoginPopups();
});

Then('debería visualizar su nombre de usuario', async ({ loginPage }) => {
  await loginPage.handlePostLoginPopups();
  await loginPage.expectUsernameVisible();
});

Then('debería visualizar un mensaje de credenciales inválidas', async ({ loginPage }) => {
  await loginPage.expectInvalidCredentialsMessage();
});


Then('debería visualizar un mensaje de Completa este campo', async ({ loginPage }) => {
  // Check native validationMessage on inputs (expects browser/app to set it after click)
  const userMsg = await loginPage.inputUsuario.evaluate(el => (el as HTMLInputElement).validationMessage);
  const passMsg = await loginPage.inputPassword.evaluate(el => (el as HTMLInputElement).validationMessage);
  //console.log('[DEBUG] validationMessage username ->', userMsg);
  //console.log('[DEBUG] validationMessage password ->', passMsg);
  if (userMsg && userMsg.trim().includes('Completa este campo')) return;
  if (passMsg && passMsg.trim().includes('Completa este campo')) return;

  throw new Error('No se encontró mensaje nativo de validación "Completa este campo" en username ni password');
});

Then('debería visualizar mensajes de Completa este campo', async ({ loginPage }) => {
  // Require native validationMessage for both username and password
  const userMsg = await loginPage.inputUsuario.evaluate(el => (el as HTMLInputElement).validationMessage);
  const passMsg = await loginPage.inputPassword.evaluate(el => (el as HTMLInputElement).validationMessage);
  //console.log('[DEBUG] validationMessage username ->', userMsg);
  //console.log('[DEBUG] validationMessage password ->', passMsg);
  if (userMsg && userMsg.trim().includes('Completa este campo') && passMsg && passMsg.trim().includes('Completa este campo')) return;
  throw new Error('No se encontraron mensajes nativos de validación "Completa este campo" para ambos campos');
});



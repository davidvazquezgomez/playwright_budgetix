import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { Given, When, Then } = createBdd(test);
const ROLE_BUTTON = 'button';

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

When('hace click en el botón {string}', async ({ loginPage }, boton: string) => {
  const selector = boton.startsWith('#') ? boton : `#${boton}`;
  const locator = loginPage.page.locator(selector);
  if (await locator.count() > 0) {
    await loginPage.clickButton(locator);
    return;
  }
  const roleBtn = loginPage.page.getByRole(ROLE_BUTTON, { name: boton });
  if (await roleBtn.count() > 0) {
    await loginPage.clickButton(roleBtn.first());
    return;
  }
  const textLoc = loginPage.page.getByText(boton);
  if (await textLoc.count() > 0) {
    await loginPage.clickButton(textLoc.first());
    return;
  }
  throw new Error(`No button found for id ${selector} or text "${boton}"`);
});

Then('debería ser redirigido al dashboard', async ({ loginPage }) => {
  await loginPage.expectLoggedIn();
});

Then('debería visualizar su nombre de usuario', async ({ loginPage }) => {
  await loginPage.expectUsernameVisible();
});

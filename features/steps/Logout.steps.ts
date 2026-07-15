import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { Given, When, Then } = createBdd(test);

Given('que el usuario ha iniciado sesión', async ({ loginPage }) => {
  const user = process.env.USER_NAME || '';
  const pass = process.env.USER_PASSWORD || '';
  await loginPage.goto();
  await loginPage.fillUsername(user);
  await loginPage.fillPassword(pass);
  await loginPage.clickButton(loginPage.botonLogin);
  await loginPage.expectLoggedIn();
  await loginPage.handlePostLoginPopups();
});

When('hace click en cerrar sesión', async ({ homePage }) => {
  // Minimal, reliable logout using the Page Object locator (ids live in the Page)
  const boton = homePage.botonCerrarSesion.first();
  await boton.waitFor({ state: 'visible', timeout: 3000 }).catch(() => null);
  await homePage.clickButton(boton);
});

Then('debería volver a la página de login', async ({ homePage }) => {
  await homePage.validarRedireccionLogin();
});

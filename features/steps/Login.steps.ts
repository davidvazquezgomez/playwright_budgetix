import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';
import { expect } from '@playwright/test';


const { Given, When, Then } = createBdd(test);

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


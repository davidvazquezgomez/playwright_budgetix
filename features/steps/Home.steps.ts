
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';
import { INDEX_PATH } from '../../pages/urls';

const { Given, When, Then } = createBdd(test);

Given('que el usuario está en la home', async ({ page, homePage }) => {
  await page.goto(INDEX_PATH);
  await homePage.aceptarCookiesSiAparece();
});

When('hace click en el menú hamburguesa', async ({ homePage }) => {
  await homePage.abrirMenu();
});

When('hace click en "Acceder a la app"', async ({ homePage }) => {
  await homePage.clickBoton('Acceder a la app');
});

Then('debería ver el botón {string}', async ({ homePage }, textoBoton: string) => {
  await homePage.esVisibleBoton(textoBoton);
});
 
Then('debería navegar a la página de login', async ({ homePage }) => {
  await homePage.validarRedireccionLogin();
});







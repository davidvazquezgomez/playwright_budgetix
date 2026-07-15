import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';
import { expect, Locator } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

When('hace click en el botón {string}', async ({ loginPage, homePage }, boton: string) => {
  const BUTTON_ID_MAP: Record<string, Locator> = {
    'Iniciar sesión': loginPage.botonLogin,
    'Cerrar sesión': homePage.botonCerrarSesion,
    'Continuar con Google': homePage.botonContinuarGoogle,
    // Example mapping for a different page
  };
  const mapped = BUTTON_ID_MAP[boton];
  if (mapped) {
    if (await mapped.count() > 0) {
      await loginPage.clickButton(mapped.first());
      return;
    }
    throw new Error(`Botón esperado ${boton} mapeado a ${mapped} no encontrado en la página`);
  }
  throw new Error(`No hay mapping de id para el botón "${boton}". Usa el id real del botón en la feature.`);
});
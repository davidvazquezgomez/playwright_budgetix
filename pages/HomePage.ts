import { Page, expect, Locator } from '@playwright/test';
import { LOGIN_PATH } from './urls';

export class HomePage {
  readonly page: Page;
  readonly menuHamburguesa: Locator;
  readonly botonAccederApp: Locator;
  readonly cookieBanner: Locator;
  readonly botonAceptarCookies: Locator;
  readonly botonContinuarGoogle: Locator;

  constructor(page: Page) {
    this.page = page;
   
    this.menuHamburguesa = page.locator('#hamburger');
    this.botonAccederApp = page.locator('#acceder-a-la-app');
    this.cookieBanner = page.locator('#cookie-consent-banner');
    this.botonAceptarCookies = page.locator('#cookie-accept-all');
    this.botonContinuarGoogle = page.locator('#continuar-con-google');
  }

  async aceptarCookiesSiAparece(): Promise<void> {
    await this.cookieBanner.waitFor({ state: 'visible', timeout: 5000 }).catch(() => null);
    if (await this.cookieBanner.isVisible()) {
      await this.botonAceptarCookies.click();
      await this.cookieBanner.waitFor({ state: 'hidden', timeout: 5000 });
    }
  }
 
  async abrirMenu() {
    const size = this.page.viewportSize();
    const isMobile = size?.width && size.width < 768;

    if (isMobile) {      
      await this.menuHamburguesa.waitFor({ state: 'visible' });
      await this.menuHamburguesa.click();
    }
    // desktop → no hace nada, no tiene hamburguesa
  }

  async esVisibleBoton(texto: string) { //metodo reutilizable para verificar si un boton con el texto especificado es visible en el menu
    await this.abrirMenu();
    await expect(this.page.getByText(texto)).toBeVisible();
  }
  
  async clickBoton(texto: string) {   
    await this.abrirMenu();

    const map: Record<string, Locator> = {
      'Acceder a la app': this.botonAccederApp,
    };

    const boton = map[texto] ?? this.page.getByText(texto);
    await boton.waitFor({ state: 'visible' });
    await boton.click();
  }

  async validarRedireccionLogin() {
    await this.page.waitForURL(LOGIN_PATH);
  }
}
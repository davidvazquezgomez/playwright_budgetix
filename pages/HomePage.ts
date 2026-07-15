import { Page, expect, Locator } from '@playwright/test';
import { LOGIN_URL } from './urls';
import { BasePage } from './BasePage';
import { POST_LOGIN_POPUP_SELECTORS, POPUP_CLOSE_BUTTONS_SELECTOR } from './popups';

export class HomePage extends BasePage {
  readonly menuHamburguesa: Locator;
  readonly botonAccederApp: Locator;
  readonly botonCerrarSesion: Locator;
  readonly cookieBanner: Locator;
  readonly botonAceptarCookies: Locator;
  readonly botonContinuarGoogle: Locator;

  constructor(page: Page) {
    super(page);
   
    this.menuHamburguesa = page.locator('#hamburger');
    this.botonAccederApp = page.locator('#acceder-a-la-app');
    this.botonCerrarSesion = page.locator('#cerrar-sesion, [data-test="logout"], #logout, [aria-label="Cerrar sesión"]');
    this.cookieBanner = page.locator('#cookie-consent-banner');
    this.botonAceptarCookies = page.locator('#cookie-accept-all');
    this.botonContinuarGoogle = page.locator('#continuar-con-google');
  }

  async cerrarPopupsSiAparecen(): Promise<void> {
    try {
      // Reuse BasePage generic post-login popup handler first
      await this.handlePostLoginPopups();

      const selectors = POST_LOGIN_POPUP_SELECTORS;
      for (const sel of selectors) {
        const loc = this.page.locator(sel);
        if (await loc.count() > 0) {
          await loc.locator(POPUP_CLOSE_BUTTONS_SELECTOR).first().click().catch(() => null);
          await this.page.waitForTimeout(150).catch(() => null);
        }
      }
    } catch (e) {
      // swallow flaky popup errors
    }
  }

  async aceptarCookiesSiAparece(): Promise<void> {
    try {
      if (await this.cookieBanner.count() > 0 && await this.cookieBanner.isVisible()) {
        await this.botonAceptarCookies.click().catch(() => null);
        await this.cookieBanner.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => null);
      }
    } catch (e) {
      // swallow flaky cookie banner errors
    }
  }

  async clickContinuarConGoogle() {
    try {
      const ctx = this.page.context();
      const popupPromise = ctx.waitForEvent('page');
      await this.botonContinuarGoogle.first().click().catch(() => null);
      const popup = await popupPromise;
      await popup.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => null);
      return popup;
    } catch (e) {
      return null as any;
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
      'Cerrar sesión': this.botonCerrarSesion,
    };

    const boton = map[texto] ?? this.page.getByText(texto);
    await boton.waitFor({ state: 'visible' });
    await boton.click();
  }

  async validarRedireccionLogin() {
    await this.page.waitForURL(LOGIN_URL);
  }
}

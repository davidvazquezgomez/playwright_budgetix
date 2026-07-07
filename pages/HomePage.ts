import { Page, expect, Locator } from '@playwright/test';
import { LOGIN_URL } from './urls';

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
    await this.page.waitForURL(LOGIN_URL);
  }

  async handleNotificationsPrompt(accept = true, idSelectors?: string[]) {
    // If caller provides explicit id selectors, check them first
    const idsToTry = idSelectors ?? ['#activar-notificaciones', '#activar', '#btn-activar-notificaciones', '#enable-notifications', '#notification-enable', '[data-testid="activate-notifications"]'];
    for (const sel of idsToTry) {
      const el = this.page.locator(sel).first();
      if (await el.count() > 0 && await el.isVisible()) {
        // Log some attributes to help identify the element in failures
        try {
          const info = await el.evaluate((n: HTMLElement) => ({ id: n.id, dataset: n.dataset, class: n.className, outerHTML: n.outerHTML.slice(0,300) }));
          // eslint-disable-next-line no-console
          console.log('notification-candidate-found', sel, info);
        } catch (e) {
          // ignore
        }
        if (accept) {
          await el.click().catch(() => null);
          return true;
        } else {
          // attempt to click a sibling "no" button if exists
          const noBtn = this.page.locator(`${sel} ~ button, ${sel} + button, ${sel} ~ [role="button"]`).first();
          if (await noBtn.count() > 0) {
            await noBtn.click().catch(() => null);
            return false;
          }
          return null;
        }
      }
    }

    // Fallback: Look for common modal/dialog patterns used for notifications prompt
    const dialogSelectors = ['[role="dialog"]', '.modal', '.notification-permission', '.dialog--notifications'];
    for (const sel of dialogSelectors) {
      const dialog = this.page.locator(sel);
      if (await dialog.count() > 0 && await dialog.first().isVisible()) {
        // Prefer buttons with clear labels
        const yesBtn = dialog.locator('button', { hasText: /Activar|Aceptar|Permitir/i }).first();
        const noBtn = dialog.locator('button', { hasText: /Ahora no|No|Cancelar/i }).first();
        if (accept && (await yesBtn.count()) > 0) {
          await yesBtn.click().catch(() => null);
          return true;
        }
        if (!accept && (await noBtn.count()) > 0) {
          await noBtn.click().catch(() => null);
          return false;
        }
      }
    }

    // If no dialog found, also check for standalone buttons/toasts
    const standaloneYes = this.page.getByRole('button', { name: /Activar|Aceptar|Permitir/i }).first();
    if (await standaloneYes.count() > 0 && await standaloneYes.isVisible()) {
      try {
        const info = await standaloneYes.evaluate((n: HTMLElement) => ({ id: n.id, dataset: n.dataset, class: n.className, outerHTML: n.outerHTML.slice(0,300) }));
        // eslint-disable-next-line no-console
        console.log('notification-standalone-button', info);
      } catch (e) {
        // ignore
      }
      if (accept) await standaloneYes.click().catch(() => null);
      return accept;
    }
    return null;
  }
}
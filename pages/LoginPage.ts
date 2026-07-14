import { Page, Locator, expect } from '@playwright/test';
import { LOGIN_URL, DASHBOARD_PATH } from './urls';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly inputUsuario: Locator;
  readonly inputPassword: Locator;
  readonly botonLogin: Locator;
  readonly popupNotification: Locator;
  readonly popupNotificationActivateBtn: Locator;
  readonly popupInstall: Locator;
  readonly popupInstallAcceptBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.inputUsuario = page.locator('#username');
    this.inputPassword = page.locator('#password');
    this.botonLogin = page.locator('#iniciar-sesion');
    this.popupNotification = page.locator('#div-ahora-no-2');
    this.popupNotificationActivateBtn = page.locator('#activar');
    this.popupInstall = page.locator('#div-cerrar-5');
    this.popupInstallAcceptBtn = page.locator('#close');
  }

  async goto() {
    await this.page.goto(LOGIN_URL);
  }

  async fillUsername(u: string) {
    await this.inputUsuario.fill(u);
  }

  async fillPassword(p: string) {
    await this.inputPassword.fill(p);
  }

  async fillInvalidCredentials(user?: string, pass?: string) {
    const u = user ?? process.env.INVALID_USER ?? process.env.INVALID_USER_NAME ?? 'invalid-user';
    const p = pass ?? process.env.INVALID_PASS ?? 'wrong-password';
    await this.fillUsername(u);
    await this.fillPassword(p);
  }

  async expectLoggedIn() {
    await expect(this.page).toHaveURL(new RegExp(DASHBOARD_PATH));
  }

  async expectInvalidCredentialsMessage() {    
    const selectors = ['#div-usuario-o-contrasena-incorrectos', '#login-error', '#error-message', '#loginMessage', '#mensaje-error', '#mensaje-login', '#alert-login', '[data-testid="login-error"]'];
    for (const sel of selectors) {
      const loc = this.page.locator(sel);
      if (await loc.count() > 0) {
        await expect(loc.first()).toBeVisible();
        return;
      }
    }
    // common alert patterns
    const alertSelectors = ['[role="alert"]', '.alert-danger', '.alert-error', '.alert', '.toast-error', '.error-message'];
    for (const sel of alertSelectors) {
      const loc = this.page.locator(sel);
      if (await loc.count() > 0) {
        await expect(loc.first()).toBeVisible();
        return;
      }
    }
    // fallback to text
    await expect(this.page.getByText(/credencial(es)? inválid(a|as)?|usuario o contraseña inválida/i)).toBeVisible();
  }

  async expectErrorMessageText(expectedText: string) {
    const selectors = ['#div-usuario-o-contrasena-incorrectos', '#login-error', '#error-message', '#loginMessage', '#mensaje-error', '#mensaje-login', '#alert-login', '[data-testid="login-error"]'];
    for (const sel of selectors) {
      const loc = this.page.locator(sel);
      if (await loc.count() > 0) {
        await expect(loc.first()).toBeVisible();
        if (expectedText) {
          const text = (await loc.first().textContent()) || '';
          if (!text.includes(expectedText)) {
            throw new Error(`Mensaje visible para selector ${sel} no contiene texto esperado: "${expectedText}"`);
          }
        }
        return;
      }
    }
    throw new Error(`No se encontró elemento de mensaje de error por id para comprobar texto: "${expectedText}"`);
  }

  async expectFieldErrorMessageById(fieldId: string, expectedText?: string): Promise<string | null> {
    const candidates = [
      `#${fieldId}-error`,
      `#error-${fieldId}`,
      `#${fieldId}_error`,
      `[data-error-for="${fieldId}"]`,
      `[aria-describedby="${fieldId}-error"]`,
    ];
    for (const sel of candidates) {
      const loc = this.page.locator(sel).first();
      try {
        await loc.waitFor({ state: 'visible', timeout: 3000 });
        const text = (await loc.textContent()) || '';
        if (expectedText && !text.includes(expectedText)) {
          throw new Error(`Error para ${fieldId} (selector ${sel}) no contiene texto esperado: "${expectedText}"`);
        }
        return text.trim();
      } catch (e) {
        // not found yet; try next selector
      }
    }
    // If none found, try aria-describedby references and common tooltip elements
    const input = this.page.locator(`#${fieldId}`);
    if (await input.count() > 0) {
      const firstInput = input.first();
      try {
        await firstInput.waitFor({ state: 'visible', timeout: 1500 });
      } catch (e) {
        // ignore
      }

      // 1) Check aria-describedby on the input (may reference tooltip element ids)
      const describedBy = await firstInput.getAttribute('aria-describedby');
      if (describedBy) {
        const ids = describedBy.split(/\s+/).filter(Boolean);
        for (const id of ids) {
          const describedEl = this.page.locator(`#${id}`).first();
          try {
            await describedEl.waitFor({ state: 'visible', timeout: 3000 });
            const text = (await describedEl.textContent()) || '';
            if (expectedText && !text.includes(expectedText)) continue;
            return text.trim();
          } catch (e) {
            // try next id
          }
        }
      }

      // 2) Fallback: search for common tooltip/error elements on the page
      const tooltipSelector = '[role="tooltip"], .tooltip, .error-tooltip, .popover, .popover-content';
      const tooltips = this.page.locator(tooltipSelector);
      const tCount = await tooltips.count();
      for (let i = 0; i < tCount; i++) {
        const t = tooltips.nth(i);
        try {
          await t.waitFor({ state: 'visible', timeout: 1500 });
          const text = (await t.textContent()) || '';
          if (!text.trim()) continue;
          if (expectedText && !text.includes(expectedText)) continue;
          return text.trim();
        } catch (e) {
          // ignore and try next
        }
      }

      // 3) If still none, try to assert aria-invalid on the input itself
      const attr = await firstInput.getAttribute('aria-invalid');
      if (attr === 'true') return '';
    }
    return null;
  }

  async expectNativeRequired(fieldId: 'username' | 'password'): Promise<string> {
    const input = fieldId === 'username' ? this.inputUsuario : this.inputPassword;
    const isMissing = await input.evaluate(el => (el as HTMLInputElement).validity.valueMissing);
    const msg = await input.evaluate(el => (el as HTMLInputElement).validationMessage);
    // Return the native validationMessage (empty string if none). Caller can assert as needed.
    return isMissing ? (msg || '').trim() : '';
  }

  async expectRequiredFieldErrors() {
    const checks = [] as string[];
    const u = await this.expectFieldErrorMessageById('username'); if (u) checks.push(u);
    const p = await this.expectFieldErrorMessageById('password'); if (p) checks.push(p);
    if (checks.length === 0) {
      throw new Error('No se encontraron mensajes de campos obligatorios para username ni password');
    }
    return checks;
  }

  async expectUsernameVisible() {
    const name = process.env.USER_NAME || process.env.USER || '';
    if (name) {
      await expect(this.page.getByText(name)).toBeVisible();
    } else {
      await expect(this.page.locator('#user-name')).toBeVisible().catch(() => null);
    }
  }
}
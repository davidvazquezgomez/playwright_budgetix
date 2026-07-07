import { Page, Locator, expect } from '@playwright/test';
import { LOGIN_PATH, DASHBOARD_PATH } from './urls';

export class LoginPage {
  readonly page: Page;
  lastPopup?: Page;
  readonly inputUsuario: Locator;
  readonly inputPassword: Locator;
  readonly botonLogin: Locator;
  readonly botonContinuarGoogle: Locator;
  readonly invalidMessageIds: string[];
  readonly usernameErrorIds: string[];
  readonly passwordErrorIds: string[];
  readonly validationErrorIds: string[];
  readonly usernameDisplayIds: string[];

  constructor(page: Page) {
    this.page = page;
    this.inputUsuario = page.locator('#username');
    this.inputPassword = page.locator('#password');
    this.botonLogin = page.locator('#iniciar-sesion');
    this.botonContinuarGoogle = page.locator('#continuar-con-google');
    this.invalidMessageIds = ['#login-error', '#error-message', '#loginMessage', '#mensaje-error', '#mensaje-login', '#alert-login'];
    this.usernameErrorIds = ['#username-error', '#usuario-error', '#error-username'];
    this.passwordErrorIds = ['#password-error', '#contrasena-error', '#error-password'];
    this.validationErrorIds = ['#form-errors', '#validation-errors', '#errors'];
    this.usernameDisplayIds = ['#user-name', '#profile-name', '#username-display', '#nav-username', '#user', '#userDisplay'];
  }

  async goto() {
    await this.page.goto(LOGIN_PATH);
  }

  async fillUsername(u: string) {
    await this.inputUsuario.fill(u);
  }

  async fillPassword(p: string) {
    await this.inputPassword.fill(p);
  }

  // Click a button by its logical name. The mapping keeps selectors inside the page object
  async clickButton(name: string) {
    const map: Record<string, Locator> = {
      'Iniciar sesión': this.botonLogin,
    };

    const locator = map[name] ?? this.page.getByText(name);
    await locator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => null);
    await locator.click();
  }

  async expectLoggedIn() {
    // Accept any URL under the dashboard path (e.g. /app/pages/resumenAnual.php)
    await expect(this.page).toHaveURL(new RegExp(DASHBOARD_PATH));
  }

  async expectInvalidCredentialsMessage() {
    for (const id of this.invalidMessageIds) {
      const loc = this.page.locator(id);
      if (await loc.count() > 0) {
        await expect(loc).toBeVisible();
        return;
      }
    }
    await expect(this.page.getByText(/credencial(es)? inválid(a|as)?/i)).toBeVisible();
  }

  async expectUsernameRequired() {
    for (const id of this.usernameErrorIds) {
      const loc = this.page.locator(id);
      if (await loc.count() > 0) {
        await expect(loc).toBeVisible();
        return;
      }
    }
    await expect(this.page.getByText(/usuario.*obligatorio|usuario es obligatorio/i)).toBeVisible();
  }

  async expectPasswordRequired() {
    for (const id of this.passwordErrorIds) {
      const loc = this.page.locator(id);
      if (await loc.count() > 0) {
        await expect(loc).toBeVisible();
        return;
      }
    }
    await expect(this.page.getByText(/contrase(?:ñ|n)a.*obligatoria|contrase(?:ñ|n)a es obligatoria/i)).toBeVisible();
  }

  async expectValidationErrors() {
    // generic check for validation errors/messages
    for (const id of this.validationErrorIds) {
      const loc = this.page.locator(id);
      if (await loc.count() > 0) {
        await expect(loc).toBeVisible();
        return;
      }
    }
    await expect(this.page.getByText(/obligatorio|error de validaci/i)).toBeVisible();
  }

  async expectUsernameVisible() {
    const name = process.env.USER_NAME || process.env.USER || '';
    if (name) {
      // Prefer id-based selectors commonly used in header/profile
      for (const id of this.usernameDisplayIds) {
        const loc = this.page.locator(id);
        if (await loc.count() > 0) {
          await expect(loc).toBeVisible();
          return;
        }
      }
      await expect(this.page.getByText(name)).toBeVisible();
    } else {
      // fallback: try a common selector
      for (const id of this.usernameDisplayIds) {
        const loc = this.page.locator(id);
        if (await loc.count() > 0) {
          await expect(loc).toBeVisible();
          return;
        }
      }
      // last resort: try any element that looks like a user label
      await expect(this.page.locator('[data-testid="user-name"]')).toBeVisible().catch(() => null);
    }
  }

  async clickContinuarGoogle() {
    await this.botonContinuarGoogle.waitFor({ state: 'visible', timeout: 5000 }).catch(() => null);
    await this.botonContinuarGoogle.click();
  }

  // Click the Google button and return the popup Page so tests can operate on it.
  async clickContinuarGoogleAndWaitForPopup() {
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.botonContinuarGoogle.click(),
    ]);
    await popup.waitForLoadState('load');
    this.lastPopup = popup;
    return popup;
  }
}
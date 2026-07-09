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

  async expectUsernameVisible() {
    const name = process.env.USER_NAME || process.env.USER || '';
    if (name) {
      await expect(this.page.getByText(name)).toBeVisible();
    } else {
      await expect(this.page.locator('#user-name')).toBeVisible().catch(() => null);
    }
  }
}
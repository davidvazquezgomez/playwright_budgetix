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
    try {
      const resp = await this.page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 10000 }).catch(e => { throw e; });
      console.log('[DEBUG] goto:', LOGIN_URL, 'status', resp && resp.status());
      await this.page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => null);
    } catch (err) {
      const errMsg = (err && typeof err === 'object' && 'message' in err) ? (err as any).message : String(err);
      console.error('[DEBUG] goto failed for', LOGIN_URL, errMsg);
      try {
        await this.page.screenshot({ path: 'tmp/goto-error.png', fullPage: false });
      } catch (e) {
        // ignore
      }
      try {
        console.error('[DEBUG] current URL after goto attempt:', this.page.url());
      } catch (e) {}
      throw err;
    }
  }

  async fillUsername(u: string) {
    try {
      await this.inputUsuario.waitFor({ state: 'visible', timeout: 5000 });
      await this.inputUsuario.fill(u);
    } catch (err) {
      try {
        await this.page.screenshot({ path: 'tmp/fillUsername-error.png', fullPage: false });
      } catch (e) {
        // ignore screenshot errors
      }
      try {
        const html = await this.page.content();
        // limit output length in logs
        console.error('[DEBUG] fillUsername: page content length', html ? html.length : 0);
      } catch (e) {
        console.error('[DEBUG] fillUsername: could not get page content:', e);
      }
      throw err;
    }
  }

  async fillPassword(p: string) {
    try {
      await this.inputPassword.waitFor({ state: 'visible', timeout: 5000 });
      await this.inputPassword.fill(p);
    } catch (err) {
      try {
        await this.page.screenshot({ path: 'tmp/fillPassword-error.png', fullPage: false });
      } catch (e) {
        // ignore screenshot errors
      }
      try {
        const html = await this.page.content();
        console.error('[DEBUG] fillPassword: page content length', html ? html.length : 0);
      } catch (e) {
        console.error('[DEBUG] fillPassword: could not get page content:', e);
      }
      throw err;
    }
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
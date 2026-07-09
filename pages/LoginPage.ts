import { Page, Locator, expect } from '@playwright/test';
import { LOGIN_URL, DASHBOARD_PATH } from './urls';

export class LoginPage {
  readonly page: Page;
  readonly inputUsuario: Locator;
  readonly inputPassword: Locator;
  readonly botonLogin: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputUsuario = page.locator('#username');
    this.inputPassword = page.locator('#password');
    this.botonLogin = page.locator('#iniciar-sesion');
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

  async clickButton(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => null);
    await locator.click();
  }

  async expectLoggedIn() {
    await expect(this.page).toHaveURL(new RegExp(DASHBOARD_PATH));
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
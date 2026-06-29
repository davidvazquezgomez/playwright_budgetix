import { Page, Locator, expect } from '@playwright/test';
import { LOGIN_PATH } from './urls';

export class LoginPage {
  readonly page: Page;
  lastPopup?: Page;
  readonly inputUsuario: Locator;
  readonly inputPassword: Locator;
  readonly botonLogin: Locator;
  readonly botonContinuarGoogle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputUsuario = page.locator('#username');
    this.inputPassword = page.locator('#password');
    this.botonLogin = page.locator('#iniciar-sesion');
    this.botonContinuarGoogle = page.locator('#continuar-con-google');
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
    await expect(this.page).toHaveURL(/\/app\//);
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
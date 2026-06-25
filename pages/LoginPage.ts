import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly inputUsuario: Locator;
  readonly inputPassword: Locator;
  readonly botonLogin: Locator;
  readonly rememberMe: Locator;
  readonly forgotPasswordLink: Locator;
 readonly errorMessage: Locator;
 readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputUsuario = page.locator('#username');    
    this.inputPassword = page.locator('#password');
    this.botonLogin = page.locator('#iniciar-sesion');
    this.rememberMe = page.locator('#remember-me');
    this.forgotPasswordLink = page.locator('#olvidaste-tu-contrasena');
   this.errorMessage = page.locator('.alert-danger');
    this.logoutButton = page.locator('#logout');
  }

  async goto() { await this.page.goto('/app/public/login.php'); }
  async fillUsername(u: string) { await this.inputUsuario.fill(u); }
  async fillPassword(p: string) { await this.inputPassword.fill(p); }
  async clearFields() { await this.inputUsuario.fill(''); await this.inputPassword.fill(''); }
  async clickLogin() { await this.botonLogin.click(); }
  async login(u: string, p: string) { await this.fillUsername(u); await this.fillPassword(p); await this.clickLogin(); }

  // Click a button by its logical name. The mapping keeps selectors inside the page object
  async clickButton(name: string) {
    const map: Record<string, Locator> = {
      'Iniciar sesión': this.botonLogin,
    };

    const locator = map[name] ?? this.page.getByText(name);
    await locator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => null);
    await locator.click();
  }

  async toggleRememberMe(flag: boolean) {
    const checked = await this.rememberMe.isChecked().catch(() => false);
    if (checked !== flag) await this.rememberMe.click();
  }

  async clickForgotPassword() { await this.forgotPasswordLink.click(); }
  async expectErrorMessage(text: string) { await expect(this.errorMessage).toBeVisible(); await expect(this.errorMessage).toContainText(text); }
  async expectRequiredFieldValidation() { /* adaptar a validaciones reales */ }
  async expectLoggedIn() { await expect(this.page).toHaveURL(/\/app\//); }
  async expectStillAuthenticated() { await this.expectLoggedIn(); }
  async expectOnForgotPassword() { await expect(this.page).toHaveURL(/forgot-password|recover/); }
  async logout() { await this.logoutButton.click(); }
  async expectOnLogin() { await expect(this.page).toHaveURL(/login/); }
}
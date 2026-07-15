import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class GoogleOAuthPage extends BasePage {
  readonly identifierInput: Locator;
  readonly identifierNextBtn: Locator;
  readonly nextButtons: Locator;
  readonly continueButton: Locator;
  readonly anyButton: Locator;

  constructor(popup: Page) {
    super(popup);
    this.identifierInput = popup.locator('#identifierId, input[name="identifier"], input[type="email"]');
    this.identifierNextBtn = popup.locator('#identifierNext');
    this.nextButtons = popup.locator('button:has-text("Siguiente"), button:has-text("Next")');
    this.continueButton = popup.getByRole('button', { name: /continue|Continuar|Allow|Aceptar/i });
    this.anyButton = popup.locator('button');
  }

  async fillEmailIfAsked(email: string) {
    if (!email) return;
    try {
      if (await this.identifierInput.count() > 0) {
        await this.identifierInput.first().fill(email);
        await this.identifierNextBtn.first().click().catch(() => null);
        await this.nextButtons.first().click().catch(() => null);
        await this.page.waitForLoadState('networkidle', { timeout: 7000 }).catch(() => null);
      } else {
        await this.page.getByText(email).first().click({ timeout: 5000 }).catch(() => null);
      }
    } catch (e) {
      // swallow flaky errors and continue with fallbacks
    }
  }

  async acceptConsent() {
    try {
      await this.continueButton.first().click({ timeout: 7000 }).catch(() => null);
    } catch (e) {
      try {
        await this.anyButton.filter({ hasText: /continue|Continuar|Allow|Aceptar/i }).first().click({ timeout: 5000 }).catch(() => null);
      } catch (e) {
        // swallow
      }
    }
  }

  async waitForClose(timeout = 10000) {
    await this.page.waitForEvent('close', { timeout }).catch(() => null);
  }
}

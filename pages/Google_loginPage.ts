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
      await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => null);
      // Ensure we're on accounts.google.com before searching for inputs (handles same-tab navigation)
      await this.page.waitForURL(/accounts\.google\.com/, { timeout: 5000 }).catch(() => null);
      await this.page.waitForTimeout(250).catch(() => null);

      // Diagnostic logs: report url and frames, and watch for close
      try {
        console.log('[DEBUG] GoogleOAuthPage start URL:', this.page.url());
        const frames = this.page.frames();
        console.log('[DEBUG] GoogleOAuthPage frames:', frames.map(f => f.url()));
      } catch (e) {
        // ignore
      }
      this.page.on('close', () => console.log('[DEBUG] GoogleOAuthPage closed, last URL:', this.page.url()));

      // 1) If Google shows account chooser, click the first available account
      const accountCandidates = this.page.locator('div[data-identifier], div[role="link"][data-identifier], li div[data-identifier]');
      if (await accountCandidates.count() > 0) {
        await accountCandidates.first().click().catch(() => null);
        await this.page.waitForLoadState('networkidle', { timeout: 7000 }).catch(() => null);
        return;
      }
      // 2) If input for email is present, fill it
      if (await this.identifierInput.count() > 0) {
        await this.identifierInput.first().fill(email);
        await this.identifierNextBtn.first().click().catch(() => null);
        await this.nextButtons.first().click().catch(() => null);
        await this.page.waitForLoadState('networkidle', { timeout: 7000 }).catch(() => null);
        return;
      }

      // 3) Try the common "Use another account" link/button (multi-language)
      const another = this.page.getByText(/use another account|usar otra cuenta|otro correo|another account/i);
      if (await another.count() > 0) {
        await another.first().click().catch(() => null);
        await this.page.waitForLoadState('domcontentloaded', { timeout: 7000 }).catch(() => null);
        // wait for identifier input after selecting "another account"
        await this.page.locator('#identifierId, input[name="identifier"], input[type="email"]').first().waitFor({ state: 'visible', timeout: 7000 }).catch(() => null);
        if (await this.identifierInput.count() > 0) {
          await this.identifierInput.first().fill(email).catch(() => null);
          await this.identifierNextBtn.first().click().catch(() => null);
        }
        return;
      }

      // 4) Fallback: try to click any visible element that contains the email text
      const emailByText = this.page.getByText(email);
      if (await emailByText.count() > 0) {
        await emailByText.first().click({ timeout: 5000 }).catch(() => null);
        return;
      }

      // 5) As last resort capture screenshot for diagnosis
      await this.page.screenshot({ path: 'tmp/google-popup-fallback.png', fullPage: true }).catch(() => null);
    } catch (e) {
      // swallow flaky errors and continue
    }
  }

  async waitForCloseOrCallback(timeout = 15000) {
    try {
      await Promise.race([
        this.page.waitForEvent('close', { timeout }).catch(() => null),
        this.page.waitForURL(/google-callback\.php|google-callback/, { timeout }).catch(() => null),
      ]);
    } catch (e) {
      // ignore
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

import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickButton(locator: Locator, timeout = 5000) {
    await locator.waitFor({ state: 'visible', timeout }).catch(() => null);
    await locator.click();
    await this.waitForNetworkIdle(timeout).catch(() => null);
  }

  async waitForNetworkIdle(timeout = 5000) {
    await this.page.waitForLoadState('networkidle', { timeout }).catch(() => null);
  }

  // Generic handler for post-login popups. Subclasses may provide locators as
  // properties: popupNotification, popupNotificationActivateBtn, popupInstall, popupInstallAcceptBtn.
  async handlePostLoginPopups() {
    try {
      await this.page.waitForTimeout(250).catch(() => null);
      const self: any = this;

      const popupNotification: Locator | undefined = self.popupNotification;
      const popupNotificationActivateBtn: Locator | undefined = self.popupNotificationActivateBtn;
      const popupInstall: Locator | undefined = self.popupInstall;
      const popupInstallAcceptBtn: Locator | undefined = self.popupInstallAcceptBtn;

      if (popupNotification && (await popupNotification.count() > 0)) {
        if (popupNotificationActivateBtn && (await popupNotificationActivateBtn.count() > 0)) {
          await popupNotificationActivateBtn.click().catch(() => null);
        } else {
          await popupNotification.locator('button, .close, .cerrar').first().click().catch(() => null);
        }
        await this.page.waitForTimeout(150).catch(() => null);
      }

      if (popupInstall && (await popupInstall.count() > 0)) {
        if (popupInstallAcceptBtn && (await popupInstallAcceptBtn.count() > 0)) {
          await popupInstallAcceptBtn.click().catch(() => null);
        } else {
          await popupInstall.locator('button, .accept, .cerrar').first().click().catch(() => null);
        }
      }
    } catch (e) {
      // swallow errors to avoid failing tests due to flaky popups
    }
  }
}

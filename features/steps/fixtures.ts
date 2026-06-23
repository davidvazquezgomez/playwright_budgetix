import { test as base } from 'playwright-bdd';
import { devices } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

type MyFixtures = {
  homePage: HomePage;
};

/**
 * Extends the base playwright-bdd test with:
 *  - Mobile context (iPhone 12) for all scenarios in this suite
 *  - homePage fixture that exposes the HomePage POM
 
export const test = base.extend<MyFixtures>({
  // Override the default context with an iPhone 12 device profile
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      ...devices['iPhone 12'],
      locale: 'es-ES',
      extraHTTPHeaders: {
        'Accept-Language': 'es-ES,es;q=0.9',
      },
    });
    await use(context);
    await context.close();
  },
  

  // Provide a pre-instantiated HomePage bound to the current page
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});
 */
export const test = base.extend<MyFixtures>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      locale: 'es-ES',
      extraHTTPHeaders: {
        'Accept-Language': 'es-ES,es;q=0.9',
      },
    });

    await use(context);
    await context.close();
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

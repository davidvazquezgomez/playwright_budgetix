import { test as base } from 'playwright-bdd';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import * as fs from 'fs';

type MyFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
  context: async ({ browser }, use) => {
    const contextOptions: any = {
      locale: 'es-ES',
      extraHTTPHeaders: { 'Accept-Language': 'es-ES,es;q=0.9' },
    };
    if (fs.existsSync('auth/google.json')) {
      console.log('[INFO] Loading storageState from auth/google.json into test context');
      contextOptions.storageState = 'auth/google.json';
    }
    const context = await browser.newContext(contextOptions);
    await use(context);
    await context.close();
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    // Attach debug listeners to capture console messages, page errors, failed requests and close events
    page.on('console', msg => {
      try {
        const args = msg.args().map(a => a.toString()).join(' ');
        console.log('[PAGE][console]', msg.type(), args);
      } catch (e) {
        console.log('[PAGE][console] (could not stringify) ', msg.type());
      }
    });
    page.on('pageerror', err => {
      console.error('[PAGE][pageerror]', err && (err.stack || err.message || String(err)));
    });
    page.on('requestfailed', req => {
      console.error('[PAGE][requestfailed]', req.url(), req.failure()?.errorText || req.failure());
    });
    page.on('close', () => {
      console.error('[PAGE][close] page was closed');
    });

    await use(new LoginPage(page));
  },
});
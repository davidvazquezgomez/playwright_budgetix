import { test as base } from 'playwright-bdd';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

type MyFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      locale: 'es-ES',
      extraHTTPHeaders: { 'Accept-Language': 'es-ES,es;q=0.9' },
    });
    await use(context);
    await context.close();
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
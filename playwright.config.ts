import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import 'dotenv/config';
import { BASE_URL } from './pages/urls';

export default defineConfig({
  testDir: defineBddConfig({
    paths: ['features/**/*.feature'],
    steps: ['features/steps/**/*.ts'],
  }),
  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  use: {
    headless: false,
    baseURL: BASE_URL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    launchOptions: {
      args: [
        '--disable-features=Translate,TranslateUI',
        '--disable-translate',
        '--lang=es',
      ],
    },
  },
  projects: [
    {      
      name: 'Android',
        use: {
          viewport: { width: 412, height: 915 },
          isMobile: true,
          hasTouch: true,
          deviceScaleFactor: 2.625,
          userAgent:
            'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        },
    },
    {
      name: 'iPhone',
        use: {    
          viewport: { width: 390, height: 844 }, // tamaño real CSS
          isMobile: true,
          hasTouch: true,
          deviceScaleFactor: 3,
          userAgent:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
        },
    },

   // {
    //  name: 'iOS',
   //   use: {
   //     ...devices['iPhone 12 P'],  
   //   },
   // },
    {
      name: 'Desktop',
      use: {
        viewport: { width: 1280, height: 800 },
      },
    },
  ],
});

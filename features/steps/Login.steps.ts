import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { Given, When, Then } = createBdd(test);

Given('que el usuario está en la página de login', async ({ page, oginPage }) => {
  await page.goto('/index.php?route=account/login');
});
import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pageObjects/login.page';
import config from '../../config/develop.json';

test('Login with valid credentials', async ({ page }) => {
  const password = config.password || process.env.SAUCEDEMO_PASSWORD;
  if (!password) {
    throw new Error('Set config.password or the SAUCEDEMO_PASSWORD environment variable.');
  }

  const loginPage = new LoginPage(page);
  await loginPage.launchUrl();
  await loginPage.login(config.username, password);

  await expect(page.getByText('Products')).toBeVisible();
});



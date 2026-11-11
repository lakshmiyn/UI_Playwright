import config from '../../config/develop.json';
import { test } from '@playwright/test';
import { productspage } from '../../pageObjects/products.page';
import { LoginPage } from '../../pageObjects/login.page';


let productsPage
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  productsPage = new productspage(page);
  await loginPage.launchUrl();
  await loginPage.login(config.username, config.password);
});

test('Verify menu items', async ({ page }) => {
  await productsPage.clickOnMenuButton();
  await productsPage.verifyMenuItems();
});


test('Verify Dynamic Catalog subitems', async ({ page }) => {
  await productsPage.clickOnMenuButton();
  await productsPage.clickOnDynamicCatalog();
  await productsPage.verifySubDynamicCatalog();
});

test('Verify Add to Cart button functionality', async ({ page }) => {
   await productsPage.clickOnAddToCartButton();


})
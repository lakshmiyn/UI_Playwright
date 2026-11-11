import {expect} from '@playwright/test';
import config from '../config/develop.json';

export class productspage {
constructor(page) {
    this.page = page;
    this.menuButton = page.locator("div[class='bm-burger-button']");
    this.menuItems = page.locator("div[class='bm-menu'] a");
    this.dynamicCatalog=page.getByRole('button',{name:'Dynamic Catalog'});
    this.subDyanamicCatalog=page.locator("a[id='dynamic_catalog_submenu']");
    this.addToCartButton= page.getByTestId('inventory-item').filter({ has: page.getByRole('button', { name: 'Add to cart' }) }).first()
  }     


async clickOnMenuButton() {
    await this.menuButton.click();
}
async verifyMenuItems() {

    const expectedMenuItems = ['All Items','Dynamic Catalog', 'About', 'Logout', 'Reset App State'];
    const actualMenuItems = await this.menuItems.allTextContents();
    expect(actualMenuItems).toEqual(expectedMenuItems);
}
async clickOnDynamicCatalog() {
    await this.dynamicCatalog.click();
}

async verifySubDynamicCatalog() {
    const expectedSubMenuItems= ['Lazy Load','Spinner','Slider'];
    // const actualSubMenuItems= await this.subDyanamicCatalog.allTextContents();
    // expect(actualSubMenuItems).toEqual(expectedSubMenuItems);
    for(const item of expectedSubMenuItems) {
        const subMenuItem = this.page.getByRole('button', { name: item, exact: true });
        await expect(subMenuItem).toBeVisible();
    }
}

async clickOnAddToCartButton() {
    await this.addToCartButton.click();

}
}
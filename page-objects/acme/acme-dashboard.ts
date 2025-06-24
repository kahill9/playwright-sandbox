import { expect, type Locator, type Page } from "@playwright/test";

export class AcmeDashboardPage {
  readonly page: Page;
  readonly vendorsButton: Locator;
  readonly addVendorButton: Locator;
  readonly searchVendorButton: Locator;
  readonly homeButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.vendorsButton = page.getByRole("button", { name: "Vendors" });
    this.addVendorButton = page.getByRole("link", { name: "Add Vendor" });
    this.searchVendorButton = page.getByRole("link", { name: "Search for Vendor" });
    this.homeButton = page.locator('ol').getByRole('link', { name: 'Home' });

  }

  async clickAddNewVendor() {
    await this.vendorsButton.hover();
    await this.addVendorButton.click();
  }

  async clickSearchForVendor() {
    await this.vendorsButton.hover();
    await this.searchVendorButton.click();
  }

  async returnHome() {
    await this.homeButton.click();
  }
}

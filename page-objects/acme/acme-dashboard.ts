import { expect, type Locator, type Page } from "@playwright/test";

export class AcmeDashboardPage {
  readonly page: Page;
  readonly vendorsButton: Locator;
  readonly addVendorButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.vendorsButton = page.getByRole("button", { name: "Vendors" });
    this.addVendorButton = page.getByRole("link", { name: "Add Vendor" });
  }

  async clickAddNewVendor() {
    await this.vendorsButton.hover();
    await this.addVendorButton.click();
  }
}

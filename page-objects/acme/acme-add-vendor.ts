import { expect, type Locator, type Page } from "@playwright/test";

export class AddVendorPage {
  readonly page: Page;
  readonly vendorTaxId: Locator;
  readonly vendorName: Locator;
  readonly vendorAddress: Locator;
  readonly vendorCity: Locator;
  readonly vendorCountry: Locator;
  readonly saveVendorButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.vendorTaxId = page.locator('#vendorTaxId');
    this.vendorName = page.locator('#name');
    this.vendorAddress = page.locator('#address');
    this.vendorCity = page.locator('#city');
    this.vendorCountry = page.locator('#country');
    this.saveVendorButton = page.getByRole('button', { name: 'Save Vendor' });
  }

  async addNewVendor(vendor) {
    await this.vendorTaxId.fill(vendor.vendorTaxId);
    await this.vendorName.fill(vendor.vendorName);
    await this.vendorAddress.fill(vendor.vendorAddress);
    await this.vendorCity.fill(vendor.vendorCity);
    await this.vendorCountry.fill(vendor.vendorCountry);

    await this.saveVendorButton.click();
  }
}

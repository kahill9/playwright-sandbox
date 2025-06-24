import { expect, type Locator, type Page } from "@playwright/test";

export class SearchVendorPage {
  readonly page: Page;
  readonly vendorName: Locator;
  readonly searchButton: Locator;
  readonly searchResultsTableVendorName: Locator;
  readonly searchResultsTableVendorTaxId: Locator;
  readonly searchResultsTableVendorAddress: Locator;
  readonly searchResultsTableVendorCity: Locator;
  readonly searchResultsTableVendorCountry: Locator;


  constructor(page: Page) {
    this.page = page;
    this.vendorName = page.locator('#vendorName');
    this.searchButton = page.getByRole('button', { name: 'Search' })

    this.searchResultsTableVendorName = page.locator('td').first();
    this.searchResultsTableVendorTaxId = page.locator('td:nth-child(2)').first();
    this.searchResultsTableVendorAddress = page.locator('td:nth-child(3)').first();
    this.searchResultsTableVendorCity = page.locator('td:nth-child(4)').first();
    this.searchResultsTableVendorCountry = page.locator('td:nth-child(5)').first();
  }

  async searchByVendorName(vendorName) {
    await this.vendorName.fill(vendorName);

    await this.searchButton.click();
  }
}

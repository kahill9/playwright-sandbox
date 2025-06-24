import { test, expect } from "@playwright/test";
import { AcmeLoginPage } from "../../page-objects/acme/acme-login";
import { AcmeDashboardPage } from "../../page-objects/acme/acme-dashboard";
import { AddVendorPage } from "../../page-objects/acme/acme-add-vendor";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { SearchVendorPage } from "../../page-objects/acme/acme-search-vendor";

const specificSubdirectory = path.join(__dirname, "..", "..", "test-data");

const records = parse(
  fs.readFileSync(path.join(specificSubdirectory, "AcmeTestData.csv")),
  {
    columns: true,
    skip_empty_lines: true,
  }
);

test.beforeEach("Login to Acme", async ({ page }) => {
  console.log(`Loging in for - ${test.info().title}`);

  const acmeLoginPage = new AcmeLoginPage(page);

  await acmeLoginPage.goto();

  await acmeLoginPage.enterEmail("kaylie.hill@cgi.com");

  await acmeLoginPage.enterPassword("testpassword");

  await acmeLoginPage.clickLogin();
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("ACME System 1 -  Dashboard");
});

for (const record of records) {
  test(
    `Add New Vendor: ${record.testCase}`,
    { tag: "@smoke" },
    async ({ page }) => {
      console.log(`Running ${test.info().title}`);

      const acmeDashboardPage = new AcmeDashboardPage(page);
      const addVendorPage = new AddVendorPage(page);
      const searchVendorPage = new SearchVendorPage(page);

      await acmeDashboardPage.clickAddNewVendor();

      const vendor = {
        vendorTaxId: record.vendorTaxId,
        vendorName: record.vendorName,
        vendorAddress: record.vendorAddress,
        vendorCity: record.vendorCity,
        vendorCountry: record.vendorCountry,
      };

      await addVendorPage.addNewVendor(vendor);

      // Return to Dashboard
      await acmeDashboardPage.returnHome();

      // Validate vendor was added
      console.log(`Validating Vendor for - ${test.info().title}`);

      await acmeDashboardPage.clickSearchForVendor();

      await searchVendorPage.searchByVendorName(vendor.vendorName);

      await expect(searchVendorPage.searchResultsTableVendorName).toHaveText(vendor.vendorName);
      await expect(searchVendorPage.searchResultsTableVendorTaxId).toHaveText(vendor.vendorTaxId);
      await expect(searchVendorPage.searchResultsTableVendorAddress).toHaveText(vendor.vendorAddress);
      await expect(searchVendorPage.searchResultsTableVendorCity).toHaveText(vendor.vendorCity);
      await expect(searchVendorPage.searchResultsTableVendorCountry).toHaveText(vendor.vendorCountry);
    }
  );
}



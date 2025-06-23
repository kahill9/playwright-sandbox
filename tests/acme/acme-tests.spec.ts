import { test, expect } from "@playwright/test";
import { AcmeLoginPage } from "../../page-objects/acme/acme-login";
import { AcmeDashboardPage } from "../../page-objects/acme/acme-dashboard";
import { AddVendorPage } from "../../page-objects/acme/acme-add-vendor";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

const specificSubdirectory = path.join(__dirname, "..", "..", "test-data");

const records = parse(
  fs.readFileSync(path.join(specificSubdirectory, "AcmeTestData.csv")),
  {
    columns: true,
    skip_empty_lines: true,
  }
);

test.beforeEach("Login to Acme", async ({ page }) => {
  console.log(`Running ${test.info().title}`);

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

      await acmeDashboardPage.clickAddNewVendor();

      const vendor = {
        vendorTaxId: record.vendorTaxId,
        vendorName: record.vendorName,
        vendorAddress: record.vendorAddress,
        vendorCity: record.vendorCity,
        vendorCountry: record.vendorCountry,
      };

      await addVendorPage.addNewVendor(vendor);
    }
  );
}

import { expect, type Locator, type Page } from "@playwright/test";

export class AcmeLoginPage {
  readonly page: Page;
  readonly emailTextBox: Locator;
  readonly passwordTextBox: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailTextBox = page.getByRole("textbox", { name: "Email:" });
    this.passwordTextBox = page.getByRole("textbox", { name: "Password:" });
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async goto() {
    await this.page.goto("https://acme-test.uipath.com/login");
  }

  async enterEmail(userEmail) {
    await this.emailTextBox.fill(userEmail);
  }

  async enterPassword(userPassword) {
    await this.passwordTextBox.fill(userPassword);
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}

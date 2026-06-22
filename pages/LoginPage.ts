import { type Page, type Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInBtn: Locator;
    readonly invalidCredMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByRole("textbox", {name: "Email"});
        this.passwordInput = page.getByRole("textbox", {name: "Password"});
        this.signInBtn = page.getByRole("button", {name: "Sign in"});
        this.invalidCredMsg = page.getByRole("listitem").getByText("credentials invalid");
    }

    async goToLoginPage() {
        await this.page.goto("https://demo.realworld.show/login");
    }

    async fillCredentials(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async submit() {
        await this.signInBtn.click();
    }

    async fullLoginFlow(email: string, password: string) {
        await this.fillCredentials(email, password);
        await this.submit();
    }
}
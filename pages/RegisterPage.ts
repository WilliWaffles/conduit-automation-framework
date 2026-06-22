import { type Page, type Locator } from "@playwright/test";

export class RegisterPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signUpBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole("textbox", {name: "Username"});
        this.emailInput = page.getByRole("textbox", {name: "Email"});
        this.passwordInput = page.getByRole("textbox", {name: "Password"});
        this.signUpBtn = page.getByRole("button", {name: "Sign up"});
    }

    async goToSignUpPage() {
        await this.page.goto("https://demo.realworld.show/register");
    }

    async fillCredentials(username: string, email: string, password: string) {
        await this.usernameInput.fill(username);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async submit() {
        await this.signUpBtn.click();
    }

    async fullSignUpFlow(username: string, email: string, password: string) {
        await this.fillCredentials(username, email, password);
        await this.submit();
    }
}
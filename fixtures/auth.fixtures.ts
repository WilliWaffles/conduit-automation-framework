import { test as base, expect} from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

interface RegisteredUser {
    username: string;
    email: string;
    password: string;
};

export const test = base.extend<{ registeredUser: RegisteredUser }>({
    registeredUser: async ({ page }, use) => {
        const uniqueUsername = `qa-user-${Date.now()}`;
        const uniqueEmail = `qa-${Date.now()}@testemail.com`;
        const password = "123456789";
        const registerPage = new RegisterPage(page);

        const registeredUserData = {
            username: uniqueUsername,
            email: uniqueEmail,
            password: password
        }

        await registerPage.goToSignUpPage();
        await registerPage.fullSignUpFlow(uniqueUsername, uniqueEmail, password);

        await expect(page.getByRole("link", {name: uniqueUsername})).toBeVisible();

        await page.context().clearCookies();
        await page.evaluate(() => localStorage.clear());

        await page.reload();

        await use(registeredUserData);

    },
});
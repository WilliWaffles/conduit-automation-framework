import { test as base, expect} from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage'; 
import { createUser, User } from '../utils/userFactory';


export const test = base.extend<{ registeredUser: User }>({
    registeredUser: async ({ page }, use) => {
        const registeredUser = createUser();
        const registerPage = new RegisterPage(page);

        await registerPage.goToSignUpPage();
        await registerPage.fullSignUpFlow(registeredUser.username, registeredUser.email, registeredUser.password);

        await expect(page.getByRole("link", {name: registeredUser.username})).toBeVisible();

        await page.context().clearCookies();
        await page.evaluate(() => localStorage.clear());

        await page.reload();

        await use(registeredUser);

    },
});
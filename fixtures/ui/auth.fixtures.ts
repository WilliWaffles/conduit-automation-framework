import { test as base, expect} from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage'; 
import { createUser, User } from '../../utils/userFactory';


export const test = base.extend<{ registeredUser: User, registeredLoggedUser: User }>({
    // registeredUser: object containing unique username, email and password
    // uniqueness guaranteed by Date.now() in userFactory
    registeredUser: async ({ page }, use) => {
        // createUser() must be called inside the fixture to avoid 
        // shared state between parallel tests
        const userData = createUser();
        const registerPage = new RegisterPage(page);

        await registerPage.goToSignUpPage();
        await registerPage.fullSignUpFlow(userData.username, userData.email, userData.password);

        await expect(page.getByRole("link", {name: userData.username})).toBeVisible();
        
        // Clear cookies so user is not logged in and we can test Login flow
        await page.context().clearCookies();
        await page.evaluate(() => localStorage.clear());

        await page.reload();

        await use(userData);

    },
    registeredLoggedUser: async ({ page }, use) => {
        const userData = createUser();
        const registerPage = new RegisterPage(page);

        await registerPage.goToSignUpPage();
        await registerPage.fullSignUpFlow(userData.username, userData.email, userData.password);

        await expect(page.getByRole("link", {name: userData.username})).toBeVisible();

        await use(userData);
    }
});
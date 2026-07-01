import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { test } from '../../fixtures/ui/article.fixtures';

test('User can login with correct credentials', { tag: ['@smoke', '@regression'] }, async ({page, registeredUser}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goToLoginPage();

    await expect(page).toHaveURL("https://demo.realworld.show/login");

    await expect(loginPage.signInBtn).toBeDisabled();
    await loginPage.fillCredentials(registeredUser.email, registeredUser.password);
    await expect(loginPage.signInBtn).toBeEnabled();

    await loginPage.loginAndWaitForHome();

    await expect(page).toHaveURL("https://demo.realworld.show/");
    await expect(page.getByRole("link", {name: registeredUser.username})).toBeVisible();
});

test('User cannot login with invalid credentials', { tag: '@regression'}, async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLoginPage();


    const INVALID_TEST_EMAIL = "qa-non-existing-email@invalid.com";
    const TEST_PASSWORD = "741852.";

    await expect(loginPage.signInBtn).toBeDisabled();

    await loginPage.fillCredentials(INVALID_TEST_EMAIL, TEST_PASSWORD);
    await expect(loginPage.signInBtn).toBeEnabled();

    await loginPage.submitAndWaitForErrorMsg();

    await expect(loginPage.invalidCredMsg).toBeVisible();
    await expect(page).toHaveURL("https://demo.realworld.show/login");
});
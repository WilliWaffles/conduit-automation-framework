import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { test } from '../fixtures/auth.fixtures';

test('User can login with correct credentials', async ({page, registeredUser}) => {
    const loginPage = new LoginPage(page);
    
    // Step 1: Go to Sign in page
    await loginPage.goToLoginPage();

    await expect(page).toHaveURL("https://demo.realworld.show/login");

    // Step 2: Assert Sign In button, then Add credentials
    await expect(loginPage.signInBtn).toBeDisabled();
    await loginPage.fillCredentials(registeredUser.email, registeredUser.password);
    await expect(loginPage.signInBtn).toBeEnabled();

    // Step 3: Submit info and Verify login
    await loginPage.loginAndWaitForHome();

    await expect(page).toHaveURL("https://demo.realworld.show/");
    await expect(page.getByRole("link", {name: registeredUser.username})).toBeVisible();
});

test('User cannot login with invalid credentials', async ({page}) => {
    const loginPage = new LoginPage(page);

    // Step 1: Go to Sign in page
    await loginPage.goToLoginPage();

    // Step 2: Assert Sign In button, then Add invalid credentials
    const INVALID_TEST_EMAIL = "qa-non-existing-email@invalid.com";
    const TEST_PASSWORD = "741852.";

    await expect(loginPage.signInBtn).toBeDisabled();

    await loginPage.fillCredentials(INVALID_TEST_EMAIL, TEST_PASSWORD);
    await expect(loginPage.signInBtn).toBeEnabled();

    // Step 3: Submit info and Verify error message
    await loginPage.submitAndWaitForErrorMsg();

    await expect(loginPage.invalidCredMsg).toBeVisible();
    await expect(page).toHaveURL("https://demo.realworld.show/login");
});
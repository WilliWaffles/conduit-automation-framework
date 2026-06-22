import {test, expect} from '@playwright/test'
import { RegisterPage } from '../pages/RegisterPage';

test('User can create an account', async ({page}) => {
    const registerPage = new RegisterPage(page);

    // Step 1: Go to sign up page
    await registerPage.goToSignUpPage();

    await expect(page).toHaveURL("https://demo.realworld.show/register");

    // Step 2: Assert Sign up button and add credentials
    const uniqueUsername = `qa-user-${Date.now()}`;
    const uniqueEmail = `qa-${Date.now()}@testemail.com`;
    const password = "123456789";

    await expect(registerPage.signUpBtn).toBeDisabled();
    await registerPage.fillCredentials(uniqueUsername, uniqueEmail, password);
    await expect(registerPage.signUpBtn).toBeEnabled();

    // Step 3: Submit info and Verify login
    await registerPage.submit();

    await expect(page).toHaveURL("https://demo.realworld.show/");
    await expect(page.getByRole("link", {name: uniqueUsername})).toBeVisible();
});
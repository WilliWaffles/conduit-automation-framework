import {test, expect} from '@playwright/test'
import { RegisterPage } from '../pages/RegisterPage';
import { createUser } from '../utils/userFactory';

test('User can create an account', { tag: '@regression' }, async ({page}) => {
    const registerPage = new RegisterPage(page);

    // Step 1: Go to sign up page
    await registerPage.goToSignUpPage();

    await expect(page).toHaveURL("https://demo.realworld.show/register");

    // Step 2: Assert Sign up button and add credentials
    const user = createUser();

    await expect(registerPage.signUpBtn).toBeDisabled();
    await registerPage.fillCredentials(user.username, user.email, user.password);
    await expect(registerPage.signUpBtn).toBeEnabled();

    // Step 3: Submit info and Verify login
    await registerPage.submit();

    await expect(page).toHaveURL("https://demo.realworld.show/");
    await expect(page.getByRole("link", {name: user.username})).toBeVisible();
});
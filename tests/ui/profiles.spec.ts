import { expect } from '@playwright/test';
import { test } from '../../fixtures/auth.fixtures';
import { HomePage } from '../../pages/HomePage';
import { ProfilePage } from '../../pages/ProfilePage';

test('User can follow and unfollow another user', async ({ page, registeredLoggedUser}) => {
    const homePage = new HomePage(page);
    const profilePage = new ProfilePage(page);

    await homePage.selectUserProfile();

    await expect(profilePage.followBtn).toBeVisible();
    await profilePage.followProfile();

    await expect(profilePage.followBtn).not.toBeVisible();
    await expect(profilePage.unfollowBtn).toBeVisible();

    await profilePage.unfollowProfile();

    await expect(profilePage.followBtn).toBeVisible();
    await expect(profilePage.unfollowBtn).not.toBeVisible();
})
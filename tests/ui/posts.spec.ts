import { test } from '../../fixtures/auth.fixtures';
import { expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('User can like and unlike a post', async ({ page, registeredLoggedUser })=> {
    const homePage = new HomePage(page);
    const originalLikes = await homePage.getLikeCount(false);

    await homePage.likePost();
    const newLikes = await homePage.getLikeCount(true);

    expect(newLikes).toBe(originalLikes + 1);

    await homePage.unlikePost();
    
    expect(await homePage.getLikeCount(false)).toBe(originalLikes);
})
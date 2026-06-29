import { test } from '../../fixtures/auth.fixtures';
import { expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { UserArticlePage } from '../../pages/UserArticlePage';

test('User can like and unlike a post', async ({ page, registeredLoggedUser })=> {
    const homePage = new HomePage(page);
    const originalLikes = await homePage.getLikeCount(false);

    await homePage.likePost();
    const newLikes = await homePage.getLikeCount(true);

    expect(newLikes).toBe(originalLikes + 1);

    await homePage.unlikePost();
    
    expect(await homePage.getLikeCount(false)).toBe(originalLikes);
})

test('User can leave a comment on a post', async ({ page, registeredLoggedUser }) => {
    const homePage = new HomePage(page);
    const userArticlePage = new UserArticlePage(page);
    const comment = "Test Comment";

    await homePage.selectPost();

    await userArticlePage.fillComment(comment);

    await userArticlePage.postComment();

    await expect(userArticlePage.commentsPosted.first()).toHaveText(comment);
})

test('User cannot leave a blank comment on a post', async ({ page, registeredLoggedUser }) => {
    const homePage = new HomePage(page);
    const userArticlePage = new UserArticlePage(page);

    await homePage.selectPost();

    await userArticlePage.postComment();

    await expect(userArticlePage.blankCommentErrorMsg).toBeVisible();
})
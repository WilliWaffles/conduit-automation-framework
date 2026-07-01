import { test as base } from './signUp.api.fixtures';
import { createArticle, type Article } from '../../utils/articleFactory';
import { request } from '@playwright/test';

export const test = base.extend<{articleCreated: Article}>({
    articleCreated: async ({ request, registeredUser}, use) => {
        const articleData = createArticle();
        const userToken = registeredUser.
        await request.post
    }
})
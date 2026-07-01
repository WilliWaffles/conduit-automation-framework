import { expect } from '@playwright/test';
import { test } from '../../fixtures/api/signUp.api.fixtures';
import { slugExtractor } from '../../utils/slugExtractor';

test('List all articles on the feed', async ({ request }) => {
    const endpoint = 'https://api.realworld.show/api/articles';
    const exploratoryResponse = await request.get(endpoint, {})
    const responseJson = await exploratoryResponse.json();

    const articlesCount = responseJson.articlesCount
    const limit = 2 // Fixed for small sample

    // If the articlesCount is less than the limit
    // we have nothing to show on second page
    // so we skip the test
    test.skip(articlesCount <= limit); 

    const responsePage1 = await request.get(endpoint, {
        params: {
            limit: limit,
            offset: 0
        }
    })

    const responsePage2 = await request.get(endpoint, {
        params: {
            limit: limit,
            offset: limit // Offset starts where limit ended previously (2). So 0-1 first page, 2-3 second page
        }
    })
    
    const responsePage1Json = await responsePage1.json();
    const responsePage2Json = await responsePage2.json();

    const slugsPage1 = slugExtractor(responsePage1Json);
    const slugsPage2 = slugExtractor(responsePage2Json);

    expect(slugsPage1.some(slug => slugsPage2.includes(slug))).toBe(false);
});
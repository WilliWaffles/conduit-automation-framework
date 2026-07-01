import { expect } from '@playwright/test';
import { ArticleCreatorPage } from '../../pages/ArticleCreatorPage';
import { createArticle } from '../../utils/articleFactory';
import { ArticleEditorPage } from '../../pages/ArticleEditorPage';
import { test } from '../../fixtures/ui/article.fixtures';


test('User can publish a valid article and visualize it', { tag: ['@smoke', '@regression'] }, async ({ page, registeredLoggedUser}) => {
    const articleData = createArticle();
    const articleCreatorPage = new ArticleCreatorPage(page);
    const articleEditorPage = new ArticleEditorPage(page, articleData);

    await articleCreatorPage.goToArticleCreationPage();
    await expect(page).toHaveURL('https://demo.realworld.show/editor');

    await articleCreatorPage.fillArticleData(articleData.title, articleData.summary, articleData.body, articleData.tags);

    await expect(articleCreatorPage.tags).toHaveCount(articleData.tags.length);
    await articleCreatorPage.submitValidArticle();

    await expect(page).toHaveURL(/\/article\//);
    await expect(articleEditorPage.title).toHaveText(articleData.title);
    await expect(articleEditorPage.body).toHaveText(articleData.body);
    await expect(articleEditorPage.tags).toHaveCount(articleData.tags.length);
})

test('User cannot publish an article with incomplete information', { tag: '@regression'}, async ({ page, registeredLoggedUser}) => {
    const articleCreatorPage = new ArticleCreatorPage(page);

    await articleCreatorPage.goToArticleCreationPage();
    await expect(page).toHaveURL('https://demo.realworld.show/editor');

    await articleCreatorPage.submitInvalidArticle();
    await expect(page).toHaveURL("https://demo.realworld.show/editor");

    await expect(articleCreatorPage.titleErrorMsg).toBeVisible();
    await expect(articleCreatorPage.summaryErrorMsg).toBeVisible();
    await expect(articleCreatorPage.bodyErrorMsg).toBeVisible();

})

test('User can edit and delete a published article', { tag: '@regression'}, async ({ page, publishedArticle, registeredLoggedUser}) => {
    const articleEditorPage = new ArticleEditorPage(page, publishedArticle);
    const articleCreatorPage = new ArticleCreatorPage(page);
    const newTitle  = "Title Changed";
    const newSummary  = "Summary Changed";
    const newBody  = "Body Changed";
    const newTags:string[]  = ["New", "Tags", "Equal", "Four"];

    await expect(articleEditorPage.editBtn.first()).toBeVisible();
    await articleEditorPage.editArticle();

    await expect(articleCreatorPage.titleInput).toHaveValue(publishedArticle.title);
    await expect(articleCreatorPage.summaryInput).toHaveValue(publishedArticle.summary);
    await expect(articleCreatorPage.bodyInput).toHaveValue(publishedArticle.body);
    await expect(articleCreatorPage.tags).toHaveCount(publishedArticle.tags.length);

    // Edit Article
    await articleCreatorPage.deleteTags();
    await articleCreatorPage.fillArticleData(newTitle, newSummary, newBody, newTags);
    await articleCreatorPage.submitValidArticle();

    await expect(articleEditorPage.title).toHaveText(newTitle);
    await expect(articleEditorPage.body).toHaveText(newBody);
    await expect(articleEditorPage.tags).toHaveCount(newTags.length);

    // Delete Article
    await articleEditorPage.deleteArticle();

    await expect(page).toHaveURL("https://demo.realworld.show/");

    await page.goto(`https://demo.realworld.show/profile/${registeredLoggedUser.username}`);

    await expect(articleEditorPage.articleLinkProfile).not.toBeVisible();
    await expect(page.getByText("No articles are here... yet.")).toBeVisible();
})
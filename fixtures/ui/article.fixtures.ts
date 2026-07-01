import { createArticle, type Article } from '../../utils/articleFactory';
import { test as base } from './auth.fixtures';
import { ArticleCreatorPage } from '../../pages/ArticleCreatorPage';

export const test = base.extend<{ publishedArticle: Article }>({
    // publishedArticle: object containing unique title. Also contains summary, body, and a list of tags
    // uniqueness guaranteed by Date.now() in articleFactory. Summary and body is Lorem Ipsum text
    publishedArticle: async ({ page, registeredLoggedUser }, use) => {
        const articleData = createArticle();
        const articleCreatorPage = new ArticleCreatorPage(page);
    
        await articleCreatorPage.goToArticleCreationPage();
    
        await articleCreatorPage.fillArticleData(articleData.title, articleData.summary, articleData.body, articleData.tags);
    
        await articleCreatorPage.submitValidArticle();

        await use(articleData);
    }
})
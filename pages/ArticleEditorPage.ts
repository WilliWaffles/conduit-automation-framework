import { type Page, type Locator } from '@playwright/test';
import type { Article } from '../utils/articleFactory';
import { User } from '../utils/userFactory';

export class ArticleEditorPage {
    readonly page: Page;
    readonly title: Locator;
    readonly body: Locator;
    readonly tags: Locator;
    readonly articleLinkProfile: Locator;
    readonly editBtn: Locator;
    readonly deleteBtn: Locator;

    constructor(page: Page, articleData: Article) {
        this.page = page;
        this.title = page.getByRole("heading");
        this.body = page.getByRole("paragraph");
        this.tags = page.locator(".tag-default.tag-pill");
        this.articleLinkProfile = page.getByRole("heading", {name: articleData.title});
        this.editBtn = page.getByRole("link", {name: /Edit Article/});
        this.deleteBtn = page.getByRole("button", {name: /Delete Article/});
    }

    async goToArticleEditorPage(user: User) {
        await this.page.goto(`https://demo.realworld.show/profile/${user.username}`);
        await this.articleLinkProfile.click();
    }

    async editArticle() {
        await this.editBtn.first().click();
        await this.page.waitForURL(/\/editor\//);
    }

    async deleteArticle() {
        await this.deleteBtn.first().click();
        await this.page.waitForURL("https://demo.realworld.show/");
    }
}
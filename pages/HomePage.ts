import { type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly users: Locator;
    readonly likePostBtn: Locator;
    readonly unlikePostBtn: Locator;
    readonly posts: Locator;

    constructor(page: Page) {
        this.page = page;
        this.users = page.locator(".author");
        this.likePostBtn = page.locator(".btn.btn-sm.btn-outline-primary");
        this.unlikePostBtn = page.locator(".btn.btn-sm.btn-primary");
        this.posts = page.getByRole("heading");
    }

    async selectUserProfile() {
        await this.users.first().click();
    }

    async selectPost() {
        await this.posts.first().click();
    }

    async likePost() {
        await this.likePostBtn.first().click();
    }

    async unlikePost() {
        await this.unlikePostBtn.first().click();
    }

    async getLikeCount(liked: boolean): Promise<number> {
        const btn = liked ? this.unlikePostBtn : this.likePostBtn;
        return parseInt((await btn.first().innerText()).trim());
    }
}
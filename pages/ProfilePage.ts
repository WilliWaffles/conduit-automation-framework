import { type Locator, type Page } from '@playwright/test';

export class ProfilePage {
    readonly page: Page;
    readonly followBtn: Locator;
    readonly unfollowBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.followBtn = page.getByRole("button", {name: /Follow/});
        this.unfollowBtn = page.getByRole("button", {name: /Unfollow/});
    }

    async followProfile() {
        this.followBtn.click();
    }

    async unfollowProfile() {
        this.unfollowBtn.click();
    }
}
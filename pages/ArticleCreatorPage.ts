import { type Page, type Locator, expect} from '@playwright/test';

export class ArticleCreatorPage {
    readonly page: Page;
    readonly titleInput: Locator;
    readonly summaryInput: Locator;
    readonly bodyInput: Locator;
    readonly tagsInput: Locator;
    readonly tags: Locator;
    readonly removeTagBtn: Locator;
    readonly publishBtn: Locator;
    readonly titleErrorMsg: Locator;
    readonly summaryErrorMsg: Locator;
    readonly bodyErrorMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleInput = page.getByRole("textbox", {name: "Article Title"});
        this.summaryInput = page.getByRole("textbox", {name: "What's this article about?"});
        this.bodyInput = page.getByRole("textbox", {name: "Write your article (in markdown)"});
        this.tagsInput = page.getByRole("textbox", {name: "Enter tags"});
        this.tags = page.locator(".tag-default.tag-pill");
        this.removeTagBtn = page.locator(".ion-close-round");
        this.publishBtn = page.getByRole("button", {name: "Publish Article"});
        this.titleErrorMsg = page.getByRole("listitem").getByText("title can't be blank");
        this.summaryErrorMsg = page.getByRole("listitem").getByText("description can't be blank");
        this.bodyErrorMsg = page.getByRole("listitem").getByText("body can't be blank");
    }

    async goToArticleCreationPage() {
        await this.page.goto('https://demo.realworld.show/editor');
    }

    async fillArticleData(title: string, summary: string, body: string, tags: string[]) {
        await this.titleInput.fill(title);
        await this.summaryInput.fill(summary);
        await this.bodyInput.fill(body);

        for (const tag of tags) {
            await this.tagsInput.fill(tag)
            await this.tagsInput.focus()
            await this.page.keyboard.press('Enter');
        }
    }

    async deleteTags() {
        for (let i = await this.tags.count(); 0 < await this.tags.count(); i--) {
            await this.removeTagBtn.first().click();
            await expect(this.tags).toHaveCount(i - 1);
        }
    }

    async submitValidArticle() {
        await this.publishBtn.click();
        await this.page.waitForURL(/\/article\//);
    }

    async submitInvalidArticle() {
        await this.publishBtn.click();
    }
}
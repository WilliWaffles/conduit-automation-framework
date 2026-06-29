import { type Locator, type Page} from '@playwright/test';

export class UserArticlePage {
    readonly page: Page;
    readonly commentInput: Locator;
    readonly postCommentBtn: Locator;
    readonly commentsPosted: Locator;
    readonly blankCommentErrorMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.commentInput = page.getByRole("textbox", {name: "Write a comment..."});
        this.postCommentBtn = page.getByRole("button", {name: "Post Comment"});
        this.commentsPosted = page.locator(".card-text");
        this.blankCommentErrorMsg = page.getByRole("listitem").getByText("body can't be blank");
    }

    async fillComment(comment: string) {
        await this.commentInput.fill(comment);
    }

    async postComment() {
        await this.postCommentBtn.click();
    }
}
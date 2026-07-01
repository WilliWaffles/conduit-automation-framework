export interface validArticleResponse {
    articles: [{
        slug: string;
        title: string;
        description: string;
        tagList: string[];
        createdAt: string;
        updatedAt: string;
        favorited: boolean;
        favoriteCount: number;
        author: object;
    }];
    articlesCount: number;
}

export function slugExtractor(json: validArticleResponse): string[] {
    return json.articles.map(article => article.slug)
}
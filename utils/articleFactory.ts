export interface Article {
    title: string;
    summary: string;
    body: string;
    tags: string[];
};

export function createArticle(): Article {
    return {
        title: `Article #${Date.now()}`,
        summary: `Lorem Ipsum`,
        body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Curabitur finibus lacus eget aliquet vulputate.
        Suspendisse iaculis libero sodales urna finibus lobortis.
        Quisque auctor vulputate tellus ac finibus.
        Vivamus convallis facilisis mi, at egestas nisi.
        Proin mollis accumsan eros, sed ullamcorper libero.
        Sed malesuada risus in ex facilisis scelerisque.
        Aliquam tempus tincidunt lorem, ut egestas sem feugiat a.
        Proin pellentesque lectus sed ullamcorper porta.
        In hac habitasse platea dictumst.`,
        tags: ["typescript", "playwright", "qa"]
    }
}
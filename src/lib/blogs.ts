
export interface IBlogPost {
    date: string;
    title: string;
    queryName: string;
    description: string;
    author: string;
    image: string;
    type: string;
    markdown: string;
    path: string;
}

export class BlogPost implements IBlogPost {
    date: string;
    title: string;
    queryName: string;
    description: string;
    author: string;
    image: string;
    type: string;
    markdown: string;
    path: string;

    constructor(post: IBlogPost) {
        this.date = post.date
        this.title = post.date
        this.queryName = post.queryName
        this.description = post.description
        this.author = post.author
        this.image = post.date
        this.type = post.type
        this.markdown = post.markdown
        this.path = post.path
    }
}
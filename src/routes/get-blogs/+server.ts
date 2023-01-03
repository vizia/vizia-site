import type { RequestHandler } from "./$types";
import type { Post, PostMeta } from '$lib/types';
import fs from 'fs';
import path from 'path'
import { json } from "@sveltejs/kit";

const META_GROUP_REGEX = /---\n([\s\S]+)\n---/gm;
const META_REGEX = /(.+?): (.+?)$/gm;

export function get_meta(markdown: string): PostMeta | undefined {
    let meta_group = markdown.match(META_GROUP_REGEX)
    if (meta_group == null) {
        return undefined;
    }

    let meta = meta_group[0].matchAll(META_REGEX);

    let markdown_meta: PostMeta = { date: "", landing_image: "", title: "" };
    for (const match of meta) {
        let element = match[1];
        let data = match[2];

        switch (element) {
            case "date":
                markdown_meta.date = data;
                break;

            case "title":
                markdown_meta.title = data;
                break;

            case "landing_image":
                markdown_meta.landing_image = data;
                break;

            default:
                break;
        }
    }


    return markdown_meta;
}

const base = path.resolve("", "static/blog")

export function search_posts(base_dir: string): Post[] {

    let posts: Post[] = []

    let post_dirs = fs.readdirSync(base_dir)

    for (let i = 0; i < post_dirs.length; i++) {
        let post = post_dirs[i];
        let markdown = fs.readFileSync(`${base_dir}/${post}/index.md`).toString()
        let meta = get_meta(markdown)

        posts.push({
            path: post,
            meta: meta
        })

    }

    return posts

}

export const GET = (async () => {
    const posts = search_posts(base);
    return json(posts)

}) satisfies RequestHandler
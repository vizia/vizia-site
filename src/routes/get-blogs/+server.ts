import type { RequestHandler } from './$types';
import type { Post, PostMeta } from '$lib/types';
import fs from 'fs';
import path from 'path';
import { json } from '@sveltejs/kit';

const META_GROUP_REGEX = /---\n([\s\S]+)\n---/gm;
const META_REGEX = /(.+?): (.+?)$/gm;

export function get_meta(markdown: string): PostMeta | undefined {
	const meta_group = markdown.match(META_GROUP_REGEX);
	if (meta_group == null) {
		return undefined;
	}

	const meta = meta_group[0].matchAll(META_REGEX);

	const markdown_meta: PostMeta = { date: '', landing_image: '', title: '' };
	for (const match of meta) {
		const element = match[1];
		const data = match[2];

		switch (element) {
			case 'date':
				markdown_meta.date = data;
				break;

			case 'title':
				markdown_meta.title = data;
				break;

			case 'landing_image':
				markdown_meta.landing_image = data;
				break;

			default:
				break;
		}
	}

	return markdown_meta;
}

const base = path.resolve('', 'static/blog');

export function search_posts(base_dir: string): Post[] {
	const posts: Post[] = [];

	const post_dirs = fs.readdirSync(base_dir);

	for (let i = 0; i < post_dirs.length; i++) {
		const post = post_dirs[i];
		const markdown = fs.readFileSync(`${base_dir}/${post}/index.md`).toString();
		const meta = get_meta(markdown);

		posts.push({
			path: post,
			meta: meta
		});
	}

	return posts;
}

export const GET = (async () => {
	const posts = search_posts(base);
	return json(posts);
}) satisfies RequestHandler;

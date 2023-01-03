export const prerender = true;

import type { RequestHandler } from './$types';
import type { Post } from '$lib/types';
import fs from 'fs';
import path from 'path';
import { json } from '@sveltejs/kit';
import { get_post_meta } from '$lib/post';

const base = path.resolve('', 'static/blog');

function search_posts(base_dir: string): Post[] {
	const posts: Post[] = [];

	const post_dirs = fs.readdirSync(base_dir);

	for (let i = 0; i < post_dirs.length; i++) {
		const post = post_dirs[i];
		const markdown = fs.readFileSync(`${base_dir}/${post}/index.md`).toString();
		const meta = get_post_meta(markdown);

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

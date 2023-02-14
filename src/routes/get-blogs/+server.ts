export const prerender = true;

import type { RequestHandler } from './$types';
import type { Post } from '$lib/types';
import fs from 'fs';
import { json } from '@sveltejs/kit';
import { get_post_meta } from '$lib/post';
import { getItems } from '$lib/search';
import path from "path"

const base = 'static/blogs';

export const GET = (async () => {

	let files = getItems("blogs")

	let posts: Post[] = [];

	for (const post of files) {

		let basePath = path.join(base, post)

		const markdown = fs.readFileSync(path.join(basePath, "index.md")).toString();
		const meta = get_post_meta(markdown);

		posts.push({
			path: post,
			meta: meta
		});
	}

	return json(posts);
}) satisfies RequestHandler;

export const prerender = true;

import type { RequestHandler } from './$types';
import type { BlogPost } from '$lib/types';
import fs from 'fs';
import { json } from '@sveltejs/kit';
import { getItems } from '$lib/search';
import path from "path"

const base = 'static/blogs';

export const GET = (async () => {

	let files = getItems("blogs")

	let posts: BlogPost[] = [];

	for (const post of files) {

		let basePath = path.join(base, post)

		let blogPost = JSON.parse(fs.readFileSync(path.join(basePath, "index.json")).toString()) as BlogPost
		blogPost.markdown = fs.readFileSync(path.join(basePath, "index.md")).toString();
		blogPost.path = post;

		posts.push(blogPost);
	}

	console.log({ posts })

	return json(posts);
}) satisfies RequestHandler;

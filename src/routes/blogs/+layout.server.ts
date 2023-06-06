import { base } from '$app/paths';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { BlogPost } from '$lib/blogs';

const BLOGS_INDEX_FILE = base + "/docs/blogs/index.json"

export const load = (async ({ fetch }) => {

	const blogs = await fetch(BLOGS_INDEX_FILE)

	if (!blogs.ok) {
		throw error(404, 'Not found')
	}

	const posts = (await blogs.json()) as BlogPost[];

	return {
		posts,
	}

}) satisfies LayoutServerLoad;

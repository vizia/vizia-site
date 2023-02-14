import { base } from '$app/paths';
import type { BlogPost } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const response = await fetch(`${base}/get-blogs`);
	if (response.ok) {
		const json = await response.json();
		const posts = json as BlogPost[];
		return {
			posts: posts
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;

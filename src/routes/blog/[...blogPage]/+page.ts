import { parse_post_markdown } from '$lib/post';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/blog/${params.blogPage}/index.md`);
	if (response.ok) {
		const markdown_text = await response.text();
		const parsed = parse_post_markdown(markdown_text);
		return {
			blogPage: params.blogPage,
			markdown: parsed[0],
			meta: parsed[1]
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;

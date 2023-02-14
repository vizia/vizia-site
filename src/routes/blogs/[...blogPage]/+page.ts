import { base } from '$app/paths';
import type { BlogPost } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const pathToFetchFile = `${base}/blogs/${params.blogPage}/index.md`
	const pathToFetchMeta = `${base}/blogs/${params.blogPage}/index.json`

	const responseMarkdown = await fetch(pathToFetchFile);
	const responseMeta = await fetch(pathToFetchMeta);

	if (responseMarkdown.ok && responseMeta.ok) {
		const markdown = await responseMarkdown.text();
		const meta = JSON.parse(await responseMeta.text()) as BlogPost;
		return {
			blogPage: params.blogPage,
			markdown: markdown,
			blogPageMeta: meta
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;

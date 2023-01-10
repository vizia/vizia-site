import { base } from '$app/paths';
import { parse_doc_markdown } from '$lib/doc';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(
		`${base}/docs/guide/index.md`
	);
	if (response.ok) {
		const markdown = await response.text();
		return {
			docsPage: [],
			markdown: parse_doc_markdown(markdown)[0]
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;

import { parse_doc_markdown } from '$lib/doc';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(
		`/docs/guide${params.docsPage === '' ? 'index' : '/' + params.docsPage}.md`
	);
	if (response.ok) {
		const markdown = await response.text();
		return {
			docsPage: params.docsPage,
			markdown: parse_doc_markdown(markdown)[0]
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;

import { base } from '$app/paths';
import { parse_doc_markdown } from '$lib/doc';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(
		`${base}/docs/guide${params.docsPage === '' ? 'index' : '/' + params.docsPage}.md`
	);

	if (response.ok) {
		const markdown = await response.text();
		const [parsed_markdown, markdown_meta] = parse_doc_markdown(markdown);
		return {
			docsPage: params.docsPage,
			markdown: parsed_markdown,
			markdown_meta: markdown_meta
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;

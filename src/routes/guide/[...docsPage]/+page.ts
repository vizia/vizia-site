import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const META_GROUP_REGEX = /---\n([\s\S]+)\n---/gm;

function parse_markdown(markdown: string): string {
	const meta_group = markdown.match(META_GROUP_REGEX);
	if (meta_group == null) {
		return markdown;
	}

	markdown = markdown.replace(meta_group[0], '');

	return markdown;
}

export const load = (async ({ params, fetch }) => {
	const response = await fetch(
		`/docs/guide${params.docsPage === '' ? 'index' : '/' + params.docsPage}.md`
	);
	if (response.ok) {
		const markdown = await response.text();
		return {
			docsPage: params.docsPage,
			markdown: parse_markdown(markdown)
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;

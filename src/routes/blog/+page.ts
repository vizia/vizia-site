import type { Post, PostMeta } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const META_GROUP_REGEX = /---\n([\s\S]+)\n---/gm;
const META_REGEX = /(.+?): (.+?)$/gm;

function get_meta(markdown: string): PostMeta | undefined {
	const meta_group = markdown.match(META_GROUP_REGEX);
	if (meta_group == null) {
		return undefined;
	}

	const meta = meta_group[0].matchAll(META_REGEX);

	const markdown_meta: PostMeta = { date: '', landing_image: '', title: '' };
	for (const match of meta) {
		const element = match[1];
		const data = match[2];

		switch (element) {
			case 'date':
				markdown_meta.date = data;
				break;

			case 'title':
				markdown_meta.title = data;
				break;

			case 'landing_image':
				markdown_meta.landing_image = data;
				break;

			default:
				break;
		}
	}

	return markdown_meta;
}

function parse_markdown(markdown: string): [string, PostMeta | undefined] {
	const meta_group = markdown.match(META_GROUP_REGEX);
	if (meta_group == null) {
		return [markdown, undefined];
	}

	const markdown_meta = get_meta(markdown);
	markdown = markdown.replace(meta_group[0], '');

	return [markdown, markdown_meta];
}

export const load = (async ({ params, fetch }) => {

	const response = await fetch(`/get-blogs`);
	if (response.ok) {
		const json = await response.json();
		const posts = json as Post[];
		return {
			blogPage: params.blogPage,
			posts: posts
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;

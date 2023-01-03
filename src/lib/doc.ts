import type { FileMeta } from './types';

const META_GROUP_REGEX = /---\n([\s\S]+)\n---/gm;
const META_REGEX = /(.+?): (.+?)$/gm;

export function get_doc_meta(markdown: string): FileMeta | undefined {
	const meta_group = markdown.match(META_GROUP_REGEX);
	if (meta_group == null) {
		return undefined;
	}

	const meta = meta_group[0].matchAll(META_REGEX);

	const markdown_meta: FileMeta = { order: -1 };
	for (const match of meta) {
		const element = match[1];
		const data = match[2];

		switch (element) {
			case 'order':
				markdown_meta.order = Number(data);
				break;

			default:
				break;
		}
	}

	return markdown_meta;
}

export function parse_doc_markdown(markdown: string): [string, FileMeta | undefined] {
	const meta_group = markdown.match(META_GROUP_REGEX);
	if (meta_group == null) {
		return [markdown, undefined];
	}

	const doc_meta = get_doc_meta(markdown);
	markdown = markdown.replace(meta_group[0], '');

	return [markdown, doc_meta];
}

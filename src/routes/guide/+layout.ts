import type { FileMeta } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import type { File } from '$lib/types';

const META_GROUP_REGEX = /---\n([\s\S]+)\n---/gm;
const META_REGEX = /(.+?): (.+?)$/gm;

function get_meta(markdown: string): FileMeta | undefined {
    let meta_group = markdown.match(META_GROUP_REGEX)
    if (meta_group == null) {
        return undefined;
    }

    let meta = meta_group[0].matchAll(META_REGEX);

    let markdown_meta: FileMeta = { order: 999, show: true };
    for (const match of meta) {
        let element = match[1];
        let data = match[2];

        switch (element) {
            case "order":
                markdown_meta.order = Number(data);
                break;

            case "show":
                markdown_meta.show = Boolean(data);
                break;

            default:
                break;
        }
    }

    return markdown_meta;
}

function parse_markdown(markdown: string): [string, FileMeta | undefined] {
    let meta_group = markdown.match(META_GROUP_REGEX)
    if (meta_group == null) {
        return [markdown, undefined];
    }

    let markdown_meta = get_meta(markdown)
    markdown = markdown.replace(meta_group[0], "")

    return [markdown, markdown_meta];
}


export const load = (async ({ params, fetch }) => {

    const response = await fetch('/get-guides', {
        method: 'GET'
    });

    if (response.ok) {
        const parsed_json = (await response.json()) as File;
        return {
            docsPage: params.docsPage ? params.docsPage : [],
            sections: parsed_json.files
        };
    }

    throw error(404, "Not found")

}) satisfies LayoutLoad;



import { base } from '$app/paths';
import { parse_doc_markdown } from '$lib/doc';
import type { Item } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch, route }) => {

    const pathToFetch = `${base}/docs/guide/${params.docsPage}.md`

    console.log({ pathToFetch })

    const responseFile = await fetch(pathToFetch);
    const responseGuides = await fetch(`${base}/get-guides`, {
        method: 'GET'
    });

    if (responseFile.ok && responseGuides.ok) {
        const markdown = await responseFile.text();
        const [parsed_markdown, markdown_meta] = parse_doc_markdown(markdown);
        const items = (await responseGuides.json()) as Item[];
        return {
            docsPage: params.docsPage,
            markdown: parsed_markdown,
            markdownMeta: markdown_meta,
            items,
        };
    }

    console.log({ route })

    throw error(404, 'Not found');
}) satisfies PageLoad;

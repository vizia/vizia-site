import { base } from '$app/paths';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent, params, fetch }) => {

    const assertExists = (x: any) => { if (!x) { throw error(404, 'Not Found') } }

    const parentData = await parent()
    assertExists(parentData)

    const currentPage = parentData.flattenedItems.find(v => v.filePath.replace(".md", "") === `${base}/docs/guide/${params.docsPage}`);
    assertExists(currentPage)
    // @ts-ignore
    const responseFile = await fetch(currentPage.filePath)

    assertExists(responseFile)

    const markdown = await responseFile.text();
    assertExists(markdown)

    return {
        docsPage: params.docsPage,
        currentPage,
        markdown,
    }

}) satisfies PageLoad;
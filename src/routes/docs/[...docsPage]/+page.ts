
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, url, fetch }) => {

  const response = await fetch(`${url.origin}/src/lib/docs/${params.docsPage}.md`);
  if (response.ok) {
    return {
      docsPage: params.docsPage,
      markdown: await response.text()
    };
  }

  throw error(404, "Not found")

}) satisfies PageLoad;



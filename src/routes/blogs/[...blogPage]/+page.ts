import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch, parent }) => {
	const assertExists = (x: any) => { if (!x) { throw error(404, 'Not Found') } }

	const parentData = await parent()
	assertExists(parentData)

	const blogPost = parentData.posts.find(v => v.queryName === params.blogPage)
	if (!blogPost)
		throw error(404, 'Not found');

	const markdownReq = await fetch(`../docs/blogs/${blogPost.markdown}`)

	if (!markdownReq.ok)
		throw error(404, 'Not found');

	const markdown = await markdownReq.text()

	return {
		blogPost,
		markdown
	}

}) satisfies PageLoad;

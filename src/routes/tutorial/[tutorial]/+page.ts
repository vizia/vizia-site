import { base } from '$app/paths';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {

	const assertExists = (x: any) => { if (!x) { throw error(404, 'Not Found') } }

	const parentData = await parent();
	assertExists(parentData)

	throw redirect(301, `${base}/tutorial/${parentData.tutorial.directory.replace("docs/", "")}index`)

}) satisfies PageLoad;

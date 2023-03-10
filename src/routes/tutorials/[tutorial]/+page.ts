import { base } from '$app/paths';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {

	const parentData = await parent();

	if (parentData && parentData.tutorial) {
		throw redirect(301, `${base}/tutorials/${parentData.tutorial.dir}/index`)
	}

	error(404, "Not found")

}) satisfies PageLoad;

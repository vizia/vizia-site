import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { base } from '$app/paths';

export const load = (({ }) => {
	throw redirect(307, `${base}/guide/introduction`)
}) satisfies PageLoad;

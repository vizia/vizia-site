import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import type { File } from '$lib/types';
import { base } from '$app/paths';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`${base}/get-guides`, {
		method: 'GET'
	});

	if (response.ok) {
		const parsed_json = (await response.json()) as File;
		return {
			docsPage: params.docsPage ? params.docsPage : [],
			sections: parsed_json.files
		};
	}

	throw error(404, 'Not found');
}) satisfies LayoutLoad;

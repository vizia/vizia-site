import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import type { File, Tutorial } from '$lib/types';
import { base } from '$app/paths';


export const load = (async ({ params, fetch }) => {
	const response = await fetch(`${base}/get-tutorials`, {
		method: 'GET'
	});

	if (response.ok) {
		const parsed_json = (await response.json()) as Tutorial[];

		return {
			tutorialPage: params.tutorialPage ? params.tutorialPage : [],
			tutorials: parsed_json
		};
	}

	throw error(404, 'Not found');
}) satisfies LayoutLoad;

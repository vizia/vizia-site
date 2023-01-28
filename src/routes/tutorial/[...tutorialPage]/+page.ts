import { base } from '$app/paths';
import type { Tutorial } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {

	const response = await fetch(`${base}/get-tutorials`, {
		method: "GET",
	});

	if (response.ok) {
		const tutorials = JSON.parse(await response.text()) as Tutorial[];
		const tutorial = tutorials.find(t => {
			if (t.dir === params.tutorialPage) {
				return t
			}
		})

		if (!tutorial) {
			throw error(404, 'Not found');
		}

		return {
			tutorial: tutorial
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;

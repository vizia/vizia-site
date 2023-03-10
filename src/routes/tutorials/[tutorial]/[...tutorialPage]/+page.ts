import { base } from '$app/paths';
import { ALLOWED_CODE_EXTENSIONS, extensionFromName } from '$lib/tutorial';
import type { Item, Tutorial } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch, data, parent }) => {

	const parentData = await parent();

	if (parentData && parentData.tutorial) {

		let totalStepsFlattened = flattenSteps(parentData.tutorial.items);

		let step = totalStepsFlattened.find(v => {
			return v.queryName === params.tutorialPage
		})

		if (step) {

			const basePath = `${base}/tutorials/${parentData.tutorial.dir}/`
			const markdownPath = basePath + step.markdownFile;


			step.files.forEach(async file => {
				if (ALLOWED_CODE_EXTENSIONS.find((v) => v === extensionFromName(file.file)) !== undefined) {
					const codePath = basePath + file.file;
					file.fileData = (await fetch(codePath)).text()
				}

			})

			return {
				tutorial: parentData.tutorial,
				page: params.tutorialPage,
				totalStepsFlattened,
				step,
				markdown: (await fetch(markdownPath)).text()
			};
		}

	}

	throw error(404, 'Not found');
}) satisfies PageLoad;

function flattenSteps(steps: Item[]): Item[] {
	let flatten: Item[] = [];
	for (let step of steps) {
		flatten.push(step);

		if (step.items) {
			flatten = flatten.concat(flattenSteps(step.items));
		}
	}
	return flatten;
}
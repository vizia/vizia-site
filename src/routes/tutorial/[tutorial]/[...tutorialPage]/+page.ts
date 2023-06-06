import { ALLOWED_CODE_EXTENSIONS, extensionFromName, TutorialStep, type ITutorialStep } from '$lib/tutorial';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch, parent }) => {

	const assertExists = (x: any) => { if (!x) { throw error(404, 'Not Found') } }


	const parentData = await parent();
	assertExists(parentData)

	let step = parentData.tutorialSteps.map(v =>
		(new TutorialStep(v)).findStep(params.tutorialPage)
	).find(v => v !== undefined)
	if (!step)
		throw error(404, 'Not Found')

	step.files.forEach(async file => {
		if (ALLOWED_CODE_EXTENSIONS.find((v) => v === extensionFromName(file.file)) !== undefined) {
			const rep = await fetch("../../docs/tutorial/" + parentData.tutorial
				.directory + file.file);

			if (rep.ok) {
				const data = await rep.text()
				file.setFileData(data)
			}
		}

	})

	const markdown = (await fetch("../../docs/tutorial/" + parentData.tutorial.directory + step.markdownPath)).text()



	return {
		tutorial: parentData.tutorial,
		page: params.tutorialPage,
		step,
		markdown,
	};

}) satisfies PageLoad;
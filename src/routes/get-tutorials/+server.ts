import type { RequestHandler } from './$types';
import type { Tutorial } from '$lib/types';
import fs from 'fs';
import { json } from '@sveltejs/kit';

const base = "static/tutorials"


export const GET = (async () => {

	const tutorialDirs = fs.readdirSync(base)

	let tutorials = []

	for (const tutorial of tutorialDirs) {
		const indexFilePath = `${base}/${tutorial}/index.json`
		const tutorialIndex = JSON.parse(fs.readFileSync(indexFilePath).toString()) as Tutorial
		tutorialIndex.dir = tutorial;
		tutorials.push(tutorialIndex)
		for (const step of tutorialIndex.steps) {
			step.data = fs.readFileSync(`${base}/${tutorial}/${step.fileName}`).toString()
			step.codeData = fs.readFileSync(`${base}/${tutorial}/${step.codeFileName}`).toString()
		}
	}

	return json(tutorials);
}) satisfies RequestHandler;

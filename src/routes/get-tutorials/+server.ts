import type { RequestHandler } from './$types';
import type { HighlightUnprocessed, StepCodeHighlight, Tutorial, Item } from '$lib/types';
import fs from 'fs';
import { json } from '@sveltejs/kit';
import hljs from 'highlight.js';
import { getItems } from '$lib/search';
import path from "path"
import { parseHighlight } from '$lib/highlight';

const base = "static/tutorials"

export const GET = (async () => {

	let files = getItems("tutorials")

	let tutorials = []

	for (const tutorial of files) {

		let basePath = path.join(base, tutorial)

		let tut = JSON.parse(fs.readFileSync(path.join(basePath, "index.json")).toString()) as Tutorial
		tut.dir = tutorial;


		for (let step of tut.items) {
			step = updateStep(step, basePath);
		}

		tutorials.push(tut)
	}

	return json(tutorials);

}) satisfies RequestHandler;

function updateStep(step: Item, tutorial: string): Item {

	if (step.markdownFileName) {
		step.markdownData = fs.readFileSync(path.join(tutorial, step.markdownFileName)).toString()
	}

	if (step.codeFileName) {
		step.codeData = fs.readFileSync(path.join(tutorial, step.codeFileName)).toString()
	}

	if (step.items) {
		for (let subStep of step.items) {
			subStep = updateStep(subStep, tutorial)
		}
	}

	let highlights = []

	if (step.codeHighlight) {
		for (let hl of step.codeHighlight) {
			highlights.push(parseHighlight(step.codeData ?? "", hl))
		}
	}

	return step;
}

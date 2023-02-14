import type { RequestHandler } from './$types';
import type { HighlightUnprocessed, StepCodeHighlight, Tutorial, Item } from '$lib/types';
import fs from 'fs';
import { json } from '@sveltejs/kit';
import hljs from 'highlight.js';
import { getItems } from '$lib/search';
import path from "path"

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

function parseHighlight(codeData: string, highlight: HighlightUnprocessed): StepCodeHighlight[] {

	let highlights = []

	let lLen = -1;
	let lines = []

	switch (highlight.type) {
		case 'line':
			if (highlight.line == undefined) {
				console.error("Couldn't parse step of type 'line'");
				break;
			}

			lines = codeData.split('\n');

			if (!lines || lines.length == 0) {
				lLen = codeData.length
				highlights.push({
					start: 0,
					end: lLen,
					line: highlight.line,
					highlightType: highlight.highlightType
				})
			} else {
				lLen = lines[highlight.line].length
				highlights.push({
					start: 0,
					end: lLen,
					line: highlight.line,
					highlightType: highlight.highlightType
				})
			}

			break;
		case 'range':

			if (highlight.line == undefined || highlight.start == undefined || highlight.end == undefined) {
				console.error("Couldn't parse step of type 'range'");
				break;
			}

			highlights.push({
				start: highlight.start,
				end: highlight.end,
				line: highlight.line,
				highlightType: highlight.highlightType
			})

			break;
		case 'regex':

			if (highlight.regex == undefined) {
				console.error("Couldn't parse step of type 'range'");
				break;
			}

			lines = codeData.split('\n');
			for (let i = 0; i < lines.length; i++) {
				const l = lines[i];

				let match;
				const regex = new RegExp(highlight.regex, "g")
				while ((match = regex.exec(l)) != null) {
					highlights.push({
						line: i,
						highlightType: highlight.highlightType,
						start: match.index,
						end: match.index + match[0].length
					})
				}

			}

			break;
	}

	return highlights;
}

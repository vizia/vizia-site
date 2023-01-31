import type { RequestHandler } from './$types';
import type { StepCodeHighlight, Tutorial, TutorialStep, TutorialUnparsed } from '$lib/types';
import fs from 'fs';
import { json } from '@sveltejs/kit';
import hljs from 'highlight.js';

const base = "static/tutorials"


export const GET = (async () => {

	const tutorialDirs = fs.readdirSync(base)

	let tutorials: Tutorial[] = []

	for (const tutorial of tutorialDirs) {

		const indexFilePath = `${base}/${tutorial}/index.json`
		let unparsed = JSON.parse(fs.readFileSync(indexFilePath).toString()) as TutorialUnparsed
		unparsed.dir = tutorial;

		let parsed: Tutorial = {
			title: unparsed.title,
			dir: unparsed.dir,
			steps: []
		};

		for (const step of unparsed.steps) {

			const markdownData = fs.readFileSync(`${base}/${tutorial}/${step.fileName}`).toString()
			const codeData = fs.readFileSync(`${base}/${tutorial}/${step.codeFileName}`).toString()


			let sch: TutorialStep = {
				stepTitle: step.stepTitle,
				fileName: step.fileName,
				codeFileName: step.codeFileName,
				markdownData: markdownData,
				codeData: codeData,
				codeHighlight: []
			}

			if (!step.codeHighlight) {
				parsed.steps.push(sch)
				continue;
			}

			let stepHighlights: StepCodeHighlight[] = []

			for (const hl of step.codeHighlight) {
				let lLen = -1;
				let lines = []

				switch (hl.type) {
					case 'line':
						if (hl.line == undefined) {
							console.error("Couldn't parse step of type 'line'");
							break;
						}

						lines = codeData.split('\n');

						if (!lines || lines.length == 0) {
							lLen = codeData.length
							stepHighlights.push({
								start: 0,
								end: lLen,
								line: hl.line,
								highlightType: hl.highlightType
							})
						} else {
							lLen = lines[hl.line].length
							stepHighlights.push({
								start: 0,
								end: lLen,
								line: hl.line,
								highlightType: hl.highlightType
							})
						}

						break;
					case 'range':

						if (hl.line == undefined || hl.start == undefined || hl.end == undefined) {
							console.error("Couldn't parse step of type 'range'");
							break;
						}

						stepHighlights.push({
							start: hl.start,
							end: hl.end,
							line: hl.line,
							highlightType: hl.highlightType
						})

						break;
					case 'regex':

						if (hl.regex == undefined) {
							console.error("Couldn't parse step of type 'range'");
							break;
						}

						lines = codeData.split('\n');
						for (let i = 0; i < lines.length; i++) {
							const l = lines[i];

							let match;
							const regex = new RegExp(hl.regex, "g")
							while ((match = regex.exec(l)) != null) {
								stepHighlights.push({
									line: i,
									highlightType: hl.highlightType,
									start: match.index,
									end: match.index + match[0].length
								})
							}

						}

						break;
				}
			}

			sch.codeHighlight = stepHighlights

			parsed.steps.push(sch)
		}

		tutorials.push(parsed)
	}


	return json(tutorials);
}) satisfies RequestHandler;

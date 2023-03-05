import type { RequestHandler } from './$types';
import type { StepCodeHighlight, Tutorial, Item, UnparsedItem, UnparsedTutorial, UnparsedFileItem, FileItem } from '$lib/types';
import fs from 'fs';
import { json } from '@sveltejs/kit';
import hljs from 'highlight.js';
import { getItems } from '$lib/search';
import path from "path"
import { parseHighlight } from '$lib/highlight';

const base = "static/tutorials"

export const GET = (async () => {

	let files = getItems("tutorials")

	return json(files.map(v => {

		let basePath = path.join(base, v)

		let tut = JSON.parse(fs.readFileSync(path.join(basePath, "index.json")).toString()) as UnparsedTutorial
		tut.dir = v;

		return {
			title: tut.title,
			description: tut.description,
			dir: tut.dir,
			items: tut.items.map(vi => updateStep(vi, v))
		} as Tutorial;
	}));
}) satisfies RequestHandler;

function updateStep(item: UnparsedItem, tutorial: string): Item {

	function processFile(file: UnparsedFileItem): FileItem {

		let highlights: StepCodeHighlight[] = []

		let codeData = fs.readFileSync(path.join(base, tutorial, file.file)).toString()

		for (let hl of file.highlights ?? []) {
			highlights = highlights.concat(parseHighlight(codeData, hl))
		}

		return {
			file: file.file,
			fileData: codeData,
			highlights: highlights
		}
	}

	return {
		title: item.title,
		markdownFile: item.markdownFile,
		markdownFileData: fs.readFileSync(path.join(base, tutorial, item.markdownFile)).toString(),
		files: item.files ? item.files.map(v => processFile(v)) : [],
		items: item.items ? item.items.map(v => updateStep(v, tutorial)) : []
	};
}

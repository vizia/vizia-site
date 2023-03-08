import type { RequestHandler } from './$types';
import type { UnparsedTutorial } from '$lib/types';
import fs from 'fs';
import { json } from '@sveltejs/kit';
import { getItems } from '$lib/search';
import path from "path"

export const prerender = true;

const base = "static/tutorials"

export const GET = (async () => {

	let files = getItems("tutorials")

	return json(files.map(v => {

		let basePath = path.join(base, v)

		let tut = JSON.parse(fs.readFileSync(path.join(basePath, "index.json")).toString()) as UnparsedTutorial
		tut.dir = v;

		return tut;
	}));
}) satisfies RequestHandler;

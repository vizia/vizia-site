import type { RequestHandler } from './$types';
import type { FileMeta, File, Item } from '$lib/types';
import fs from 'fs';
import { json } from '@sveltejs/kit';

const base = 'static/docs/guide';

export const GET = (async () => {
    let guides = JSON.parse(fs.readFileSync(`${base}/index.json`).toString()) as Item[]

    return json(guides);
}) satisfies RequestHandler;

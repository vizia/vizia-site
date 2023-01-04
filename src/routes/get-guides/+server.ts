import type { RequestHandler } from './$types';
import type { FileMeta, File } from '$lib/types';
import fs from 'fs';
import { json } from '@sveltejs/kit';
import { parse_doc_markdown } from '$lib/doc';
import { base } from '$app/paths';

const DIRNAME_REGEX = /^\.?\/?(.+\/)*(.+)$/;
const FILENAME_REGEX = /^\.?\/?(.+\/)*(.+)\.(.+)$/;
const EXTENSION_REGEX = /\..+$/;

function recursive_search_dir(base_dir: string, base_link: string): File | null {
	const self: File = {
		file_name: 'base',
		path: base_dir,
		link: base_link,
		is_dir: true,
		files: []
	};

	if (fs.statSync(base_dir).isDirectory()) {
		// Directory

		const dirs = fs.readdirSync(base_dir);
		const files: File[] = [];

		const meta_file = `${base_dir}/meta.json`;
		self.meta = JSON.parse(fs.readFileSync(meta_file).toString()) as FileMeta;

		if (self.meta.show !== undefined && self.meta.show === false) {
			return null;
		}
		const filename_regex = base_dir.match(DIRNAME_REGEX);
		const file_name = filename_regex ? filename_regex[2] : '';

		self.file_name = file_name;

		if (dirs.length == 0) {
			return null;
		}

		for (let i = 0; i < dirs.length; i++) {
			let dir = dirs[i];
			const extension = dir.match(EXTENSION_REGEX);

			let next = null;
			if (extension) {
				dir = dir.replace(extension[0], '');
				next = recursive_search_dir(`${base_dir}/${dir}${extension}`, `${base_link}/${dir}`);
			} else {
				next = recursive_search_dir(`${base_dir}/${dir}`, `${base_link}/${dir}`);
			}

			if (next !== null) {
				files.push(next);
			}
		}

		self.files = files;
	} else {
		// File
		self.is_dir = false;

		const filename_regex = base_dir.match(FILENAME_REGEX);

		let file_name = filename_regex ? filename_regex[2] : '';
		const extension = filename_regex ? filename_regex[3] : '';
		if (extension != 'md') {
			return null;
		}

		file_name = file_name.trim().replaceAll('-', ' ');
		file_name = file_name.trim().replaceAll('_', ' ');
		file_name = file_name.charAt(0).toUpperCase() + file_name.substring(1);

		self.file_name = file_name;
		self.path = base_dir;
		self.link = base_link;

		const read = fs.readFileSync(base_dir).toString();
		const meta = parse_doc_markdown(read);
		self.meta = meta[1];
	}

	return self;
}

const base_dir = 'static/docs/guide';

export const GET = (async () => {
	const sections = recursive_search_dir(base_dir, `${base}/guide`);

	const sort_fn = (a: File, b: File) => {
		const a_order = a.meta ? a.meta.order : 500;
		const b_order = b.meta ? b.meta.order : 500;

		return a_order - b_order;
	};

	sections?.files.sort(sort_fn).forEach((section) => {
		section.files.sort(sort_fn);
	});

	return json(sections);
}) satisfies RequestHandler;

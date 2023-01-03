import type { RequestHandler } from "./$types";
import type { FileMeta, File } from '$lib/types';
import fs from 'fs';
import path from 'path'
import { json } from "@sveltejs/kit";


const META_GROUP_REGEX = /---\n([\s\S]+)\n---/gm;
const META_REGEX = /(.+?): (.+?)$/gm;

function parse_markdown(markdown: string): FileMeta {
    let meta_group = markdown.match(META_GROUP_REGEX)
    if (meta_group == null) {
        return { order: 999 };
    }

    let meta = meta_group[0].matchAll(META_REGEX);

    let markdown_meta: FileMeta = { order: -1 };
    for (const match of meta) {
        let element = match[1];
        let data = match[2];

        switch (element) {
            case "order":
                markdown_meta.order = Number(data);
                break;

            default:
                break;
        }
    }


    return markdown_meta;
}


const DIRNAME_REGEX = /^\.?\/?(.+\/)*(.+)$/
const FILENAME_REGEX = /^\.?\/?(.+\/)*(.+)\.(.+)$/
const EXTENSION_REGEX = /\..+$/

function recursive_search_dir(base_dir: string, base_link: string): File | null {

    let self: File = {
        file_name: "base",
        path: base_dir,
        link: base_link,
        is_dir: true,
        files: []
    }


    if (fs.statSync(base_dir).isDirectory()) {
        // Directory

        let dirs = fs.readdirSync(base_dir)
        let files: File[] = [];

        let meta_file = `${base_dir}/meta.json`
        self.meta = JSON.parse(fs.readFileSync(meta_file).toString()) as FileMeta


        if (self.meta.show !== undefined && self.meta.show === false) {
            return null
        }
        let filename_regex = base_dir.match(DIRNAME_REGEX)
        let file_name = filename_regex ? filename_regex[2] : ""

        self.file_name = file_name;

        if (dirs.length == 0) {
            return null
        }

        for (let i = 0; i < dirs.length; i++) {
            let dir = dirs[i];
            let extension = dir.match(EXTENSION_REGEX)

            let next = null
            if (extension) {
                dir = dir.replace(extension[0], "")
                next = recursive_search_dir(`${base_dir}/${dir}${extension}`, `${base_link}/${dir}`)
            } else {
                next = recursive_search_dir(`${base_dir}/${dir}`, `${base_link}/${dir}`)
            }

            if (next !== null) {
                files.push(next)

            }

        }

        self.files = files

    } else {
        // File
        self.is_dir = false;

        let filename_regex = base_dir.match(FILENAME_REGEX)

        let file_name = filename_regex ? filename_regex[2] : ""
        let extension = filename_regex ? filename_regex[3] : ""
        if (extension != "md") {
            return null
        }

        file_name = file_name.trim().replaceAll("-", " ");
        file_name = file_name.trim().replaceAll("_", " ");
        file_name = file_name.charAt(0).toUpperCase() + file_name.substring(1);

        self.file_name = file_name
        self.path = base_dir
        self.link = base_link


        let read = fs.readFileSync(base_dir).toString();
        let meta = parse_markdown(read);
        self.meta = meta

    }

    return self

}

const base = path.resolve("", "static/docs/guide")


export const GET = (async () => {
    const sections = recursive_search_dir(base, "/guide")


    let sort_fn = (a: File, b: File) => {
        let a_order = a.meta ? a.meta.order : 500;
        let b_order = b.meta ? b.meta.order : 500;

        return a_order - b_order
    }

    sections?.files.sort(sort_fn).forEach(section => {
        section.files.sort(sort_fn)
    });


    return json(sections)

}) satisfies RequestHandler
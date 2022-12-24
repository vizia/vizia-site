import fs from 'fs';
import path from 'path'
import type { LayoutServerLoad } from './$types';

export const prerender = true;

interface MarkdownMeta {
    order: number
}

const META_GROUP_REGEX = /---\n([\s\S]+)\n---/gm;
const META_REGEX = /(.+?): (.+?)$/gm;

export function parse_markdown(markdown: string): [string, MarkdownMeta] {
    let meta_group = markdown.match(META_GROUP_REGEX)
    if (meta_group == null) {
        return ["", { order: -1 }];
    }

    let meta = meta_group[0].matchAll(META_REGEX);

    let markdown_meta: MarkdownMeta = { order: -1 };
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

    markdown = markdown.replace(meta_group[0], "")

    return [markdown, markdown_meta];
}

const base = path.resolve("", "src/lib/guide")

export interface File {
    file_name: string,
    path: string,
    link: string,
    is_dir: boolean,
    meta?: MarkdownMeta,
    files: File[],
}

const DIRNAME_REGEX = /^\.?\/?(.+\/)*(.+)$/
const FILENAME_REGEX = /^\.?\/?(.+\/)*(.+)\.(.+)$/
const EXTENSION_REGEX = /\..+$/

export function recursive_search_dir(base_dir: string, base_link: string): File {

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

        let filename_regex = base_dir.match(DIRNAME_REGEX)
        let file_name = filename_regex ? filename_regex[2] : ""

        self.file_name = file_name;

        for (let i = 0; i < dirs.length; i++) {
            let dir = dirs[i];
            let extension = dir.match(EXTENSION_REGEX)
            if (extension) {
                dir = dir.replace(extension[0], "")
                files.push(recursive_search_dir(`${base_dir}/${dir}${extension}`, `${base_link}/${dir}`))
            } else {
                files.push(recursive_search_dir(`${base_dir}/${dir}`, `${base_link}/${dir}`))
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
        }

        file_name = file_name.trim().replaceAll("-", " ");
        file_name = file_name.trim().replaceAll("_", " ");
        file_name = file_name.charAt(0).toUpperCase() + file_name.substring(1);

        self.file_name = file_name
        self.path = base_dir
        self.link = base_link


        let read = fs.readFileSync(base_dir).toString();
        let meta = parse_markdown(read)[1];
        self.meta = meta

    }

    return self

}

export const load = ((url) => {

    const sections = recursive_search_dir(base, "/guide")

    sections.files.forEach(section => {
        section.files.sort((a, b) => {
            let a_order = a.meta ? a.meta.order : 500;
            let b_order = b.meta ? b.meta.order : 500;

            return a_order - b_order
        })


    });


    return {
        params: url.params,
        sections: sections.files
    };
}) satisfies LayoutServerLoad
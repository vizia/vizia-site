import fs from 'fs';
import path from 'path'
import type { LayoutServerLoad } from './$types';

export const prerender = true;

const base = path.resolve("", "src/lib/docs");

export interface Path {
    name: string
    link: string,
    val: string,
    is_dir: boolean,
    files: Path[]
}

export function recursive_search_dir(dir?: string, name?: string): Path {
    if (dir && name) {

        let dirs = fs.readdirSync(dir)
        let files = [];
        for (let i = 0; i < dirs.length; i++) {
            let new_dir = `${dir}/${dirs[i]}`
            if (fs.statSync(new_dir).isDirectory()) {
                files.push(recursive_search_dir(new_dir, dirs[i]))
            } else {
                let file_name = dirs[i].split(".")[0];
                let link = file_name;
                file_name = file_name.trim().replaceAll("-", " ");
                file_name = file_name.charAt(0).toUpperCase() + file_name.substring(1);
                files.push({ name: file_name, link: link, val: new_dir, is_dir: false, files: [] })
            }
        }
        return {
            name: name,
            link: "",
            is_dir: true,
            val: dir,
            files: files
        }

    } else {
        let base_path: Path = {
            name: "",
            link: "",
            is_dir: true,
            val: base,
            files: []
        };
        let dirs = fs.readdirSync(base)
        for (let i = 0; i < dirs.length; i++) {
            let new_dir = `${base}/${dirs[i]}`
            if (fs.statSync(new_dir).isDirectory()) {
                base_path.files.push(recursive_search_dir(new_dir, dirs[i]))
            } else {
                base_path.files.push({ name: dirs[i], link: "", is_dir: false, val: new_dir, files: [] })
            }
        }

        return base_path;
    }
}

export const load = ((url) => {
    const sections = recursive_search_dir()

    return {
        params: url.params,
        sections: sections.files
    };
}) satisfies LayoutServerLoad
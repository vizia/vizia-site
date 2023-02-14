import fs from 'fs';
import path from "path"

export type DirSearch = "blogs" | "docs/guide" | "tutorials";

const FILE_REGEX = /^(?<rPath>(\/)|(\.\/)(\w+?\/)*)(?<fileName>\w+?)\.(?<fileExtension>\w+?)$/;

export interface File {
    name: string;
    rPath: string;
    children: File[]
}

export function getItems(rootDirectory: DirSearch): string[] {
    let baseDirectory = `static/${rootDirectory}`

    let indexes: string[] = []
    const items = fs.readdirSync(baseDirectory);

    for (const item of items) {
        indexes.push(item)
    }

    return indexes;
}

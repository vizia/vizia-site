import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { Item, parseFromIndex, type IndexItem } from "$lib/parser";
import { base } from "$app/paths";

const GUIDES_INDEX_FILE = base + "/docs/guide/index.json"

export const load = (async ({ fetch }) => {

    const guides = await fetch(GUIDES_INDEX_FILE)

    if (!guides.ok) {
        throw error(404, 'Not found')
    }

    const indexItems = (await guides.json()) as IndexItem[];
    const items = parseFromIndex(indexItems, 'guide')

    return {
        items: items.map(v => v.toJSON()),
        flattenedItems: Item.flatten(items).map(v => v.toJSON())
    }

}) satisfies LayoutServerLoad
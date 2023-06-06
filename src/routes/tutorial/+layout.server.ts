import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { base } from "$app/paths";
import type { ITutorial } from "$lib/tutorial";

const TUTORIALS_INDEX_FILE = base + "/docs/tutorial/index.json"

export const load = (async ({ fetch }) => {

    const tutorial = await fetch(TUTORIALS_INDEX_FILE)

    if (!tutorial.ok) {
        throw error(404, 'Not found')
    }

    const tutorials = (await tutorial.json()) as ITutorial[];

    return {
        tutorials,
    }

}) satisfies LayoutServerLoad


import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ params, parent }) => {

    const parentData = await parent();

    if (parentData) {
        const tutorial = parentData.tutorials.find(t => {
            if (t.dir === params.tutorial) {
                return t
            }
        })

        return {
            tutorial
        }
    }

    error(404, 'Not found')

}) satisfies LayoutServerLoad
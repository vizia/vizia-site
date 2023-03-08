import { base } from "$app/paths";
import type { Tutorial } from "$lib/types";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ fetch, params }) => {

    const response = await fetch(`${base}/get-tutorials`, {
        method: "GET",
    });

    const tutorials = JSON.parse(await response.text()) as Tutorial[];

    return {
        tutorials
    }

}) satisfies LayoutServerLoad
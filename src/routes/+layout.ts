export const prerender = true;

import type { LayoutLoad } from './$types';

export const load = (async ({ route }) => {
    return {
        route
    }
}) satisfies LayoutLoad;

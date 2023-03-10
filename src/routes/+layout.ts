import type { LayoutLoad } from './$types'

export const prerender = true

export const load = (async ({ route, url }) => {
    console.log(`${route.id} . ${url}`)
}) satisfies LayoutLoad;
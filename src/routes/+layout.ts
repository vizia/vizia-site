import type { LayoutLoad } from './$types'

export const prerender = true

export const load = (async ({ route, url }) => {
    console.log(`${route} . ${url}`)
}) satisfies LayoutLoad;
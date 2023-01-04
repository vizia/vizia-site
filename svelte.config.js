import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static'; // https://github.com/sveltejs/kit/tree/master/packages/adapter-static

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			paths: {
				base: '/vizia-site'
			},
			assets: 'build',
			fallback: null,
			precompress: false,
			strict: true,
			appDir: 'internal'
		})
	}
};

export default config;

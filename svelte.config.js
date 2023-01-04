import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static'; // https://github.com/sveltejs/kit/tree/master/packages/adapter-static

const dev = process.argv.includes('dev')
const prod = process.argv.includes('prod')
const webview = process.env.WEBVIEW

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			paths: {
				// base: dev ? '/' : '/vizia-site'
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

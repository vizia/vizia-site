<script lang="ts">
	import type { PageData } from './$types';
	import SvelteMarkdown from 'svelte-markdown';
	import hljs from 'highlight.js';
	import rust from 'highlight.js/lib/languages/rust';
	hljs.registerLanguage('rust', rust);
	import './md_style.scss';

	export let data: PageData;

	const CODE_REGEX = /(\`\`\`)(?<lang>[a-z]*)\n(?<code>[\s\S]+?)\n(\`\`\`)/gm;
	const CODE_TO_SNIPPET_REGEX =
		'<pre class="$2">\n<code class="language-$2">~~code_snippet~~</code>\n</pre>';

	function parse_markdown(markdown: string): string {
		for (let code of markdown.matchAll(CODE_REGEX)) {
			let language = code[2] ? code[2] : 'none';
			let code_str = code[3];
			markdown = markdown.replaceAll(CODE_REGEX, CODE_TO_SNIPPET_REGEX);
			if (language != 'none') {
				let code_highlighted = hljs.highlight(code_str, {
					language: language,
					ignoreIllegals: true
				}).value;
				markdown = markdown.replace('~~code_snippet~~', code_highlighted);
			} else {
				markdown = markdown.replace('~~code_snippet~~', code_str);
			}
		}

		return markdown;
	}
</script>

<SvelteMarkdown source={parse_markdown(data.markdown)} />

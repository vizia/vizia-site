<script lang="ts">
	import '../md_style.scss';
	import hljs from 'highlight.js';
	import rust from 'highlight.js/lib/languages/rust';
	hljs.registerLanguage('rust', rust);

	export let lang: string = 'none';
	export let text: string;
	export let attrs: Map<string, string> = new Map();

	find_meta(text);

	text.trim();

	if (lang !== '' && lang !== 'none') {
		text = hljs.highlight(text, {
			language: lang,
			ignoreIllegals: true
		}).value;
	}

	function find_meta(code: string) {
		const lines = code.split('\n');

		for (let line of lines) {
			if (!line.startsWith('$//')) {
				break;
			}

			text = text.replace(line + '\n', '');

			line = line.replace('$// ', '');
			const [attr_name, attr_val] = line.split(': ');

			attrs.set(attr_name, attr_val);
		}
	}
</script>

{#if attrs.has('file')}
	<div class="codeblock">
		<div class="header">
			<p>{attrs.get('file')}</p>
		</div>
		<pre class={lang}><code class={'language-' + lang}>{@html text}</code></pre>
	</div>
{:else}
	<div class="codeblock">
		<pre class={lang}><code class={'language-' + lang}>{@html text}</code></pre>
	</div>
{/if}

<style lang="scss">
	.codeblock {
		border-radius: 0.5rem;
		padding: 1rem;
		overflow: hidden;
		overflow-x: scroll;
		overflow-y: visible;
		flex-shrink: 0;
		background-color: var(--c-2);
		border: 1px solid var(--c-0);

		.header {
			padding: 0.25rem 1rem;
			margin-bottom: 2px;
			p {
				color: #888;
			}
		}

		pre {
			border-radius: 0;
		}
	}

	code {
		font-family: Fira Code;
		vertical-align: bottom;
	}
</style>

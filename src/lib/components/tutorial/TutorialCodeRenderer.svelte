<script lang="ts">
	import '$lib/components/md_style.scss';
	import type { StepHighlight } from '$lib/tutorial';
	import hljs from 'highlight.js';
	import rust from 'highlight.js/lib/languages/rust';

	hljs.registerLanguage('rust', rust);

	export let lang: string;
	export let text: string;
	export let highlights: StepHighlight[] = [];
	export let disabledHighlights: StepHighlight[] = [];

	let textHightlighted = '';

	$: {
		text.trim();

		if (lang !== '' && lang !== 'none') {
			textHightlighted = hljs.highlight(text, {
				language: lang,
				ignoreIllegals: true
			}).value;
		}
	}
</script>

<div class="codeblock">
	{#if lang}
		<pre class={lang}><code class={'language-' + lang}>{@html textHightlighted}</code></pre>
	{:else}
		<pre class={lang}><code class={'none'}>{@html text}</code></pre>
	{/if}
	{#if highlights && highlights.length != 0}
		{#each highlights as { start, highlightType, end, line }}
			<div
				class={highlightType}
				style="--left: {start()}; --width: {end() -
					start()}; --line(): {line()}; --end(): {end()}; --start(): {start()}"
			/>
		{/each}
		{#each disabledHighlights as { start, end, line }}
			<div
				class="disabled"
				style="--left: {start()}; --width: {end() - start()}; --line(): {line()};"
			/>
		{/each}
	{/if}
</div>

<style lang="scss">
	.codeblock {
		position: relative;

		div {
			--height-padding: 4px;
			position: absolute;
			height: calc(1.5rem - var(--height-padding));
			left: calc(var(--left) * 0.5em * 1.2);
			width: calc(var(--width) * 0.5em * 1.2);
			top: calc(var(--line) * 1.5rem + var(--height-padding) * 0.5);
			border-radius: 0.25rem;
			pointer-events: none;
		}

		code {
			word-spacing: 0;
		}

		.basic {
			border: 1px solid #ffffff44;
			z-index: 2;
		}

		.error {
			background-color: #ff000044;
			z-index: 2;
		}

		.disabled {
			background-color: var(--c-2);
			opacity: 0.5;
			z-index: 0;
		}
	}
</style>

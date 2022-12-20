<script lang="ts">
	import './md_style.scss';
	import hljs from 'highlight.js';
	import rust from 'highlight.js/lib/languages/rust';
	hljs.registerLanguage('rust', rust);

	export let lang: string;
	export let text: string;

	if (lang != 'none') {
		text = hljs.highlight(text, {
			language: lang,
			ignoreIllegals: true
		}).value;
	}
</script>

<pre class={lang}><code class={'language-' + lang}>{@html text}</code></pre>

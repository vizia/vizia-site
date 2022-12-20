<script lang="ts">
	import type { PageData } from './$types';
	import CodeSnippetRenderer from '$lib/CodeSnippetRenderer.svelte';
	import SvelteMarkdown from 'svelte-markdown';

	export let data: PageData;
</script>

<SvelteMarkdown source={data.markdown} renderers={{ code: CodeSnippetRenderer }} />

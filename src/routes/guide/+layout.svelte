<script lang="ts">
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { base } from '$app/paths';

	export let data: LayoutData;

	let sections = data.sections ? data.sections : [];

	onMount(async () => {
		await document.fonts.ready;
	});
</script>

<nav class="table-of-contents">
	{#each sections as section}
		{#if section.is_dir}
			<h2>{section.file_name}</h2>
			<ol>
				{#each section.files as { file_name, link }}
					<li>
						<a href="{base}{link}" class={`${base}/guide/${data.docsPage}` == link ? 'active' : ''}>
							{file_name}
						</a>
					</li>
				{/each}
			</ol>
		{/if}
	{/each}
</nav>

<slot />

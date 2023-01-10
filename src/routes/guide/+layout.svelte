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

<style lang="scss">
	.table-of-contents {
		position: fixed;
		width: var(--sidebar-width);
		height: calc(100% - var(--header-size));
		padding: 4rem 8rem;
		padding-top: 0;
		background-color: #161616;
		overflow-x: hidden;
		overflow-y: auto;

		h2 {
			font-size: 1rem;
			font-weight: 600;
			text-transform: uppercase;
			color: #aaa;
			letter-spacing: 0.1em;

			margin-top: 3rem;
		}

		ol {
			gap: 0;
			li {
				display: flex;
				a {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>

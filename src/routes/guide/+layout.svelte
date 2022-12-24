<script lang="ts">
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const sections = data.sections;

	onMount(async () => {
		await document.fonts.ready;
	});
</script>

<nav class="table-of-contents">
	{#each sections as section}
		{#if section.is_dir}
			<h2>{section.file_name}</h2>
			<ol>
				{#each section.files as { file_name, path, link }}
					<li>
						<a href={link} class={data.params && data.params.docsPage == link ? 'active' : ''}>
							{file_name}
						</a>
					</li>
				{/each}
			</ol>
			<div class="space" />
		{/if}
	{/each}
</nav>

<slot />

<style lang="scss">
	.table-of-contents {
		position: fixed;
		width: 20rem;
		height: 100%;
		padding-left: 8rem;
		padding-top: 4rem;
		background-color: #161616;
		overflow-x: hidden;
		overflow-y: auto;

		h2 {
			font-size: 1rem;
			font-weight: 600;
			text-transform: uppercase;
			color: #aaa;
			letter-spacing: 0.1em;
		}

		ol {
			margin: 0;
			margin-top: 0.5rem;
			gap: 0.25rem;
			display: flex;
			flex-direction: column;
		}

		li {
			display: block;
			a {
				color: #888;

				&:hover {
					color: #51afefcc;
				}

				&.active {
					color: #51afef;
				}

				&.active:hover {
					color: #51afef;
				}
			}
		}

		.space {
			width: 100%;
			height: 3rem;
		}
	}
</style>

<script lang="ts">
	import type { LayoutData } from './$types';
	import type { Path } from './+layout.server';

	export let data: LayoutData;

	const sections = data.sections as Path[];
</script>

<div class="table-of-contents">
	{#each sections as section}
		{#if section.is_dir}
			<h2>{section.name}</h2>
			<ul>
				{#each section.files as { name, link }}
					<li>
						<a
							href={`/${section.name}/${link}`}
							class={data.params && data.params.docsPage == `${section.name}/${link}`
								? 'active'
								: ''}
							>{name}
						</a>
					</li>
				{/each}
			</ul>
			<div class="space" />
		{/if}
	{/each}
</div>

<div class="docs-content">
	<slot />
</div>

<div class="on-this-page" />

<style lang="scss">
	.table-of-contents {
		width: 20rem;
		padding-left: 8rem;
		padding-top: 4rem;
		background-color: #161616;

		h2 {
			font-size: 1rem;
			font-weight: 600;
			text-transform: uppercase;
			color: #aaa;
			letter-spacing: 0.1em;
		}

		ul {
			margin: 0;
			margin-top: 0.5rem;
			gap: 0.25rem;
			display: flex;
			flex-direction: column;
		}

		li {
			display: block;
		}

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

		.space {
			width: 100%;
			height: 3rem;
		}
	}

	.docs-content {
		width: calc(100% - 40rem);
		background-color: #1d1d1d;
		padding: 4rem;

		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.on-this-page {
		width: 20rem;
		padding-right: 8rem;
		padding-top: 4rem;
	}
</style>

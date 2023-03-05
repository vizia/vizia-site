<script lang="ts">
	import type { Item } from '$lib/types';

	export let item: Item;
	export let level = 0;
	export let open = true;

	export let onClick = (item: Item) => {};
	export let matcher = (item: Item) => false;

	$: active = matcher(item);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="dropdown-header {open ? 'open' : ''} {active ? 'active' : ''}"
	on:click={() => {
		console.log({ onClick });
		onClick(item);
	}}
>
	<p>
		{item.title}
	</p>
</div>

{#if open && item.items.length !== 0}
	<div class="dropdown">
		<div class="line" />
		<div class="dropdown-wrapper">
			{#each item.items as i}
				<svelte:self item={i} {onClick} {matcher} level={level + 1} />
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	.dropdown {
		position: relative;
		width: calc(100% - 0.5rem);
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		margin-left: 0.5rem;
		pointer-events: none;
	}

	.line {
		width: 2px;
		border-radius: 1px;
		background-color: var(--c-2);
		justify-self: stretch;
	}

	.dropdown-wrapper {
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		pointer-events: none;
	}

	.dropdown-header {
		width: 100%;
		height: 1.5rem;

		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 0.25rem;
		pointer-events: all;

		cursor: pointer;

		* {
			cursor: pointer;
			pointer-events: none;
		}

		p {
			padding-left: 0.5rem;
			flex: 1;
			color: #aaa;
		}

		&.active {
			background-color: var(--c-2);

			p {
				color: var(--accent);
			}
		}
	}

	p {
		flex: 1;
		color: #aaa;
		user-select: none;
		padding: 0 0.5rem;
	}

	p:hover {
		color: #fff;
	}

	.dropdown-header:hover {
		background-color: var(--c-2);
	}
</style>

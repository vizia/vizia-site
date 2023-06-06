<script lang="ts">
	import { base } from '$app/paths';
	import type { ITutorial, ITutorialStep } from '$lib/tutorial';

	export let tutorial: ITutorial;
	export let step: ITutorialStep;
	export let level = 0;
	export let open = true;

	export let matcher = (item: ITutorialStep) => false;

	$: active = matcher(step);
</script>

<a
	class="dropdown-header {open ? 'open' : ''} {active ? 'active' : ''}"
	href="{base}/tutorial/{tutorial.directory}/{step.queryName}"
>
	{step.title}
</a>

{#if open && step.steps && step.steps.length !== 0}
	<div class="dropdown">
		<div class="line" />
		<div class="dropdown-wrapper">
			{#each step.steps as i}
				<svelte:self item={i} {tutorial} {matcher} level={level + 1} />
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
		color: #aaa;
		padding-left: 0.5rem;

		cursor: pointer;

		&.active {
			background-color: var(--c-2);
			color: var(--accent);
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

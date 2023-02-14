<script lang="ts">
	import Dropdown from '$lib/components/Dropdown.svelte';
	import CodeRenderer from '$lib/components/renderers/CodeRenderer.svelte';
	import ImageRenderer from '$lib/components/renderers/ImageRenderer.svelte';
	import LinkRenderer from '$lib/components/renderers/LinkRenderer.svelte';
	import TableCellRenderer from '$lib/components/renderers/TableCellRenderer.svelte';
	import TutorialCodeRenderer from '$lib/components/renderers/TutorialCodeRenderer.svelte';
	import { parseHighlight } from '$lib/highlight';
	import type { DropdownItem, Item, StepCodeHighlight } from '$lib/types';
	import { onMount } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import type { PageData } from './$types';

	export let data: PageData;

	let currentStep: number[] = [1];
	let currentStepDetails: Item | null = null;
	let dropdownItems: DropdownItem[] = [];
	let processedCodeHighlight: StepCodeHighlight[] = [];

	onMount(() => {
		selectStep([1]);

		processDropdownItems();
	});

	function selectStep(step: number[]) {
		currentStep = step;

		if (step.length > 0) {
			let stepSearch = data.tutorial.items;

			for (const s of step.slice(0, step.length - 1)) {
				stepSearch = stepSearch[s - 1].items;
			}

			currentStepDetails = stepSearch[step[step.length - 1] - 1];
		} else {
			currentStepDetails = data.tutorial.items[0];
		}

		processedCodeHighlight =
			currentStepDetails.codeHighlight
				?.map((v) => parseHighlight(currentStepDetails?.codeData ?? '', v))
				.flat() ?? [];
	}

	function processDropdownItems() {
		dropdownItems = [];

		for (const step of data.tutorial.items) {
			dropdownItems.push(processDropdownItem(step));
		}
	}

	function processDropdownItem(step: Item): DropdownItem {
		let item: DropdownItem = { name: step.title ?? data.tutorial.title, items: [] };

		if (step.items) {
			for (const subStep of step.items) {
				item.items.push(processDropdownItem(subStep));
			}
		}

		return item;
	}
</script>

<nav class="table-of-contents">
	{#each dropdownItems as item, i}
		<Dropdown
			items={item.items}
			header={item.name}
			enumerate={true}
			indexStack={[i + 1]}
			onClick={(i) => {
				selectStep(i);
			}}
			matcher={(i, h, l) => {
				return i.toString() === currentStep.toString();
			}}
		/>
	{/each}
</nav>

<div class="tutorial-code">
	{#if currentStepDetails}
		<TutorialCodeRenderer
			lang="rust"
			text={currentStepDetails.codeData ?? ''}
			highlight={processedCodeHighlight}
		/>
	{/if}
</div>

<div class="tutorial-content">
	{#if currentStepDetails}
		{#if currentStepDetails.title}
			<h2 class="title">{currentStepDetails.title}</h2>
		{:else}
			<h2 class="title">{data.tutorial.title}</h2>
		{/if}
		<SvelteMarkdown
			source={currentStepDetails.markdownData}
			renderers={{
				code: CodeRenderer,
				tablecell: TableCellRenderer,
				image: ImageRenderer,
				link: LinkRenderer
			}}
		/>
	{/if}
</div>

<style lang="scss">
	.tutorial-content {
		position: relative;
		background-color: var(--background-secondary);
		width: calc(var(--sidebar-width) * 1.5);
		padding: 4rem;

		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;

		overflow-x: hidden;
		overflow-y: auto;
	}

	.tutorial-code {
		background-color: var(--background-main);
		flex: 1;
		padding: 2rem 4rem;
		padding-top: 5rem;

		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
		margin-left: var(--sidebar-width);

		overflow-x: hidden;
		overflow-y: auto;
	}

	li {
		cursor: pointer;

		p {
			pointer-events: none;
		}

		&.active {
			p {
				color: #51afef;
			}
		}
	}
</style>

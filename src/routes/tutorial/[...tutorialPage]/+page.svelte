<script lang="ts">
	import CodeRenderer from '$lib/components/renderers/CodeRenderer.svelte';
	import ImageRenderer from '$lib/components/renderers/ImageRenderer.svelte';
	import LinkRenderer from '$lib/components/renderers/LinkRenderer.svelte';
	import TableCellRenderer from '$lib/components/renderers/TableCellRenderer.svelte';
	import TutorialCodeRenderer from '$lib/components/TutorialCodeRenderer.svelte';
	import type { TutorialStep } from '$lib/types';
	import { onMount } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import type { PageData } from './$types';

	export let data: PageData;

	let stepsLength = data.tutorial.steps.length;
	let currentStep = 0;
	let currentStepDetails: TutorialStep | null = null;

	onMount(() => {
		selectStep(0);
	});

	function selectStep(step: number) {
		if (step < 0 || step >= stepsLength) {
			return;
		}

		currentStep = step;

		currentStepDetails = data.tutorial.steps[currentStep];
	}
</script>

<nav class="table-of-contents">
	<h2>{data.tutorial.title}</h2>
	<ol>
		{#each data.tutorial.steps as step, i}
			{#if step.stepTitle}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<li on:click={() => selectStep(i)} class={currentStep == i ? 'active' : ''}>
					<p>{step.stepTitle}</p>
				</li>
			{/if}
		{/each}
	</ol>
</nav>

<div class="tutorial-code">
	{#if currentStepDetails}
		<TutorialCodeRenderer
			lang="rust"
			text={currentStepDetails.codeData}
			highlight={currentStepDetails.codeHighlight}
		/>
	{/if}
</div>

<div class="tutorial-content">
	{#if currentStepDetails}
		{#if currentStepDetails.stepTitle}
			<h2 class="title">{currentStepDetails.stepTitle}</h2>
		{:else}
			<h2 class="title">{data.tutorial.title}</h2>
		{/if}
		<SvelteMarkdown
			source={currentStepDetails.data}
			renderers={{
				code: CodeRenderer,
				tablecell: TableCellRenderer,
				image: ImageRenderer,
				link: LinkRenderer
			}}
		/>
	{/if}
	<div class="step-wrapper">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="button {currentStep != 0 ? '' : 'hidden'}"
			on:click={() => selectStep(currentStep - 1)}
		>
			<p>Previous</p>
		</div>

		<p>{currentStep + 1} / {stepsLength}</p>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="button accent {currentStep != stepsLength - 1 ? '' : 'hidden'}"
			on:click={() => selectStep(currentStep + 1)}
		>
			<p>Next</p>
		</div>
	</div>
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

		.step-wrapper {
			position: absolute;
			left: 0;
			top: calc(100% - 4rem);
			height: 4rem;
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 0 4rem;
			justify-content: space-between;

			.button {
				border-radius: 0.5rem;
				border-width: 0;
				height: fit-content;
				padding: 0;
				background-color: var(--background-tertiary);
				cursor: pointer;

				&:hover {
					background-color: var(--background-quaternary);
				}

				* {
					pointer-events: none;
					user-select: none;
					padding: 0.5rem 1rem;
				}

				&.hidden {
					background-color: transparent !important;
					pointer-events: none !important;
					* {
						color: transparent !important;
					}
				}
			}

			.button.accent {
				background-color: var(--accent);

				&:hover {
					background-color: var(--accent-light);
				}

				* {
					color: #fff;
				}
			}
		}
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

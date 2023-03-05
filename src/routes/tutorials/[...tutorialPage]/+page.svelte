<script lang="ts">
	import { base } from '$app/paths';
	import CodeRenderer from '$lib/components/renderers/CodeRenderer.svelte';
	import ImageRenderer from '$lib/components/renderers/ImageRenderer.svelte';
	import LinkRenderer from '$lib/components/renderers/LinkRenderer.svelte';
	import TableCellRenderer from '$lib/components/renderers/TableCellRenderer.svelte';
	import TutorialCodeRenderer from '$lib/components/renderers/TutorialCodeRenderer.svelte';

	import Svg from '$lib/components/Svg.svelte';
	import { SvgIcon } from '$lib/svg';
	import { ALLOWED_CODE_EXTENSIONS } from '$lib/tutorial';
	import type { DropdownItem, FileItem, Item } from '$lib/types';
	import { onMount } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import type { PageData } from './$types';

	export let data: PageData;

	let loaded = false;

	let flattenedSteps: Item[] = [];
	let currentStep: number = 0;
	let currentStepDetails: Item;
	let dropdownItems: DropdownItem[] = [];

	$: fileHeaders = currentStepDetails ? currentStepDetails.files : [];
	let selectedFile: FileItem;

	const FILE_EXTENSION_REGEX = /.+?\.([a-z]+)$/;
	$: selectedFileExtension = selectedFile ? FILE_EXTENSION_REGEX.exec(selectedFile.file)?.[1] : '';

	onMount(() => {
		flattenedSteps = flattenTutorialSteps(data.tutorial.items);
		selectStep(0);
		processDropdownItems();
		loaded = true;
	});

	function previousStep() {
		if (currentStep > 0) {
			currentStep -= 1;
			selectStep(currentStep);
		}
	}

	function nextStep() {
		console.log({ currentStep });
		if (currentStep < flattenedSteps.length - 1) {
			currentStep += 1;
			selectStep(currentStep);
		}
		console.log({ currentStep });
	}

	function flattenTutorialSteps(steps: Item[]): Item[] {
		let flatten: Item[] = [];
		for (let step of steps) {
			flatten.push(step);

			if (step.items) {
				flatten = flatten.concat(flattenTutorialSteps(step.items));
			}
		}
		return flatten;
	}

	function selectStep(step: number) {
		currentStep = step;

		currentStepDetails = flattenedSteps[step];

		selectedFile = currentStepDetails.files[0];
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

	function isFileCode(filename: string): boolean {
		return ALLOWED_CODE_EXTENSIONS.find((v) => v === selectedFileExtension) !== undefined;
	}
</script>

<div class="tutorial-wrapper">
	<div class="tutorial-code-wrapper">
		<div class="file-headers">
			{#each fileHeaders as header}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="file-header"
					class:active={selectedFile.file == header.file}
					on:click={() => (selectedFile = header)}
				>
					<Svg icon={SvgIcon.RustLanguage} />
					<code>{header.file}</code>
				</div>
			{/each}
		</div>
		{#if loaded}
			{#if isFileCode(selectedFile.file)}
				<div class="tutorial-code">
					<TutorialCodeRenderer
						lang="rust"
						text={selectedFile.fileData}
						highlight={selectedFile.highlights}
					/>
				</div>
			{:else}
				<div class="tutorial-image">
					<img src="{base}/tutorials/tutorial_one/{selectedFile.file}" alt="" />
				</div>
			{/if}
		{/if}
	</div>

	<div class="tutorial-content">
		{#if loaded}
			<div class="tutorial-header">
				{#if currentStepDetails.title}
					<h1 class="title">{currentStepDetails.title}</h1>
					<h2>{data.tutorial.title}</h2>
				{:else}
					<h1 class="title">{data.tutorial.title}</h1>
				{/if}
				<div class="step-display">
					<p class="step-value">{currentStep + 1}</p>
					<p>/</p>
					<p class="step-value">{flattenedSteps.length}</p>
				</div>
			</div>
			<div class="tutorial-markdown">
				<SvelteMarkdown
					source={currentStepDetails.markdownFileData}
					renderers={{
						code: CodeRenderer,
						tablecell: TableCellRenderer,
						image: ImageRenderer,
						link: LinkRenderer
					}}
				/>
			</div>
			<div class="divisor" />
			<div class="step-actions">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<p class="step-action {currentStep > 0 ? '' : 'disabled'}" on:click={previousStep}>
					Previous
				</p>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<p
					class="step-action {currentStep < flattenedSteps.length - 1 ? '' : 'disabled'}"
					on:click={nextStep}
				>
					Next
				</p>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.tutorial-wrapper {
		width: 100%;
		max-width: var(--page-width);
		height: calc(100vh - var(--header-size));
		margin: auto;
		display: flex;
		flex-direction: row;
	}

	.tutorial-header {
		width: 100%;
		height: 2.2rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 1rem;

		h1 {
			width: auto;
		}

		h2 {
			flex: 1;
			font-size: 0.8rem;
			font-weight: 600;
			text-transform: uppercase;
			color: var(--c-4);
			display: flex;
			align-items: flex-end;
			padding: 0.25rem 0;
		}

		.step-display {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			padding: 0 0.5rem;
			border-radius: 0.5rem;
			background-color: transparent;
			border: 1px solid transparent;
			gap: 0.25rem;
			width: fit-content;
			cursor: pointer;

			&:hover {
				background-color: var(--c-3);
				border: 1px solid var(--c-0);
			}

			.step-value {
				pointer-events: none;
				color: var(--c-6);
				user-select: none;
			}
		}
	}

	.tutorial-content {
		overflow-x: hidden;
		overflow-y: auto;

		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 50%;
		padding: 2rem;
	}

	.tutorial-markdown {
		overflow-x: hidden;
		overflow-y: auto;
		flex: 1;

		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.divisor {
		height: 1px;
		width: 100%;
		background-color: var(--c-0);
	}

	.step-actions {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.step-action {
			width: auto;
			padding: 0.125rem 0.5rem;
			cursor: pointer;
			color: var(--accent);
			user-select: none;

			&.disabled {
				color: var(--c-4);
				cursor: auto;
			}
		}
	}

	.tutorial-code-wrapper {
		display: flex;
		flex-direction: column;
		width: 50%;
		border-bottom: 0px;
		border: 1px solid var(--c-0);
	}

	.tutorial-code {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: var(--c-2);
		align-items: flex-start;
		outline: 1px solid var(--c-0);

		overflow-x: hidden;
		overflow-y: auto;
		padding: 1rem;
	}

	.tutorial-image {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: var(--c-2);
		align-items: flex-start;
		outline: 1px solid var(--c-0);

		overflow-x: hidden;
		overflow-y: auto;

		padding: 1rem;

		img {
			max-width: 100%;
		}
	}

	.file-headers {
		display: flex;
		flex-direction: row;
		background-color: var(--c-0);

		--svg-size: 1.5rem;
		--svg-fill: var(--c-5);
		--svg-hover-fill: var(--c-6);
	}

	.file-header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		padding: 0.5rem;
		cursor: pointer;
		outline: 1px solid var(--c-0);
		background-color: var(--c-1);

		--svg-fill: var(--c-4);
		& > code {
			color: var(--c-4);
		}

		* {
			pointer-events: none;
			user-select: none;
		}

		&.active {
			background-color: var(--c-2);
			--svg-fill: var(--c-5);

			& > code {
				color: var(--c-6);
			}
		}

		&:hover {
			background-color: var(--c-3);
		}
	}
</style>

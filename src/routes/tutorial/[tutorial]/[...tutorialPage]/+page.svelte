<script lang="ts">
	import { base } from '$app/paths';
	import CodeRenderer from '$lib/components/renderers/CodeRenderer.svelte';
	import ImageRenderer from '$lib/components/renderers/ImageRenderer.svelte';
	import LinkRenderer from '$lib/components/renderers/LinkRenderer.svelte';
	import TableCellRenderer from '$lib/components/renderers/TableCellRenderer.svelte';
	import TutorialCodeRenderer from '$lib/components/tutorial/TutorialCodeRenderer.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import Svg from '$lib/components/Svg.svelte';
	import StepDropdown from '$lib/components/tutorial/StepDropdown.svelte';

	import { iconFromExtension } from '$lib/svg';
	import { extensionFromName } from '$lib/tutorial';
	import type { PageData } from './$types';

	export let data: PageData;

	$: FILE_HEADERS = data.step.files;

	let openStepDropdown = false;
	let mobilePageShowMarkdown = true;

	$: stepIndex = data.tutorialStepsFlattened.findIndex((v) => v.queryName === data.step.queryName);
	$: selectedFile = FILE_HEADERS[0];

	$: nextStep = data.tutorialStepsFlattened[stepIndex + 1];
	$: prevStep = data.tutorialStepsFlattened[stepIndex - 1];
</script>

<div class="tutorial-wrapper">
	<div class="tutorial-content-wrapper" class:mobile-show={!mobilePageShowMarkdown}>
		<div class="file-headers">
			{#each FILE_HEADERS as header}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="file-header"
					class:active={selectedFile.file == header.file}
					on:click={() => (selectedFile = header)}
				>
					<Svg icon={iconFromExtension(extensionFromName(header.file))} />
					<p>{header.file}</p>
				</div>
			{/each}
		</div>
		{#if selectedFile.fileData}
			{#await selectedFile.fileData}
				<p>...</p>
			{:then ve}
				<div class="tutorial-code">
					<TutorialCodeRenderer
						lang="rust"
						text={ve}
						highlights={selectedFile.highlightData}
						disabledHighlights={selectedFile.inversedRanges()}
					/>
				</div>
			{/await}
		{:else}
			<div class="tutorial-image">
				<img
					src="{base}/tutorial/{data.tutorial.indexPath.replace('.md', '')}/{selectedFile.file}"
					alt=""
				/>
			</div>
		{/if}
	</div>

	<div class="tutorial-markdown-wrapper" class:mobile-show={mobilePageShowMarkdown}>
		<div class="tutorial-header">
			{#if data.step.title}
				<h1 class="title">{data.step.title}</h1>
				<h2>{data.tutorial.title}</h2>
			{:else}
				<h1 class="title">{data.tutorial.title}</h1>
			{/if}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="step-display" on:click={() => (openStepDropdown = !openStepDropdown)}>
				<p class="step-value">{stepIndex + 1}</p>
				<p>/</p>
				<p class="step-value">{data.tutorialStepsFlattened.length}</p>
			</div>
			<div class="step-dropdown {openStepDropdown ? 'open' : ''}">
				{#each data.tutorial.steps ?? [] as step}
					<StepDropdown
						{step}
						tutorial={data.tutorial}
						matcher={(i) => {
							return i === data.step;
						}}
					/>
				{/each}
			</div>
		</div>
		<div class="tutorial-markdown">
			{#await data.markdown}
				<p>...</p>
			{:then v}
				<SvelteMarkdown
					source={v}
					renderers={{
						code: CodeRenderer,
						tablecell: TableCellRenderer,
						image: ImageRenderer,
						link: LinkRenderer
					}}
				/>
			{:catch e}
				<p>Error: {e}</p>
			{/await}
		</div>
		<div class="divisor" />
		<div class="step-actions">
			{#if prevStep}
				<a
					class="step-action"
					href="{base}/tutorial/{data.tutorial.directory}/{prevStep.queryName}"
				>
					Previous
				</a>
			{:else}
				<p class="step-action disabled">Previous</p>
			{/if}
			{#if nextStep}
				<a
					class="step-action"
					href="{base}/tutorial/{data.tutorial.directory}/{nextStep.queryName}"
				>
					Next
				</a>
			{:else}
				<p class="step-action disabled">Next</p>
			{/if}
		</div>
	</div>

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="mobile-switch" on:click={() => (mobilePageShowMarkdown = !mobilePageShowMarkdown)}>
		<p>{mobilePageShowMarkdown ? 'Code' : 'Tutorial'}</p>
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
		position: relative;
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

		.step-dropdown {
			pointer-events: none;
			user-select: none;
			position: absolute;

			background-color: var(--c-3);
			border: 1px solid var(--c-0);
			border-radius: 0.5rem;

			top: 2.5rem;
			width: 100%;
			padding: 1rem;

			opacity: 0;

			display: none;

			&.open {
				display: block;
				opacity: 1;
			}
		}
	}

	.tutorial-markdown-wrapper {
		overflow-x: hidden;
		overflow-y: auto;

		flex-direction: column;
		gap: 0.5rem;
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

	.tutorial-content-wrapper {
		flex-direction: column;
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

		overflow: auto;
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
		background-color: var(--c-1);

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
		& > p {
			color: var(--c-4);
		}

		* {
			pointer-events: none;
			user-select: none;
		}

		&.active {
			background-color: var(--c-2);
			--svg-fill: var(--c-5);

			& > p {
				color: var(--c-6);
			}
		}

		&:hover {
			background-color: var(--c-3);
		}
	}

	.mobile-switch {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translate(-50%, calc(-100% - 1rem));
		cursor: pointer;

		padding: 0.5rem 1rem;

		background-color: var(--c-3);
		border: 1px solid var(--c-0);
		border-radius: 0.5rem;

		* {
			user-select: none;
			pointer-events: none;
		}
	}

	@media (min-width: 0) {
		.tutorial-markdown-wrapper {
			display: none;
			width: 100%;

			&.mobile-show {
				display: flex;
			}
		}

		.tutorial-content-wrapper {
			display: none;
			width: 100%;

			&.mobile-show {
				display: flex;
			}
		}

		.mobile-switch {
			display: block;
			pointer-events: all;
		}
	}

	@media (min-width: 60rem) {
		.tutorial-markdown-wrapper {
			display: flex;
			width: 50%;
		}

		.tutorial-content-wrapper {
			display: flex;
			width: 50%;
		}

		.mobile-switch {
			display: none;
			pointer-events: none;
		}
	}
</style>

<script lang="ts">
	import { base } from '$app/paths';

	export let alt = false;

	export let videoSrc = '';
	export let header = '';
	export let content = {};
</script>

<section class="feature-section" class:alternative={alt}>
	<div class="wrapper">
		<!-- svelte-ignore a11y-media-has-caption -->
		{#if alt}
			<div class="feature-info">
				<h1>{header}</h1>
				<p>{content}</p>
			</div>
			<video
				src="{base}/videos/{videoSrc}"
				loop={true}
				autoplay={true}
				muted={true}
				playsinline={true}
			/>
		{:else}
			<video
				src="{base}/videos/{videoSrc}"
				loop={true}
				autoplay={true}
				muted={true}
				playsinline={true}
			/>
			<div class="feature-info">
				<h1>{header}</h1>
				<p>{content}</p>
			</div>
		{/if}
	</div>
</section>

<style lang="scss">
	.feature-section {
		width: 100%;
		height: fit-content;
		// max-width: var(--page-width);
		padding: 0 auto;
		background-color: #202020;

		display: grid;
		place-items: center;
		flex-direction: row;

		align-items: center;
	}

	.wrapper {
		width: 100%;
		max-width: calc(var(--page-width) * 2 / 3);

		display: flex;
		flex-direction: row;

		align-items: center;
		justify-content: space-between;

		padding: 2rem;
		gap: 2rem;
	}

	.feature-section.alt {
		background-color: #121212;
	}

	video {
		border-radius: 1rem;
	}
</style>

<script lang="ts">
	import BgElement from '$lib/components/BGElement.svelte';
	import LandingPageButton from '$lib/components/LandingPageButton.svelte';

	import { base } from '$app/paths';
</script>

<section class="main-section">
	<div class="main-info">
		<h1>
			Declarative <b>GUI Framework</b>
			for <i>any</i> kind of applications.
		</h1>
		<p>Combine versatility, modularity and speed in one</p>

		<div class="actions-container">
			<LandingPageButton
				text="Get Started"
				link="{base}/guide/introduction/getting_started#getting-started"
				style="accent"
			/>
			<LandingPageButton text="Tutorials" link="{base}/tutorials" />
		</div>
	</div>
	<div class="abstract">
		<BgElement
			color="#51afef44"
			offset_x={1}
			offset_y={1}
			rotation={90}
			type="circle"
			size_y={6 * 3}
		/>
		<BgElement color="#51afef" offset_x={-1} offset_y={2} type="circle" />
		<BgElement color="#51afef" offset_x={0} offset_y={1} rotation={90} />
		<BgElement color="#efcc51" offset_x={0} offset_y={0} rotation={-90} type="circle" />
		<BgElement color="#ef5151" offset_x={-1} offset_y={0} />
		<BgElement color="#efcc51" offset_x={-1} offset_y={-1} rotation={180} />
		<BgElement color="#51afef" offset_x={2} offset_y={0} rotation={180} />
		<BgElement color="#ef5151" offset_x={1} offset_y={-2} rotation={-90} type="circle" />

		<!-- <div class="blur" /> -->
	</div>
</section>

<style lang="scss">
	.main-section {
		width: var(--page-width);
		height: 38rem;
		margin: 0 auto;

		display: flex;
		flex-direction: row;

		align-content: center;
	}

	.abstract {
		position: relative;
		width: 40%;
		flex: 1;
	}

	.main-info {
		width: 60%;
		height: fit-content;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-self: center;

		gap: 1rem;

		h1 {
			font-size: 3.5rem;
			line-height: 125%;
		}

		p {
			font-size: 1rem;
			color: #ffffff88;
			margin-bottom: 1rem;
		}

		b {
			background: linear-gradient(to right, #51afef, #5451ef);
			color: transparent;
			background-clip: text;
			-webkit-background-clip: text;
			font-weight: 600;
		}

		.actions-container {
			width: 100%;
			display: flex;
			flex-direction: row;
			gap: 1rem;
		}
	}
</style>

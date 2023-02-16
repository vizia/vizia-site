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
		<BgElement color="#51afef44" offset_x={1} offset_y={1} rotation={90} type="circle" size_y={3} />
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
		width: 100%;
		max-width: var(--page-width);
		margin: 0 auto;

		display: flex;

		align-items: center;
		justify-content: space-between;
		padding: 2rem;
	}

	.abstract {
		position: relative;
		width: calc(4 * var(--size));
		height: calc(5 * var(--size));
		display: flex;
		margin: 2rem;
	}

	.main-info {
		height: fit-content;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-self: center;

		gap: 1rem;

		h1 {
			line-height: 125%;
			transition: all ease-in-out var(--long-transition);
		}

		p {
			font-size: 1.2rem;
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
			display: flex;
			gap: 1rem;
		}
	}

	@media (min-width: 0rem) {
		.main-section {
			height: 30rem;
			flex-direction: column;
		}

		.main-info {
			width: 100%;
			align-items: center;
			padding-top: 4rem;

			h1,
			p {
				text-align: center;
			}

			h1 {
				font-size: 2.2rem;
			}
		}

		.actions-container {
			flex-direction: column;
			align-items: center;
		}

		.abstract {
			--size: 4rem;
		}
	}

	@media (min-width: 25rem) {
		.actions-container {
			flex-direction: row;
		}
	}

	@media (min-width: 50rem) {
		.main-info {
			h1 {
				font-size: 3.5rem;
			}
		}
	}

	@media (min-width: 75rem) {
		.main-section {
			flex-direction: row;
			height: 40rem;
		}

		.main-info {
			width: 60%;
			align-items: flex-start;

			h1,
			p {
				text-align: start;
			}

			h1 {
				font-size: 3.5rem;
			}
		}

		.actions-container {
			align-items: flex-start;
		}

		.abstract {
			--size: 6rem;
		}
	}
</style>

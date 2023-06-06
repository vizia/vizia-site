<script lang="ts">
	import LandingPageButton from '$lib/components/landing_page/LandingPageButton.svelte';
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
				link="/guide/introduction/getting_started#getting-started"
				style="accent"
			/>
			<LandingPageButton text="Tutorial" link="/tutorial" />
		</div>
	</div>
</section>

<style lang="scss">
	.main-section {
		width: 100%;
		margin: 0 auto;

		display: grid;
		place-items: center;

		background: radial-gradient(
				75% 150% at 50% 100%,
				rgba(81, 175, 239, 0.33) 0%,
				rgba(0, 0, 0, 0) 100%
			),
			var(--background-main);
		background-blend-mode: color-dodge;
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
			font-size: 1.4rem;
			color: #ffffffaa;
			margin-bottom: 1rem;
		}

		b {
			background: linear-gradient(to right, #51afef, #5451ef);
			color: transparent;
			background-clip: text;
			-webkit-background-clip: text;
			font-weight: 600;
		}

		i {
			background: linear-gradient(to right, #ef5151, #e3c351);
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
	}

	@media (min-width: 25rem) {
		.main-section {
			height: 35rem;
		}

		.main-info {
			width: calc(var(--page-width) / 2);
		}

		.actions-container {
			flex-direction: row;
		}
	}

	@media (min-width: 55rem) {
		.main-info {
			h1 {
				font-size: 3.5rem;
			}
		}

		.main-section {
			flex-direction: row;
		}
	}

	@media (min-width: 75rem) {
		.main-section {
			height: 40rem;
		}

		.main-info {
			h1 {
				font-size: 3.5rem;
			}
		}

		.actions-container {
			align-items: flex-start;
		}
	}
</style>

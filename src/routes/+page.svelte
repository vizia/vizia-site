<script lang="ts">
	import BgElement from '$lib/components/BGElement.svelte';
	import LandingPageButton from '$lib/components/LandingPageButton.svelte';
	import LandingPageDemo from '$lib/components/LandingPageDemo.svelte';
</script>

<!-- Landing Page -->
<div class="bgs">
	<BgElement color="#ef5151" offset_x={1} offset_y={0} type="circle" />
	<BgElement color="#ef5151" offset_x={0} offset_y={1} type="circle" rotation={90} />
	<BgElement color="#efcc51" offset_x={0} offset_y={0} rotation={-90} />
	<BgElement color="#efcc51" offset_x={1} offset_y={-1} rotation={180} />
	<BgElement color="#ef5151" offset_x={0} offset_y={-1} rotation={90} />
	<BgElement color="#ef5151" offset_x={0} offset_y={-3} rotation={-90} />

	<BgElement color="#51afef" side="right" offset_x={0} offset_y={2} type="circle" rotation={180} />
	<BgElement color="#efcc51" side="right" offset_x={-1} offset_y={0} type="circle" rotation={-90} />
	<BgElement color="#51afef" side="right" offset_x={0} offset_y={0} />
	<BgElement color="#efcc51" side="right" offset_x={0} offset_y={0} size={16} rotation={90} />
	<div class="blur" />
</div>
<div class="overlay">
	<div class="landing-main">
		<h1>
			Declarative <b>GUI Framework</b>
			for <b>any</b> kind of applications.
		</h1>
		<p>Combine versatility, modularity and speed in one</p>

		<div class="actions-container">
			<LandingPageButton
				text="Get Started"
				link="/guide/introduction/getting_started#getting-started"
				style="gradient"
			/>
			<LandingPageButton text="Tutorial" link="/tutorial" />
		</div>
	</div>
	<!-- <LandingPageDemo /> -->
</div>

<style lang="scss">
	.blur {
		pointer-events: none;
		width: 100%;
		height: 100%;

		mask: linear-gradient(transparent, black 50%);

		backdrop-filter: blur(8px);
	}
	.bgs {
		position: relative;
		width: 100%;
		height: 120rem;

		overflow-x: hidden;
		overflow-y: auto;

		&:before {
			content: '';
			height: 100%;
			width: 100%;
			left: 0px;
			top: 0px;
			position: absolute;
			background-image: radial-gradient(
					25% 1000% at calc(20%) 0,
					hsl(0deg 83% 63%) 0%,
					hsla(241deg, 83%, 63%, 0) 100%
				),
				radial-gradient(
					25% 1000% at calc(80%) 0,
					hsl(204deg 83% 63%) 0%,
					hsla(238deg, 83%, 63%, 0) 100%
				);
			transition: background-color 250ms ease;
			opacity: 0.5;
		}
	}

	.overlay {
		pointer-events: none;
		position: absolute;
		width: 100%;
		height: auto;
		top: 4rem;

		display: flex;
		flex-direction: column;
		align-items: center;

		.landing-main {
			width: 50rem;
			padding: 10rem 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			gap: 1rem;

			h1 {
				font-size: 2.5rem;
				line-height: 3rem;
				text-align: center;
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
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				gap: 1rem;
			}
		}
	}
</style>

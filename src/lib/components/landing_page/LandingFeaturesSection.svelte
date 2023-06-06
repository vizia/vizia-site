<script lang="ts">
	import FeatureCard from '../FeatureCard.svelte';
</script>

<section class="features-section">
	<h1>Other Features</h1>
	<div class="features-row">
		<FeatureCard
			img="declarative.png"
			header="Declarative"
			content="Write GUI code in a declarative way in pure Rust. Use an imperative approach when you need it."
		/>
		<FeatureCard
			img="cross-platform.png"
			header="Cross Platform"
			content="Build desktop applications which look and behave the same for Windows, Mac, and Linux."
		/>
		<FeatureCard
			img="reactive.png"
			header="Reactive"
			content="Change the application state and the views which bind to it update automatically."
		/>
	</div>
	<div class="features-row">
		<FeatureCard
			img="styling.png"
			header="Powerful styling"
			content="Take advantage of CSS to fully customize the style of your application."
		/>
		<FeatureCard
			img="accessibility.png"
			header="Accessibility"
			content="Make you applications accessible to assisstive technologies such as screen readers."
		/>
		<FeatureCard
			img="localization.png"
			header="Localization"
			content="Adapt your application to different locales, including translating text with fluent."
		/>
	</div>
</section>

<style lang="scss">
	.features-section {
		width: 100%;
		height: fit-content;
		// max-width: var(--page-width);
		padding: 0 auto;

		background-color: #121212;

		display: flex;
		flex-direction: column;

		align-items: center;
		justify-content: space-between;
		padding: 2rem;
		gap: 1rem;
	}

	.features-row {
		display: flex;
		flex-direction: row;

		gap: 1rem;
	}
</style>

<script lang="ts">
	import LandingFeaturesSection from '$lib/components/landing_page/LandingFeaturesSection.svelte';
	import LandingMainSection from '$lib/components/landing_page/LandingMainSection.svelte';
	import LandingVideoFeature from '$lib/components/landing_page/LandingVideoFeature.svelte';
</script>

<LandingMainSection />
<LandingVideoFeature
	videoSrc="flexible-layout.mp4"
	header="Flexible Layout"
	content="Create flexible layouts which adapt to changes in size."
/>
<LandingFeaturesSection />

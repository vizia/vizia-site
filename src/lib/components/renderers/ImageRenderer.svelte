<script lang="ts">
	import { base } from '$app/paths';

	export let href = '';
	export let title: string | undefined = undefined;
	export let text = '';
</script>

<img src="{base}{href}" {title} alt={text} />

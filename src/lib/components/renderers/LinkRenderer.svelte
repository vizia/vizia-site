<script lang="ts">
	import { base } from '$app/paths';

	export let href = '';
	export let title: string | undefined = undefined;

	const link = href.startsWith('/') ? base + href : href;
</script>

<a href={link} {title}><slot /></a>

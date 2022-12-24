<script lang="ts">
	export let header: 'left' | 'center' | 'right' | 'justify' | 'char' | null | undefined;
</script>

{#if header}
	<th><slot /></th>
{:else}
	<td><slot /></td>
{/if}

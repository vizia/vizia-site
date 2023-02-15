<script lang="ts">
	export let text = '';
	export let link = '';
	export let style: 'normal' | 'accent' = 'normal';
</script>

<a on:click class={style} href={link}>
	<p>{text}</p>
</a>

<style lang="scss">
	a {
		pointer-events: all;
		width: auto;

		padding: 0.125rem 1rem;
		background-color: var(--c-3);
		border: 1px solid var(--border-color);
		border-radius: 0.5rem;

		> p {
			color: var(--c-6);
			min-width: 8rem;
			padding: 0.25rem 0;
			font-weight: 600;
			transition: color 250ms ease;
			text-align: center;
		}

		&.accent {
			background-color: var(--c-6);

			> p {
				color: var(--c-1);
			}
		}

		&:hover {
			background-color: var(--c-2);

			&.accent {
				background-color: var(--c-5);
			}
		}
	}
</style>

<script lang="ts">
	import type { BlogPost } from '$lib/types';
	import { base } from '$app/paths';

	export let post: BlogPost;
</script>

<a class="post" style={`--bg: url("${base}${post.image}");`} href="{base}/blogs/{post.path}">
	<p>{post.date}</p>
	<h1>{post.title}</h1>
	<div class="wrapper">
		<p class="chip {post.type}">{post.type}</p>
		<p>by {post.author}</p>
	</div>
</a>

<style lang="scss">
	.post {
		position: relative;
		width: 100%;
		height: 12rem;
		border-radius: 0.5rem;
		padding: 1rem;
		background: var(--bg);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 75vw;

		display: flex;
		flex-direction: column;
		justify-content: flex-end;

		transition: all ease-in-out 100ms;
		transition: background-position ease-in-out 0.5s;

		cursor: pointer;

		gap: 0.5rem;

		* {
			z-index: 2;
		}

		h1 {
			pointer-events: none;
			font-weight: 600;
			color: #ffffff;
			flex: 1;
			display: flex;
			align-items: flex-end;
			margin: 0;
		}

		p {
			pointer-events: none;
			color: #ffffff88;
		}

		&::after {
			content: '';
			width: 100%;
			height: 100%;
			position: absolute;
			pointer-events: none;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			border-radius: 0.5rem;
			background: linear-gradient(to bottom, transparent, #00000088 100%);
			background-position: 100% 100%;
			background-size: 200% 200%;
			transition: background-position 250ms ease;
		}

		&:hover {
			box-shadow: 0 0.5rem 0.5rem #00000088;

			&::after {
				background-position: 0% 0%;
			}
		}

		.wrapper {
			display: flex;
			flex-direction: row;
			gap: 0.5rem;
			width: 100%;
			height: auto;
		}

		.chip {
			font-size: 0.9rem;
			font-weight: 600;
			text-transform: uppercase;
			padding: 0rem 0.75rem;
			border-radius: 2rem;
			width: auto;
			height: auto;

			&.update {
				color: #803c3c;
				background-color: #ff7979;
			}
		}
	}
</style>

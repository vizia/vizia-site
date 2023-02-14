<script lang="ts">
	import type { Post } from '$lib/types';
	import { base } from '$app/paths';

	export let post: Post;
	let img = `${post.meta?.landing_image}`;
</script>

<a class="post" style={`--bg: url("${img ? base + img : ''}");`} href="{base}/blogs/{post.path}">
	<h1>{post.meta?.title}</h1>
	<p>{post.meta?.date}</p>
</a>

<style lang="scss">
	.post {
		width: 100%;
		height: 20rem;
		border-radius: 0.5rem;
		padding: 2rem;
		background: linear-gradient(to bottom, transparent, #00000088 100%), var(--bg);
		background-repeat: no-repeat;
		background-position: center;
		background-position-y: 20%;
		background-size: 75vw;

		display: flex;
		flex-direction: column;
		justify-content: flex-end;

		transition: all ease-in-out 100ms;
		transition: background-position ease-in-out 0.5s;

		cursor: pointer;

		gap: 0.5rem;

		h1 {
			pointer-events: none;
			font-weight: 600;
			color: #ffffff;
		}

		p {
			pointer-events: none;
			color: #ffffff88;
		}

		&:hover {
			border: 0.2rem solid white;
			background-position-y: 0%;
		}
	}
</style>

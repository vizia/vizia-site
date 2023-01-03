<script lang="ts">
	export let text = '';
	export let link = '';
	export let style: 'normal' | 'gradient' = 'normal';
</script>

<a on:click href={link}>
	<div class={style}>
		<p>{text}</p>
	</div>
</a>

<style lang="scss">
	a {
		pointer-events: all;
		width: auto;

		& > div {
			position: relative;
			width: auto;
			height: 2.5rem;
			padding: 0 2rem;

			display: flex;
			align-items: center;

			transition: all ease-in-out 0.1s;

			&:before {
				content: '';
				height: 100%;
				width: 100%;
				left: 0px;
				top: 0px;
				position: absolute;
				background: #343434;
				border-radius: 2rem;
				transition: background-color 250ms ease;
			}

			& > p {
				font-size: 1.2rem;
				color: #888;
				width: 8rem;
				text-align: center;
				padding: 0.25rem 0;
				font-weight: 600;
				z-index: 10;
				transition: color 250ms ease;
			}

			&:hover {
				& > p {
					color: #fff;
				}

				&:before {
					background: #484848;
				}
			}
		}

		& > div.gradient {
			&:before {
				background: linear-gradient(to right, #a2daff 0%, #51afef 33%, #51afef 66%, #5451ef 100%);

				background-position: 100% 100%;
				background-size: 300% 300%;
				transition: background-position 250ms ease;
				content: '';
				z-index: 1;
			}

			&:hover:before {
				background-position: 0% 0%;
			}

			& > p {
				color: #fff;
			}
		}
	}
</style>

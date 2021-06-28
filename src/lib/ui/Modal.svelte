<script lang="ts">
	import { onDestroy } from 'svelte';
	import { modal } from '../../stores/stores';
	const { close } = modal;

	let modalElement: HTMLDivElement;

	const handleKeydown = (e: KeyboardEvent) => {
		e.stopPropagation();
		if (e.key === 'Escape') {
			close();
		}

		if (e.key === 'Tab' && $modal) {
			// trap focus inside modal
			const nodes: NodeListOf<HTMLElement> = modalElement.querySelectorAll('*');
			const selectable = Array.from(nodes).filter((i) => i.tabIndex >= 0);

			let index: number = selectable.indexOf(document.activeElement as HTMLElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += selectable.length + (e.shiftKey ? -1 : 1);
			index %= selectable.length;

			selectable[index].focus();
			e.preventDefault();
		}
	};

	const prevFocused: HTMLElement =
		typeof document !== 'undefined' && (document.activeElement as HTMLElement);

	if (prevFocused) {
		onDestroy(() => {
			prevFocused.focus();
		});
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $modal}
	<div class="backdrop" />
	<div class="modal" role="dialog" aria-modal="true" bind:this={modalElement}>
		<article class="content-wrapper p-6 space-y-4 flex flex-col">
			<button class="self-end" on:click={close} autofocus
				><img
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG6SURBVHgBtVZNTsJQEJ5CJIaycAEYWZM0JMYNicYbuCkX4ARewkQv4QngAKw8g8aNgRA8ACaUEBdtF+2izte0+lrea4stX/Kl05lmft7M63saqdFk9pht5hnzJCLgMx2my9wy15G8B02ig8MBs0OHwWK+pwOlA/SZV1QOy4gh6oIBWV9SeaByLOEOL7VI2YwCVAWsQlsMMKTqMYgDIPtDG1oE8NlEgJ7qC9u2n8HRaNRN26CL7aRGr0YZ2QdBoOm63p1Op49iEMjQwYZvSI02pshgnsqsi8Xi1TTNm1ar1WWn1/P5/M0wDD12ztlb4/H4YbVaOYoAdUQ36W+H7gHZTiaTJw7ScRxnA53ofDabbUgNHxVkzj6yEytpNBp6QedhBTUqCE3TApmcB1TQp+SOTkBsKDL3PM8Ve5Kx/oCPCvyizrEsIGTZdEngoMm3zAuZFTMua2i68fy8VwRYowJLYQz3gayhkONKcvbBFkb8Ku7oOHhBBTggLKoe8OnGY7qk6oHT7Xc8UQWm6ZyqARL+EgMAu+hZ9tf9wfyMX2QTgKYP6X+HPjLfisqsEROvLZB1Sl5bwG/Kubb8AGJE0Xxy40cwAAAAAElFTkSuQmCC"
					alt=""
					class=""
				/></button
			>
			<header class="text-sm sm:text-2xl">
				<slot name="header" />
			</header>
			<section class="content">
				<slot name="content" />
			</section>
		</article>
	</div>
{/if}

<style>
	.backdrop {
		@apply fixed;
		@apply inset-0;
		@apply bg-black;
		@apply bg-opacity-70;
		@apply backdrop-filter;
		@apply backdrop-blur-xs;
	}

	.modal {
		@apply fixed;
		@apply left-1/2;
		@apply top-1/2;
		@apply transform;
		@apply -translate-x-1/2;
		@apply -translate-y-1/2;
		@apply bg-white;
		@apply rounded-lg;
		/*max-height: 650px;*/
		width: 85%;
	}
	@media (min-width: 500px) {
		.modal {
			max-width: 550px;
			width: 500px;
		}
	}
</style>

<script>
	import { goto } from '$app/navigation';
	import { modal } from '../../stores/modalStore';
</script>

<div
	role="button"
	on:click={() => {
		modal.close();
		goto('/wallet/hedera');
	}}
>
	<article
		class="border-b-2 border-gray-300 border-solid text-gray-400 flex flex-row justify-between items-center p-6"
	>
		<svg
			width="50px"
			height="50px"
			id="Layer_1"
			data-name="Layer 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 40 40"
		>
			<path d="M20 0a20 20 0 1 0 20 20A20 20 0 0 0 20 0" class="fill-current" />
			<path
				d="M28.13 28.65h-2.54v-5.4H14.41v5.4h-2.54V11.14h2.54v5.27h11.18v-5.27h2.54zm-13.6-7.42h11.18v-2.79H14.53z"
				class="h"
			/>
		</svg>
		<div>
			<h4 class="text-black font-bold">Hedera</h4>
			<p>Deposit funds using HBAR</p>
		</div>
		<svg height="24px" class="fill-current" focusable="false" viewBox="0 0 24 24" aria-hidden="true"
			><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z" /></svg
		>
	</article>
</div>

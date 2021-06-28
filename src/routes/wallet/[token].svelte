<script context="module">
	export async function load({ page, fetch }) {
		const url = `/api/${page.params.token}.json`;
		const accountRes = await fetch(url);

		const url2 = '/api/marketValue.json';
		const res = await fetch(url2);

		if (res.ok && accountRes.ok) {
			return {
				props: {
					data: await res.json(),
					accountData: await accountRes.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
	import { goto } from '$app/navigation';
	import UserWalletForm from '$lib/components/UserWalletForm.svelte';
	import HrHeader from '$lib/ui/HrHeader.svelte';
	import Modal from '$lib/ui/Modal.svelte';
	import { modal } from '../../stores/stores';
	export let data;
	export let accountData;
	const usdValue = data?.hbarData.data['4642'].quote.USD.price;
	console.log(accountData);
</script>

<main class="min-h-screen">
	<article class="container mx-auto mt-5">
		<header
			class="border-b-2 border-solid border-black py-6 flex flex-row justify-between items-center"
		>
			<div class="flex flex-row items-center">
				<svg
					width="48px"
					height="48px"
					id="Layer_1"
					data-name="Layer 1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 40 40"
				>
					<path d="M20 0a20 20 0 1 0 20 20A20 20 0 0 0 20 0" class="text-gray-300 fill-current" />
					<path
						d="M28.13 28.65h-2.54v-5.4H14.41v5.4h-2.54V11.14h2.54v5.27h11.18v-5.27h2.54zm-13.6-7.42h11.18v-2.79H14.53z"
						class="h"
					/>
				</svg>
				<h2 class="ml-3">Transfer Hbars</h2>
			</div>
			<button class="" on:click={() => goto('/')}
				><img
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG6SURBVHgBtVZNTsJQEJ5CJIaycAEYWZM0JMYNicYbuCkX4ARewkQv4QngAKw8g8aNgRA8ACaUEBdtF+2izte0+lrea4stX/Kl05lmft7M63saqdFk9pht5hnzJCLgMx2my9wy15G8B02ig8MBs0OHwWK+pwOlA/SZV1QOy4gh6oIBWV9SeaByLOEOL7VI2YwCVAWsQlsMMKTqMYgDIPtDG1oE8NlEgJ7qC9u2n8HRaNRN26CL7aRGr0YZ2QdBoOm63p1Op49iEMjQwYZvSI02pshgnsqsi8Xi1TTNm1ar1WWn1/P5/M0wDD12ztlb4/H4YbVaOYoAdUQ36W+H7gHZTiaTJw7ScRxnA53ofDabbUgNHxVkzj6yEytpNBp6QedhBTUqCE3TApmcB1TQp+SOTkBsKDL3PM8Ve5Kx/oCPCvyizrEsIGTZdEngoMm3zAuZFTMua2i68fy8VwRYowJLYQz3gayhkONKcvbBFkb8Ku7oOHhBBTggLKoe8OnGY7qk6oHT7Xc8UQWm6ZyqARL+EgMAu+hZ9tf9wfyMX2QTgKYP6X+HPjLfisqsEROvLZB1Sl5bwG/Kubb8AGJE0Xxy40cwAAAAAElFTkSuQmCC"
					alt=""
					class=""
					height="24px"
					width="24px"
				/></button
			>
		</header>
		<section class="space-y-4 mt-5">
			<p>Status: <span>Connected account</span></p>
			<ol role="list" class="list-decimal text-xl">
				<li>
					<h3>Connect your wallet:</h3>
					<button
						on:click={modal.open}
						class="bg-black text-white w-full rounded-full p-4 text-xl font-bold my-8"
						>Set account</button
					>
				</li>
				<li>
					<h3>Set amount for transfer:</h3>
					<p>Hedera USD Value: {usdValue}</p>
					<span>Available Funds</span>
					<input type="number" min="0.00" step="0.1" />
				</li>
			</ol>
		</section>
	</article>
	<Modal>
		<HrHeader slot="header" header="Set account" />
		<UserWalletForm slot="content" />
	</Modal>
</main>

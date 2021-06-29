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

<script lang="ts">
	import { goto } from '$app/navigation';
	import { modal, userWallet } from '../../stores/stores';
	import Modal from '$lib/ui/Modal.svelte';
	import UserWalletForm from '$lib/components/UserWalletForm.svelte';
	import HrHeader from '$lib/ui/HrHeader.svelte';
	export let data;
	const usdValue = data?.hbarData.data['4642'].quote.USD.price;
	let transferAmount: string | number = '';

	function roundNumber(num: number) {
		const numberFormatted = new Intl.NumberFormat('en-US', {
			maximumFractionDigits: 2
		}).format(num);
		return Number(numberFormatted);
	}

	export async function postTransferAmount() {
		const url = `/api/transferhbar`;
		const res = await fetch(url, {
			method: 'post',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({
				sender: $userWallet.accountId,				
				transferedHbars: transferAmount
			})
		});

		if (res.ok) {
			return {
				data: await res.json()
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}

	const handleTransfer = async () => {
		const data = await postTransferAmount();
		console.log(data);
	};
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
			<p class="mx-auto w-max text-lg my-8">
				Status:
				{#if $userWallet.accountId}
					<span class="font-bold text-green-500 block">Account connected:</span>
					<span class="font-bold">{$userWallet.accountId}</span>
				{:else if !$userWallet.accountId}
					<span class="text-gray-400">Account not connected</span>
				{/if}
			</p>
			<ol role="list" class="list-decimal text-xl space-y-8">
				<li>
					<h3>Connect your wallet:</h3>
					<button
						disabled={Boolean($userWallet.accountId)}
						on:click={modal.open}
						class={`${
							$userWallet.accountId ? 'bg-gray-400' : 'bg-black'
						} text-white w-full rounded-full p-4 text-xl font-bold my-8`}
					>
						{#if $userWallet.accountId}
							Done
						{:else}
							Set account
						{/if}
					</button>
				</li>
				<li>
					<h3>Set amount for transfer:</h3>
					<p class="my-8">
						Hedera USD Value:
						<span class="text-2xl block mt-4 text-gray-500">
							{usdValue} USD
						</span>
						<span class="mt-4 block">Available Funds:</span>
						<span class="text-2xl block mt-4">{$userWallet.balance}</span>
					</p>
					<label for="transfer">
						<p>Amount of Hbars to transfer:</p>
						<div class="flex flex-row flex-nowrap">
							<input
								bind:value={transferAmount}
								class="border-b border-gray-400 border-solid w-full mt-4 p-1 text-3xl"
								placeholder="1.25 (Hbars to transfer)"
								type="number"
								max={parseFloat(`${$userWallet.balance}`)}
								min="0.00"
								step="0.1"
								name="transfer"
								id="transfer"
							/>
							<button
								class="p-4 text-2xl font-bold w-max flex-shrink-0"
								type="button"
								on:click={() => (transferAmount = parseFloat(`${$userWallet.balance}`))}
							>
								Add Max
							</button>
						</div>
					</label>
				</li>
				<li>
					<h3>Verify amount and transfer:</h3>
					<p class="mt-6">
						Total value in USD:
						<span class="block text-5xl my-5">
							$ {transferAmount ? roundNumber(parseFloat(`${transferAmount}`) * usdValue) : '0.00'}
						</span>
					</p>
					<button
						disabled={!(
							parseFloat(`${$userWallet.balance}`) > 0 && parseFloat(`${transferAmount}`) > 0
						)}
						on:click={handleTransfer}
						class={`${
							parseFloat(`${$userWallet.balance}`) > 0 && parseFloat(`${transferAmount}`) > 0
								? 'bg-black'
								: 'bg-gray-400'
						} text-white w-full rounded-full p-4 text-xl font-bold my-8`}
					>
						{#if parseFloat(`${$userWallet.balance}`) > 0 && parseFloat(`${transferAmount}`) > 0}
							Transfer
						{:else}
							No amount added
						{/if}
					</button>
				</li>
			</ol>
		</section>
	</article>
	<Modal>
		<HrHeader slot="header" header="Set account" />
		<UserWalletForm slot="content" />
	</Modal>
</main>

<script lang="ts">
	import Modal from '../ui/modal/Modal.svelte';
	import { modalStore } from '../stores/modalStore';

	const store = modalStore(true);
	const { open } = store;
</script>

<main class="min-h-screen">
	<header class="bg-black text-white p-6">
		<div class="p-6">
			<span class="">
				<a href="/" class="flex flex-row flex-nowrap items-center text-gray-300">
					<svg
						height="1rem"
						class="fill-current flex-initial"
						focusable="false"
						viewBox="0 0 24 24"
						aria-hidden="true"><path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" /></svg
					>
					<span class="flex-auto font-medium capitalize"> Back to my collection </span>
				</a>
			</span>
			<h2 class="mt-8">My wallet</h2>
		</div>
	</header>
	<div class="grid grid-cols-1 md-lg:grid-cols-30-70">
		<section class="p-6">
			<header>
				<h3>Total Balance</h3>
				<div class="border-solid border-b-2 border-gray-400 w-full -mt-2px relative -z-1" />
			</header>
			<section>
				<div>
					<span class="text-5xl font-medium block my-6">$0.00</span>
					<span class="font-bold block text-gray-400">Available:</span>
					<span class="font-medium">$0.00</span>
					<span class="text-gray-400 text-sm font-medium">(Excludes pending transactions)</span>
					<button
						on:click={open}
						class="bg-black text-white w-full rounded-full p-4 text-xl font-bold my-8"
						>Deposit</button
					>
					<hr />
				</div>
				<div class="mt-6">
					<span class="capitalize">Account verification status:</span>
					<div class="mt-4 pl-2 flex flex-row flex-nowrap items-center text-gray-400">
						<svg
							class="fill-current flex-intial"
							width="24"
							height="24"
							focusable="false"
							viewBox="0 0 24 24"
							aria-hidden="true"
							data-tip="true"
						>
							<path
								d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"
							/>
						</svg>
						<span class="flex-auto ml-3">Verified</span>
					</div>
				</div>
			</section>
		</section>
		<section class="p-6">
			<header>
				<h3>Latest Transactions</h3>
				<div class="border-solid border-b-2 border-gray-400 w-full -mt-2px relative -z-1" />
			</header>
			<section class="mt-12 mb-6">
				<span>No transactions yet</span>
			</section>
		</section>
	</div>
	<Modal>
		<div slot="header">Test</div>
		<div slot="content">Content</div>
	</Modal>
</main>

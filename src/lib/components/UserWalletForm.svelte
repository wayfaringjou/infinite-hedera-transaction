<script lang="ts">
	import { userWallet, modal } from '../../stores/stores';
	let userAccountId = '';
	let userPrivateKey = '';
	let loading = false;
	let connectSelected = false;
	let createSelected = false;
	let errorMsg = '';

	export async function getAccountInfo(
		account: string
	): Promise<{
		data?: {
			error: string | null;
			data: { id: string; pubKey: string; balance: number } | null;
		};
		status?: number;
		error?: Error;
	}> {
		const url = `/api/accountinfo.json?account=${account}`;
		const res = await fetch(url);

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

	export async function getNew(): Promise<{
		data?: {
			error: string | null;
			data: {
				newAccountId: string;
				newAccountPublicKey: string;
				newAccountPrivateKey: string;
				newAccountBalance: number;
			} | null;
		};
		status?: number;
		error?: Error;
	}> {
		const url = `/api/generatenew`;
		const res = await fetch(url);

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

	const handleSubmit = async () => {
		try {
			loading = true;
			connectSelected = true;
			const {
				data: { data, error }
			} = await getAccountInfo(userAccountId);

			if (error) throw new Error(error);

			if (!data) throw new Error('There was a problem connecting wallet. Try again later.');

			$userWallet = {
				accountId: data.id,
				publicKey: data.pubKey,
				privateKey: userPrivateKey,
				balance: data.balance
			};
			loading = false;
			modal.close();
		} catch (error) {
			console.error(error);
			errorMsg = error.message;
			connectSelected = false;
			loading = false;
		}
	};

	const handleGenerate = async () => {
		try {
			loading = true;
			createSelected = true;
			const {
				data: { data, error }
			} = await getNew();

			if (error) throw new Error(error);

			if (!data) throw new Error('There was a problem generating account. Try again later.');

			$userWallet = {
				accountId: data.newAccountId,
				publicKey: data.newAccountPublicKey,
				privateKey: data.newAccountPrivateKey,
				balance: data.newAccountBalance
			};
			loading = false;
			modal.close();
		} catch (error) {
			console.error(error);
			errorMsg = error.message;
			createSelected = false;
			loading = false;
		}
	};
</script>

<form class="p-4" on:submit|preventDefault={handleSubmit}>
	<fieldset class="space-y-6 text-lg">
		<legend class="text-gray-400">Enter your account id and private key:</legend>
		<p class="bg-gray-200 p-5 text-center rounded-full w-full">
			Selected Network: <span class="font-bold">Test</span>
		</p>
		<div class="w-full">
			<label for="accountid">
				<p>Account Id:</p>
				<input
					class="border-b border-gray-400 border-solid w-full mt-4 p-1"
					name="accountid"
					placeholder="0.0.1234 (Account Id)"
					type="text"
					required
					bind:value={userAccountId}
				/>
			</label>
		</div>
		<div class="w-full">
			<label for="privatekey" class="block w-full">
				<p>Private key:</p>
				<input
					class="border-b border-gray-400 border-solid w-full mt-4 p-1"
					name="privatekey"
					placeholder="Private Key"
					type="text"
					required
					pattern={`^[a-zA-Z0-9]{96}$`}
					bind:value={userPrivateKey}
				/>
				{#if userPrivateKey.length > 0 && userPrivateKey.length < 96}
					<span>Invalid key length.</span>
				{/if}
			</label>
		</div>
		{#if errorMsg}
			<span class="text-center block text-red-500 text-xl font-bold"
				>There was an error, check console for more details.</span
			>
		{/if}
		<div class="flex flex-col flex-nowrap w-full">
			{#if !createSelected}
				<button
					type="submit"
					disabled={loading}
					class={`text-white p-4 rounded-full w-full flex-auto text-base sm:text-xl font-bold my-5 ${
						loading ? 'bg-gray-300' : 'bg-black'
					}`}
				>
					{#if loading}
						<svg
							class="animate-spin text-white m-auto"
							width="30px"
							height="30px"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							/>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
					{:else}
						Connect
					{/if}
				</button>
			{/if}
			{#if !connectSelected}
				<button
					type="button"
					on:click={handleGenerate}
					class="p-4 text-base font-bold my-5 flex-auto"
				>
					{#if loading}
						<svg
							class="animate-spin text-black m-auto"
							width="30px"
							height="30px"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							/>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
					{:else}
						Generate demo account
					{/if}
				</button>
			{/if}
		</div>
	</fieldset>
</form>

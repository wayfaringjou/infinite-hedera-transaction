<script>
	let userAccountId = '';
	let userPrivateKey = '';
</script>

<form class="p-4" on:submit>
	<fieldset class="space-y-6 text-lg">
		<legend class="text-gray-400">Enter your account id and private key:</legend>
		<p class="bg-gray-200 p-5 text-center rounded-full">
			Selected Network: <span class="font-bold">Test</span>
		</p>
		<div>
			<label for="accountid">
				<p>Account Id:</p>
				<input
					class="border-b border-gray-400 border-solid w-full mt-4 p-1"
					name="accountid"
					placeholder="0.0.1234 (Account Id)"
					type="text"
					bind:value={userAccountId}
				/>
			</label>
		</div>
		<div>
			<label for="privatekey">
				<p>Private key:</p>
				<input
					class="border-b border-gray-400 border-solid w-full mt-4 p-1"
					name="privatekey"
					placeholder="Private Key"
					type="text"
					bind:value={userPrivateKey}
				/>
			</label>
		</div>
		<div class="flex flex-row flex-nowrap">
			<button
				type="submit"
				class="bg-black text-white w-full rounded-full p-6 text-xl font-bold my-8">Connect</button
			>
			<button class="p-4 text-base font-bold my-8 w-max flex-auto flex-shrink-0"
				>Generate test account</button
			>
		</div>
	</fieldset>
</form>

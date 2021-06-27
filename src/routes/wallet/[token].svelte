<script context="module">
	export async function load({ page, fetch, query }) {
		const url = `/api/${page.params.token}.json?test=test`;
		const res = await fetch(url);
		console.log(page.query);
		if (res.ok) {
			return {
				props: {
					data: await res.json()
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
	export let data;
	let userAccountId = '';
	let userPrivateKey = '';
	console.log(data);
</script>

<main>
	<form>
		<fieldset>
			<legend> Connect your wallet </legend>
			<label for="accountid">
				<p>Account Id:</p>
				<input name="accountid" type="text" bind:value={userAccountId} />
			</label>
			<label for="privatekey">
				<p>Private key:</p>
				<input name="privatekey" type="text" bind:value={userPrivateKey} />
			</label>
		</fieldset>
	</form>
</main>

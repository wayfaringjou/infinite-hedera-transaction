import { variables } from '$lib/variables';
import type { EndpointOutput } from '@sveltejs/kit';

const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
const query = '?id=4642&convert=USD';
const requestOptions = {
	method: 'GET',
	headers: new Headers({
		'X-CMC_PRO_API_KEY': variables.coinMarketCapKey as string,
		Accept: 'application/json'
	})
};

const fetchData = async (url, options) => {
	const res = await fetch(url, options);
	const data = await res.json();
	return data;
};

export async function get(): Promise<EndpointOutput> {
	return {
		body: {
			hbarData: await fetchData(`${url}${query}`, requestOptions)
		}
	};
}

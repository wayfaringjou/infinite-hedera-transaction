import hederaOperator from '$lib/utils/hederaOperations';
import type { EndpointOutput } from '@sveltejs/kit';

hederaOperator.set();

export async function get(): Promise<EndpointOutput> {
	return {
		body: {
			newUser: await hederaOperator.createAccount()
		}
	};
}

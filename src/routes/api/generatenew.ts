import hederaOperator from '$lib/utils/hederaOperations';
import type { EndpointOutput } from '@sveltejs/kit';

export async function get(): Promise<EndpointOutput> {
	let response: {
		error: Error | string | null;
		data: { newAccountId: string; newAccountPrivateKey: string; newAccountBalance: number } | null;
	};

	try {
		response = await hederaOperator.createAccount();
		if (response.error instanceof Error) throw response.error;
	} catch (error) {
		response.error = error.message;
	}
	const body = JSON.stringify(response);
	return { body };
}

import hederaOperator from '$lib/utils/hederaOperations';
import type { EndpointOutput, Request } from '@sveltejs/kit';

export async function get({ query }: Request): Promise<EndpointOutput | Error> {
	const account = query.get('account');
	let response: {
		error: Error | string | null;
		data: { id: string; privKey: string; balance: number } | null;
	};

	try {
		response = await hederaOperator.accountInfo(account);
		if (response.error instanceof Error) throw response.error;
	} catch (error) {
		response.error = error.message;
	}

	const body = JSON.stringify(response);
	console.log(body);
	return { body };
}

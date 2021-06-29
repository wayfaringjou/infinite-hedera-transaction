import hederaOperator from '$lib/utils/hederaOperations';
import type { EndpointOutput, Request } from '@sveltejs/kit';

export async function get({ query }: Request): Promise<EndpointOutput | Error> {
	const account = query.get('account');
	let response: {
		error: Error | string | null;
		data: { id: string; pubKey: string; balance: number } | null;
	} = {
		error: null,
		data: null
	};
	try {
		response = await hederaOperator.accountInfo(account);
		if (response.error instanceof Error) throw response.error;
	} catch (error) {
		response.error = error.message;
	}

	const body = JSON.stringify(response);
	return { body };
}

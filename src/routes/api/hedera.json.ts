import hederaOperator from '$lib/utils/hederaOperations';
import { variables } from '$lib/variables';
import type { EndpointOutput } from '@sveltejs/kit';
import type { JSONValue } from '@sveltejs/kit/types/endpoint';

hederaOperator.set();

export async function get(): Promise<EndpointOutput> {
	return {
		body: {
			// operatorBalance: (
			//	await hederaOperator.checkBalance(variables.hederaAccountId as string)
			//).hbars.toString(),
			operatorInfo: await hederaOperator.AccountInfo(variables.hederaAccountId as string)
		}
	};
}

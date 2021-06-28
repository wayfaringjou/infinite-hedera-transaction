import hederaOperator from '$lib/utils/hederaOperations';
import type { EndpointOutput } from '@sveltejs/kit';

hederaOperator.set();

export async function get({ query }): Promise<EndpointOutput> {
	console.log(query.get('account'));
	return {
		body: {
			// operatorBalance: (
			//	await hederaOperator.checkBalance(variables.hederaAccountId as string)
			//).hbars.toString(),
			accountInfo: await hederaOperator.accountInfo(query.get('account')),
			accountBalance: (await hederaOperator.checkBalance(query.get('account'))).hbars.toString()
			// newAccount: await hederaOperator.createAccount()
		}
	};
}

import hederaOperator from '$lib/utils/hederaOperations';
import { variables } from '$lib/variables';
import type { EndpointOutput } from '@sveltejs/kit';

hederaOperator.set();

export async function get(): Promise<EndpointOutput> {
	return {
		body: {
			// operatorBalance: (
			//	await hederaOperator.checkBalance(variables.hederaAccountId as string)
			//).hbars.toString(),
			//newUserInfo: (await hederaOperator.accountInfo('0.0.2010324-ngync')).accountId,
			//newUserBalance: (await hederaOperator.checkBalance('0.0.2010324-ngync')).hbars.toString()
			// newAccount: await hederaOperator.createAccount()
		}
	};
}

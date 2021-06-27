import hederaOperator from '$lib/utils/hederaOperations';
import { variables } from '$lib/variables';

hederaOperator.set();

export async function get({ page, params, query }) {
	console.log(query);
	return {
		body: {
			operatorBalance: await (
				await hederaOperator.checkBalance(variables.hederaAccountId as string)
			).hbars.toString(),
			//test: params
		}
	};
}

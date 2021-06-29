import hederaOperator from '$lib/utils/hederaOperations';
import type { TransactionReceipt } from '@hashgraph/sdk';
import type { EndpointOutput } from '@sveltejs/kit';

export async function post(request: {
	body: { sender: string; transferedHbars: number };
}): Promise<EndpointOutput> {
	//console.log(request.body.transfer);
	const { sender, transferedHbars } = request.body;

	let response: {
		error: Error | string | null;
		data: TransactionReceipt | null;
	};

	try {
		response = await hederaOperator.transferHbar(sender, transferedHbars);
		if (response.error instanceof Error) throw response.error;
	} catch (error) {
		response.error = error.message;
	}
	const body = JSON.stringify(response);
	console.log(body);
	return { body };
}

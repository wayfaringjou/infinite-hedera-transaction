import hederaOperator from '$lib/utils/hederaOperations';
import type { TransactionReceipt } from '@hashgraph/sdk';
import type { EndpointOutput } from '@sveltejs/kit';

export async function post(request: {
	body: { sender: string; senderKey: string; transferedHbars: number };
}): Promise<EndpointOutput> {
	const { sender, senderKey, transferedHbars } = request.body;
	let response: {
		error: Error | string | null;
		data: { transferReceipt: TransactionReceipt; txStatus: string } | null;
	} = {
		error: null,
		data: null
	};
	try {
		response = await hederaOperator.transferHbar(sender, senderKey, transferedHbars);
		if (response.error instanceof Error) throw response.error;
	} catch (error) {
		response.error = error.message;
	}
	const body = JSON.stringify(response);
	return { body };
}

import hederaOperator from '$lib/utils/hederaOperations';
import type { EndpointOutput } from '@sveltejs/kit';

hederaOperator.set();

export async function post(request): Promise<EndpointOutput> {
	console.log(request.body);
	return {
		body: request.body
	};
}

import { writable } from 'svelte/store';

type userFunds = {
	balance: string | number;
};

export const createUserFunds = (initial: userFunds) => {
	const { subscribe, set, update } = writable<userFunds>(initial);
	return {
		subscribe,
		set,
		update
	};
};

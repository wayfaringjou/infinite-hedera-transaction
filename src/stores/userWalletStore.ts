import { writable } from 'svelte/store';

type userWallet = {
	accountId: string;
	privateKey: string;
	balance: string | number;
};

export const createUserWallet = (initial: userWallet) => {
	const { subscribe, set, update } = writable<userWallet>(initial);
	return {
		subscribe,
		set,
    update
	};
};

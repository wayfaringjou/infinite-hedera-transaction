import { writable } from 'svelte/store';

type userWallet = {
	accountId: string;
	privateKey: string;
};

export const createUserWallet = (initial: userWallet) => {
	const { subscribe, set, update } = writable<userWallet>(initial);
	return {
		subscribe,
		setAccount: (accountId: string) => update((state) => ({ accountId, ...state })),
		setPrivateKey: (privateKey: string) => update((state) => ({ privateKey, ...state }))
	};
};

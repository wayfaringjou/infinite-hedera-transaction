import { writable } from 'svelte/store';

export const createModal = (initial: boolean) => {
	const isOpen = writable<boolean>(initial);
	const { subscribe, set, update } = isOpen;
	return {
		subscribe,
		isOpen,
		open: () => set(true),
		close: () => set(false),
		toggle: () => update((state) => !state)
	};
};


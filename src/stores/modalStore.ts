import type { subscribe } from 'svelte/internal';
import { Writable, writable } from 'svelte/store';

interface modalStoreType {
	subscribe: typeof subscribe, 
	isOpen: Writable<boolean>;
	open: () => void;
	close: () => void;
	toggle: () => void;
}

const createModal = (initial: boolean) => {
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

export const modal = createModal(false);
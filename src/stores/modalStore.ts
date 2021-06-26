import { Writable, writable } from 'svelte/store';

interface modalStoreType {
	isOpen: Writable<boolean>;
	open: () => void;
	close: () => void;
	toggle: () => void;
}

export const modalStore = (initial: boolean): modalStoreType => {
	const isOpen = writable<boolean>(initial);
	const { set, update } = isOpen;
	return {
		isOpen,
		open: () => set(true),
		close: () => set(false),
		toggle: () => update((state) => !state)
	};
};

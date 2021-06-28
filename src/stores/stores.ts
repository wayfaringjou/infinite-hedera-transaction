import { createModal } from './modalStore';
import { createUserWallet } from './userWalletStore';

export const modal = createModal(false);

export const userWallet = createUserWallet({
	accountId: '',
	privateKey: '',
  balance: 0
});

import { createModal } from './modalStore';
import { createUserWallet } from './userWalletStore';
import { createUserFunds } from './userFundsStore';
export const modal = createModal(false);

export const userWallet = createUserWallet({
	accountId: '',
	privateKey: '',
	publicKey: '',
	balance: 0
});

export const userFunds = createUserFunds({
	balance: 0.00
});

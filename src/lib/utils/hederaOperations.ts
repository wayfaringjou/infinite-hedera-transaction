import { variables } from '$lib/variables';
import {
	Client,
	AccountId,
	PrivateKey,
	AccountBalanceQuery,
	TransferTransaction,
	Hbar,
	HbarUnit,
	AccountInfoQuery,
	Mnemonic,
	AccountCreateTransaction,
	AccountInfo
} from '@hashgraph/sdk';

// Configure client
// const operatorKey = PrivateKey.fromString(variables.hederaPrivateKey as string);
// const operatorID = AccountId.fromString(variables.hederaAccountId as string);
// const client = Client.forTestnet();
// client.setOperator(operatorID, operatorKey);

const createOperator = (account: string, privateKey: string | null = null) => ({
	operatorId: AccountId.fromString(account),
	operatorKey: PrivateKey.fromString(privateKey),
	client: Client.forTestnet(),
	set() {
		this.client.setOperator(this.operatorId, this.operatorKey);
	},
	async checkBalance(accountId: string): Promise<number | Error> {
		this.client.setOperator(this.operatorId, this.operatorKey);
		let response: null | Error | number = null;
		try {
			const balance = await new AccountBalanceQuery().setAccountId(accountId).execute(this.client);
			if (!balance) throw new Error('Got bad balance response');
			response = parseFloat(balance.hbars.toString());
		} catch (error) {
			response = error;
		}
		return response;
	},
	async transferHbar(senderId: string, receiverId: string, transferedHbars: number) {
		const transferResponse = await new TransferTransaction()
			.addHbarTransfer(senderId, Hbar.from(-1 * transferedHbars, HbarUnit.Hbar)) //Sending account
			.addHbarTransfer(receiverId, Hbar.from(transferedHbars, HbarUnit.Hbar)) //Receiving account
			.execute(this.client);
		const transferReceipt = await transferResponse.getReceipt(this.client);
		return transferReceipt;
	},
	async createAccount() {
		const newAccountPrivateKey = await PrivateKey.generate();
		const newAccountPublicKey = newAccountPrivateKey.publicKey;
		const transaction = new AccountCreateTransaction()
			.setKey(newAccountPublicKey)
			.setInitialBalance(new Hbar(1000));

		const txResponse = await transaction.execute(this.client);

		const receipt = await txResponse.getReceipt(this.client);
		const newAccountId = receipt.accountId.toString();
		const newAccountBalance = await this.checkBalance(newAccountId);
		return {
			newAccountId,
			newAccountPrivateKey: newAccountPrivateKey.toString(),
			newAccountBalance
		};
	},
	async accountInfo(
		accountId: string
	): Promise<{ error: Error | null; data: { id: string; privKey: string; balance: number } | null }> {
		this.client.setOperator(this.operatorId, this.operatorKey);

		const query = new AccountInfoQuery().setAccountId(accountId);
		const response = {
			error: <Error | null>null,
			data: <{ id: string; privKey: string, balance: number } | null>null
		};

		try {
			const accountInfo = await query.execute(this.client);
			if (!(accountInfo instanceof AccountInfo)) throw new Error('Got bad account info response');
			const id = accountInfo.accountId.toString();
			const privKey = `${accountInfo.key}`;
			const balance = parseFloat(accountInfo.balance.toString());

			response.data = { id, privKey, balance };
		} catch (error) {
			response.error = error;
		}
		return response;
	},
	async generateMnemonic() {
		const mnemonic = await Mnemonic.generate();
		return mnemonic;
	},
	async recoverFromMnemonic(mnemonicStr: string) {
		const recoveredMnemonic = await Mnemonic.fromString(mnemonicStr);
		const privateKey = await recoveredMnemonic.toPrivateKey();

		return privateKey;
	}
});

export default createOperator(
	variables.hederaAccountId as string,
	variables.hederaPrivateKey as string
);

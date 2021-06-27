import { variables } from '$lib/variables';
import {
	Client,
	AccountId,
	PrivateKey,
	AccountBalanceQuery,
	TransferTransaction,
	Hbar,
	HbarUnit,
	AccountInfoQuery
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
	async checkBalance(accountId: string) {
		const balance = await new AccountBalanceQuery().setAccountId(accountId).execute(this.client);
		return balance;
	},
	async transferHbar(senderId: string, receiverId: string, transferedHbars: number) {
		const transferResponse = await new TransferTransaction()
			.addHbarTransfer(senderId, Hbar.from(-1 * transferedHbars, HbarUnit.Hbar)) //Sending account
			.addHbarTransfer(receiverId, Hbar.from(transferedHbars, HbarUnit.Hbar)) //Receiving account
			.execute(this.client);
		const transferReceipt = await transferResponse.getReceipt(this.client);
		return transferReceipt;
	},
	async AccountInfo(accountId: string) {
		const query = new AccountInfoQuery().setAccountId(accountId);
		const accountInfo = await query.execute(this.client);
		return accountInfo;
	}
});

export default createOperator(
	variables.hederaAccountId as string,
	variables.hederaPrivateKey as string
);

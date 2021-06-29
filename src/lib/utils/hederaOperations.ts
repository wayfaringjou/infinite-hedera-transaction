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
	AccountInfo,
	TransactionReceipt
} from '@hashgraph/sdk';

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const createOperator = (account: string, privateKey: string | null = null) => ({
	operatorId: AccountId.fromString(account),
	operatorIdStr: account,
	operatorKey: PrivateKey.fromString(privateKey),
	client: Client.forTestnet(),
	set() {
		this.client.setOperator(this.operatorId, this.operatorKey);
	},
	retryOnStreamErr(maxRetries: number, fn) {
		return fn().catch(async (err: Error) => {
			if (
				maxRetries <= 0 ||
				err.message.includes('UNAVAILABLE') ||
				!err.message.includes('RST_STREAM')
			) {
				throw err;
			}
			await sleep(2000);
			return this.retryOnStreamErr(maxRetries - 1, fn);
		});
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
	async transferHbar(
		senderId: string,
		senderPrivKey: string,
		transferedHbars: number
	): Promise<{
		error: Error | null;
		data: { transferReceipt: TransactionReceipt; txStatus: string } | null;
	}> {
		// this.client.setOperator(this.operatorId, this.operatorKey);
		const clientId = AccountId.fromString(senderId);
		const clientPrivKey = PrivateKey.fromString(senderPrivKey);

		const userclient = Client.forTestnet();
		userclient.setOperator(clientId, clientPrivKey);

		const response = {
			error: <Error | null>null,
			data: <{ transferReceipt: TransactionReceipt; txStatus: string } | null>null
		};
		try {
			const transferReceipt = await this.retryOnStreamErr(3, async () => {
				const transferResponse = await new TransferTransaction()
					.addHbarTransfer(senderId, Hbar.from(-1 * transferedHbars, HbarUnit.Hbar)) //Sending account
					.addHbarTransfer(this.operatorIdStr, Hbar.from(transferedHbars, HbarUnit.Hbar)) //Receiving account
					.execute(userclient);

				const receipt = await transferResponse.getReceipt(userclient);
				return receipt;
			});

			if (!(transferReceipt instanceof TransactionReceipt))
				throw new Error('Got bad receipt response');

			response.data = { transferReceipt, txStatus: transferReceipt.status.toString() };
		} catch (error) {
			response.error = error;
		}
		return response;
	},
	async createAccount(): Promise<{
		error: Error | null;
		data: {
			newAccountId: string;
			newAccountPrivateKey: string;
			newAccountPublicKey: string;
			newAccountBalance: number;
		} | null;
	}> {
		const newAccountPrivateKey = await PrivateKey.generate();
		const newAccountPublicKey = newAccountPrivateKey.publicKey;

		const response = {
			error: <Error | null>null,
			data: <
				{
					newAccountId: string;
					newAccountPrivateKey: string;
					newAccountPublicKey: string;
					newAccountBalance: number;
				} | null
			>null
		};
		try {
			const newAccountData = await this.retryOnStreamErr(3, async () => {
				const transaction = new AccountCreateTransaction()
					.setKey(newAccountPublicKey)
					.setInitialBalance(new Hbar(1));

				const txResponse = await transaction.execute(this.client);

				const receipt = await txResponse.getReceipt(this.client);
				const newAccountId = receipt.accountId.toString();
				const newAccountBalance = await this.checkBalance(newAccountId);
				return {
					newAccountId,
					newAccountPrivateKey: newAccountPrivateKey.toString(),
					newAccountPublicKey,
					newAccountBalance
				};
			});
			response.data = newAccountData;
		} catch (error) {
			response.error = error;
		}
		return response;
	},
	async accountInfo(
		accountId: string
	): Promise<{
		error: Error | null;
		data: { id: string; pubKey: string; balance: number } | null;
	}> {
		this.client.setOperator(this.operatorId, this.operatorKey);

		const response = {
			error: <Error | null>null,
			data: <{ id: string; pubKey: string; balance: number } | null>null
		};

		try {
			const accountInfo = await this.retryOnStreamErr(3, () => {
				const query = new AccountInfoQuery().setAccountId(accountId);
				return query.execute(this.client);
			});

			if (!(accountInfo instanceof AccountInfo)) throw new Error('Got bad account info response');

			const id = accountInfo.accountId.toString();
			const pubKey = `${accountInfo.key}`;
			const balance = parseFloat(accountInfo.balance.toString());

			response.data = { id, pubKey, balance };
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

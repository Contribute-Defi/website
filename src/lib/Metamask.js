export class Metamask {
	constructor(ethereum) {
		this.ethereum = ethereum;
	}

	/**
	 * Handle chain (network) and chainChanged, per EIP 1193
	 */
	handleChainChanged(chainId) {
		if (this._currentChainId !== chainId) {
			this._currentChainId = chainId;
			// Run any other necessary logic...
		}
	}

	// For now, 'eth_accounts' will continue to always return an array
	handleAccountsChanged(accounts) {
		if (accounts.length === 0) {
			// MetaMask is locked or the user has not connected any accounts
			throw new Error('Please connect to MetaMask.');
		} else if (accounts[0] !== this._currentAccount) {
			[this._currentAccount] = accounts;
			// Run any other necessary logic...
		}
	}

	async init() {
		const { ethereum } = this;
		if (!ethereum || !ethereum.isMetaMask) {
			console.log('Please install MetaMask.');
			throw new Error('Please install MetaMask.');
		}

		try {
			const chainId = await ethereum.send('eth_chainId');
			this.handleChainChanged(chainId);
			const accounts = await ethereum.send('eth_accounts');
			this.handleAccountsChanged(accounts);
		} catch (err) {
			// In the future, maybe in 2020, this will return a 4100 error if
			// the user has yet to connect
			if (err.code === 4100) {
				// EIP 1193 unauthorized error
				throw new Error('Please connect to MetaMask.');
			}
		}

		ethereum.on('chainChanged', chainId => this.handleChainChanged(chainId));
		// Note that this event is emitted on page load.
		// If the array of accounts is non-empty, you're already
		// connected.
		ethereum.on('accountsChanged', accounts => this.handleAccountsChanged(accounts));
	}

	async connect() {
		console.log('metamask connect');
		// This is equivalent to ethereum.enable()
		try {
			const accounts = await this.ethereum.send('eth_requestAccounts');
			this.handleAccountsChanged(accounts);
		} catch (err) {
			if (err.code === 4001) {
				// EIP 1193 userRejectedRequest error
				throw new Error('Please connect to MetaMask.');
			}
		}
	}

	async initAndConnect(silent = false) {
		try {
			await this.init();
			if (!silent) {
				await this.connect();
			}
		} catch (err) {
			console.log(err);
			if (!silent) {
				throw err;
			}
		}
		return this.ethereum;
	}

	get currentChainId() {
		return this._currentChainId;
	}

	get currentAccount() {
		return this._currentAccount;
	}

	get connected() {
		return this._currentAccount !== undefined;
	}
}

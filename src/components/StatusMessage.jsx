import React from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';


const networkTitle = id => {
	switch (id) {
	case 1: return 'Mainnet';
	case 42: return 'Kovan testnet';
	default: return 'Unknown network';
	}
};


const StatusMessage = () => (
	<DrizzleContext.Consumer>
		{drizzleContext => {
			const { drizzleState, drizzle, initialized } = drizzleContext;
			if (!initialized) {
				return (
					<div className="message">
						<h3>MetaMask is not connected</h3>
						<p>
							Make sure MetaMask is installed and you are logged in.
						</p>
					</div>
				);
			}
			if (drizzleState.web3.networkMismatch) {
				return (
					<div className="message">
						<h3>Network mismatch</h3>
						<p>Please switch your MetaMask to mainnet.</p>
					</div>
				);
			}
			const { web3 } = drizzleState;
			return (
				<div className="message">
					<h3>Wallet connected</h3>
					<p>
						You are successfully connected to
						{' '}
						{networkTitle(web3.networkId)}
						{' '}
						with
						{' '}
						{drizzle.web3.currentProvider.selectedAddress}
					</p>
				</div>
			);
		}}
	</DrizzleContext.Consumer>
);

export default StatusMessage;

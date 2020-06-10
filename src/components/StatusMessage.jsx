import React from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import { Container } from 'react-bootstrap';

const shortenAddress = address => `${address.substr(0, 8)}...${address.substr(address.length - 8)}`;

const StatusMessage = () => (
	<DrizzleContext.Consumer>
		{drizzleContext => {
			const { drizzleState, drizzle, initialized } = drizzleContext;
			if (!initialized) {
				return (
					<div className="message error">
						<strong>MetaMask is not connected.</strong>
						{' '}
						Make sure MetaMask is installed and you are logged in.
					</div>
				);
			}
			if (drizzleState.web3.networkMismatch) {
				return (
					<div className="message error">
						<h3>Network mismatch</h3>
						<p>Please switch your MetaMask to mainnet.</p>
					</div>
				);
			}
			return (
				<div className="message info">
					<Container>
						<strong>Wallet connected:</strong>
						{' '}
						{shortenAddress(drizzle.web3.currentProvider.selectedAddress)}
					</Container>
				</div>
			);
		}}
	</DrizzleContext.Consumer>
);

export default StatusMessage;

import React from 'react';
import { Container } from 'react-bootstrap';
import { EthersStatus, useEthers } from '../../app';
import { shortenAddress } from '../../lib';

export function StatusMessage() {
	const { connect, connected, address, error, status } = useEthers();

	console.log({ connected, address, error, status });

	if (status === EthersStatus.DISCONNECTED) {
		return (
			<div className="message error">
				<strong>MetaMask is not connected.</strong>{' '}
				<button type="button" className="btn btn-outline-light btn-sm ml-2" onClick={() => connect()}>
					connect now
				</button>
			</div>
		);
	}

	if (status === EthersStatus.WRONG_NETWORK) {
		return (
			<div className="message error">
				<h3>Network mismatch</h3>
				<p>Please switch your MetaMask to mainnet or kovan (for testing).</p>
			</div>
		);
	}
	if (!connected) {
		return (
			<div className="message error">
				<strong>MetaMask is not connected.</strong>{' '}
				{error || 'Make sure MetaMask is installed and you are logged in.'}
			</div>
		);
	}
	return (
		<div className="message info">
			<Container>
				<strong>Wallet connected:</strong> {shortenAddress(address)}
			</Container>
		</div>
	);
}

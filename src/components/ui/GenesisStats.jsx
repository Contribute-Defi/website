import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Row, Table } from 'react-bootstrap';
import { ethers } from 'ethers';

import { useEthers } from '../../app';
import { shortenAddress } from '../../lib';

const { formatEther } = ethers.utils;

export function GenesisStats({ genesis = false }) {
	const { address, connected, contracts, timestamp, onUpdate } = useEthers();
	const [share, setShare] = useState(0);
	const [mine, setMine] = useState();
	const [status, setStatus] = useState(null);

	useEffect(() => {
		if (contracts && address) {
			recountShare();
		}
	}, [contracts, timestamp, address]);

	const handleClaim = async () => {
		try {
			setStatus('progress');
			await contracts.genesis.claim();
			setStatus('success');
			onUpdate();
		} catch (err) {
			console.error(err);
			setStatus('error');
		}
	};

	const handleFinish = () => {
		setStatus(null);
		setShare(0);
	};

	const recountShare = async () => {
		const totalInvested = await contracts.genesis.totalTokenBalance();
		let total = 0,
			newMine = 0,
			newShare = 0;
		if (formatEther(totalInvested) > 0) {
			total = await contracts.genesis.totalTokenBalance();
			if (formatEther(total) > 0) {
				newMine = await contracts.genesis.getShare(address);
				newShare = newMine.mul(100000).div(total).toNumber() / 1000;
			}
		}

		setShare(Math.round(newShare * 100) / 100);
		setMine(Math.round(formatEther(newMine) * 100) / 100);
	};

	if (!connected || (!genesis && share === 0)) return null;

	return (
		<>
			<Row className="justify-content-center">
				<Col md="6">
					<Table striped hover variant="dark">
						<tbody>
							<tr>
								<td className="text-left">Connected account</td>
								<td className="text-right">
									<strong title={address}>{shortenAddress(address)}</strong>
								</td>
							</tr>
							<tr>
								<td className="text-left">Your Current Share</td>
								<td className="text-right">
									<strong>{share} %</strong>
								</td>
							</tr>
							<tr>
								<td className="text-left">You Will Receive</td>
								<td className="text-right">
									<strong>{mine} TRIB</strong>
								</td>
							</tr>
						</tbody>
					</Table>
					<Button disabled={genesis} variant="secondary" onClick={handleClaim}>
						Claim TRIB
					</Button>
				</Col>
			</Row>

			<Row className="justify-content-center mt-4">
				<Col md="8" lg="6">
					{status === 'error' ? (
						<Alert variant="danger" dismissible onClose={() => setStatus(null)}>
							Something went wrong. Check MetaMask for details.
						</Alert>
					) : null}

					{status === 'success' ? (
						<Alert variant="success" dismissible onClose={handleFinish}>
							Congratulations, you&apos;ve been tribbed!
						</Alert>
					) : null}

					{status === 'progress' ? (
						<Alert variant="info">Transaction in progress. Please confirm action on MetaMask.</Alert>
					) : null}
				</Col>
			</Row>
		</>
	);
}

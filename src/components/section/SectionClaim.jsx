import React, { useState, useEffect } from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { useContractValue, useEthers } from '../../app';
import { Statistic } from '../ui';
import { formatEther } from 'ethers/lib/utils';

export function SectionClaim() {
	const [status, setStatus] = useState(null);
	const [error, setError] = useState();
	const { connected, contracts } = useEthers();

	const interest = processInterest(useContractValue('getInterest'));

	if (!connected) return null;

	const handleClaim = async () => {
		setStatus(null);
		try {
			if ((await getInterest()) === 0) {
				setError('Cannot claim zero interest');
				return;
			}
			setStatus('progress');
			const tx = await contracts.contribute.claimInterest();
			await tx.wait();
			setStatus('success');
		} catch (err) {
			console.error(err);
			setError('Something went wrong. Check MetaMask for details.');
		}
	};

	function processInterest(x) {
		if (!x) return x;
		return parseFloat(formatEther(x));
	}

	async function getInterest() {
		return await contracts.contribute.getInterest();
	}

	return (
		<section className="section-mint-burn text-center">
			<h2 className="mb-3 mb-lg-4 text-uppercase">Claim Interest</h2>
			<Row className="justify-content-center mb-4 mb-lg-5">
				<Col md="10" lg="8">
					<p>
						<strong>This is where the magic happens!</strong>
						<br />
						Double your earnings by claiming the accumulated interest.
					</p>
					<p>
						You are eligible to claim the same TRIB dollar amount you sell to the contract.
						<br />A dollar worth of TRIB will get you approximately two dollars back.
					</p>
				</Col>
			</Row>

			<Row className="text-center justify-content-center">
				<Col md="6" lg="4">
					<Row>
						<Col md="6" className="float-md-left">
							<Statistic id="getInterest" />
						</Col>
						<Col md="6" className="mb-3 mb-md-0">
							<Button
								variant={status === 'progress' || interest === 0 ? 'dark' : 'secondary'}
								className="btn-large text-nowrap"
								onClick={() => handleClaim()}
								disabled={status === 'progress' || interest === 0}
							>
								Claim
								{status === 'progress' ? ' in progress' : null}
							</Button>
						</Col>
					</Row>
					<p className="mt-4 fs-xs">
						*Selling your TRIB automatically claims any interest you are eligible to receive from the pool.
					</p>
				</Col>
			</Row>

			<Row className="justify-content-center mt-4">
				<Col md="8" lg="6">
					{error ? (
						<Alert variant="danger" dismissible onClose={() => setError(undefined)}>
							{error}
						</Alert>
					) : status === 'success' ? (
						<Alert variant="success" dismissible onClose={() => setStatus(null)}>
							Congratulations, you&apos;ve been tribbed!
						</Alert>
					) : status === 'progress' ? (
						<Alert variant="info">Transaction in progress. Please confirm action on MetaMask.</Alert>
					) : null}
				</Col>
			</Row>
		</section>
	);
}

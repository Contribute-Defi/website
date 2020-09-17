import React, { useState } from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { useEthers } from '../../app';
import { Statistic } from '../ui';

export function SectionClaim() {
	const [status, setStatus] = useState(null);
	const { contracts } = useEthers();

	const handleClaim = async () => {
		setStatus(null);
		try {
			setStatus('progress');
			await contracts.contribute.claimInterest();
			setStatus('success');
		} catch (err) {
			console.error(err);
			setStatus('error');
		}
	};

	return (
		<section className="section-mint-burn text-center">
			<h2 className="mb-3 mb-lg-4 text-uppercase font-weight-bold">Claim INteresMint And Burn</h2>
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
								variant="secondary"
								className="btn-large text-nowrap"
								onClick={() => handleClaim()}
								disabled={status === 'progress'}
							>
								Claim
								{status === 'progress' ? ' in progress' : null}
							</Button>
						</Col>
					</Row>
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
						<Alert variant="success" dismissible onClose={() => setStatus(null)}>
							Transaction complete. Thank you for playing with us:)
						</Alert>
					) : null}

					{status === 'progress' ? (
						<Alert variant="info">Transaction in progress. Please confirm action on MetaMask.</Alert>
					) : null}
				</Col>
			</Row>
		</section>
	);
}

import React, { useState } from 'react';

import { Alert, Button, Col, Row } from 'react-bootstrap';

import { Statistic } from '../ui';

export function SectionMintBurn() {
	const [status, setStatus] = useState(null);

	const handlePump = async () => {
		setStatus(null);
		// const { Contribute } = drazzle.contracts;
		try {
			setStatus('progress');
			// await Contribute.methods.pump().send();
			setStatus('success');
		} catch (err) {
			setStatus('error');
		}
	};

	return (
		<section className="section-mint-burn text-center">
			<h2 className="mb-3 mb-lg-4 text-uppercase font-weight-bold">Mint And Burn</h2>
			<Row className="justify-content-center mb-4 mb-lg-5">
				<Col md="10" lg="8">
					<p>
						<strong>This is where the magic happens!</strong>
						<br />
						Accumulated interest is used to mint and burn TRIB tokens. This increases its price and
						locks
						additional DAI, which continuously generates interest for the protocol.
					</p>
				</Col>
			</Row>

			<Row className="text-center justify-content-center">
				<Col md="10" lg="7">
					<Row>
						<Col md="4" className="float-md-left">
							<Statistic id="availableToBurn" />
						</Col>
						<Col md="4" className="mb-3 mb-md-0">
							<Button variant="secondary" className="btn-large text-nowrap" onClick={() => handlePump()} disabled={status === 'progress'}>
								Mint And Burn
								{status === 'progress' ? ' in progress' : null}
							</Button>
						</Col>
						<Col md="4" className="float-md-right">
							<Statistic id="priceAfterBurn" />
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
							Transaction complete. Thank you for your contribution!
						</Alert>
					) : null}

					{status === 'progress' ? (
						<Alert variant="info">
							Transaction in progress. Please confirm action on MetaMask.
						</Alert>
					) : null}
				</Col>
			</Row>
		</section>
	);
}

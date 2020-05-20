import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

import Statistic from '../Statistic';

function SectionMintBurn() {
	return (
		<section className="section-mint-burn text-center">
			<h2 className="mb-3 mb-lg-4 text-uppercase font-weight-bold">Mint And Burn</h2>
			<Row className="justify-content-center mb-4 mb-lg-5">
				<Col md="10" lg="8">
					<p>
						<strong>This is where the magic happens!</strong>
						<br />
						Accumulated interest is used to mint and burn TRIB tokens. This increases its price and locks
						additional DAI, which continuously generates interest for the protocol.
					</p>
				</Col>
			</Row>

			<Row className="text-center justify-content-center">
				<Col md="10" lg="7">
					<Row>
						<Col md="4" className="float-md-left">
							<Statistic label="Available to burn" value={124.24} unit="DAI" />
						</Col>
						<Col md="4" className="mb-3 mb-md-0">
							<Button variant="secondary" className="btn-large text-nowrap">Mint And Burn</Button>
						</Col>
						<Col md="4" className="float-md-right">
							<Statistic label="Burning TRIB will increase its price to" value={0.13} unit="DAI" />
						</Col>
					</Row>
				</Col>
			</Row>
		</section>
	);
}

export default SectionMintBurn;

import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

function SectionHeader() {
	return (
		<section className="section-header p-3">
			<Row className="align-items-center">
				<Col>
					<h1>
						CON
						<strong>TRIB</strong>
						UTE
					</h1>
				</Col>
				<Col className="text-right">
					<Button>Connect Wallet</Button>
				</Col>
			</Row>
		</section>
	);
}

export default SectionHeader;

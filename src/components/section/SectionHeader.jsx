import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Logo } from '../ui';

export function SectionHeader() {
	return (
		<section className="section-header p-3">
			<Row className="align-items-center">
				<Col>
					<Logo />
				</Col>
				<Col className="text-right">
					<Button>Connect Wallet</Button>
				</Col>
			</Row>
		</section>
	);
}

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Logo } from './Logo';
import { Usp } from './Usp';

export function Hero() {
	return (
		<Container fluid="md" className="hero-hero">
			<Row className="justify-content-center text-center">
				<Col>
					<Logo />
					<Usp />
				</Col>
			</Row>
		</Container>
	);
}

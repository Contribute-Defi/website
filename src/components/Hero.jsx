import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Logo from './Logo';

export default function Hero() {
	return (
		<Container fluid="md" className="hero-hero">
			<Row className="justify-content-center text-center">
				<Col>
					<Logo />
					<p className="subtitle mb-5 mb-lg-6">
						A capital coordination tool that
						<br />
						pushes the boundaries of DeFi.
					</p>
					<div>
						<a className="btn btn-primary" href={process.env.WHITEPAPER_LINK} rel="noreferrer" target="_blank">Read the Whitepaper</a>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

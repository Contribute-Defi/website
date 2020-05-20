import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Logo from '../Logo';
import RowSimpleStats from '../RowSimpleStats';

function SectionHero() {
	return (
		<section className="section-hero">
			<div className="hero-hero">
				<Container fluid="md">
					<Row className="justify-content-center text-center">
						<Col lg="6" md="8">
							<Logo />
							<h2 className="mb-5 mb-lg-6">
								A capital coordination tool that pushes the boundaries of DeFi.
							</h2>
							<div className="mb-4 mb-lg-5">
								<Button className="fs-xl">Connect Wallet</Button>
							</div>
							<p>
								<Button variant="link" className="text-white pl-0 pr-0 fs-s">
									What is Contribute
								</Button>
							</p>
						</Col>
					</Row>
				</Container>
			</div>
			<div className="hero-stats">
				<Container fluid="md">
					<RowSimpleStats />
				</Container>
			</div>
		</section>
	);
}

export default SectionHero;

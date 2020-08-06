import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { Logo, Statistic } from '../ui';

export function SectionHero() {
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
							<p>
								<a href={process.env.WHITEPAPER_LINK} rel="noreferrer" target="_blank">
									What is	Contribute
								</a>
							</p>
						</Col>
					</Row>
				</Container>
			</div>
			<div className="hero-stats">
				<Container fluid="md">
					<Row className="text-center text-lg-left">
						<Col lg="3" sm="6" className="mb-4 mb-lg-0">
							<Statistic id="lockedContributions" />
						</Col>
						<Col lg="3" sm="6" className="mb-4 mb-lg-0">
							<Statistic id="continuousEarning" />
						</Col>
						<Col lg="3" sm="6" className="mb-4 mb-md-0">
							<Statistic id="interestRate" />
						</Col>
						<Col lg="3" sm="6">
							<Statistic id="interestPoolTotal" />
						</Col>
					</Row>
				</Container>
			</div>
		</section>
	);
}

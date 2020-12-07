import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { Logo, Statistic, CurrentApy, Usp } from '../ui';
import { useEthers } from '../../app';

export function SectionHero() {
	const { isGenesis } = useEthers();
	return (
		<section className="section-hero">
			<div className="hero-hero">
				<Container fluid="md">
					<Row className="justify-content-center text-center">
						<Col lg="6" md="8">
							<Logo />
							<Usp />
							<p>
								<a href={process.env.WHITEPAPER_LINK} rel="noreferrer" target="_blank">
									What is Contribute
								</a>
							</p>
						</Col>
					</Row>
				</Container>
			</div>
			{isGenesis !== undefined && (
				<div className="hero-stats">
					<Container fluid="md">
						<Row className="text-center text-lg-left">
							<Col lg="3" sm="6">
								<Statistic id="totalReserve" />
							</Col>
							<Col lg="3" sm="6" className="mb-4 mb-md-0">
								<CurrentApy />
							</Col>
							<Col lg="3" sm="6" className="mb-4 mb-lg-0">
								<Statistic id="totalInterestClaimed" />
							</Col>
							<Col lg="3" sm="6" className="mb-4 mb-lg-0">
								<Statistic id="totalContributed" />
							</Col>
						</Row>
					</Container>
				</div>
			)}
		</section>
	);
}

import React from 'react';

import { Countdown, Hero, Statistic } from '../ui';
import { Col, Container, Row } from 'react-bootstrap';
import { useEthers } from '../../app';

export function SectionHeroGenesis() {
	const { connected } = useEthers();
	return (
		<section className="section-hero text-center">
			<Hero />
			<h3>Genesis Mint Event ends in</h3>
			<div className="mb-6">
				<Countdown endDate={process.env.GENESIS_END} />
			</div>
			<div className="mb-3">
				<a className="btn btn-primary" href="#anchor-participate">
					Participate
				</a>
			</div>
			<div className="small">
				<a href={process.env.WHITEPAPER_LINK} rel="noreferrer" target="_blank">
					Read the Whitepaper
				</a>
			</div>

			{connected && (
				<div className="hero-stats mt-6">
					<Container fluid="md">
						<Row className="text-center text-lg-left">
							<Col lg="3" sm="6" className="mb-4 mb-lg-0">
								<Statistic id="totalReserve" />
							</Col>
							<Col lg="3" sm="6" className="mb-4 mb-lg-0">
								<Statistic id="getCurrentTokenPrice" />
							</Col>
							<Col lg="3" sm="6" className="mb-4 mb-md-0">
								<Statistic id="genesisAveragePrice" />
							</Col>
							<Col lg="3" sm="6">
								<Statistic id="getTotalSupply" />
							</Col>
						</Row>
					</Container>
				</div>
			)}
		</section>
	);
}

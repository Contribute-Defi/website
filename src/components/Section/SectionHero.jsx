import React from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';

import { Col, Container, Row } from 'react-bootstrap';
import Logo from '../Logo';
import Statistic from '../Statistic';

const networkTitle = id => {
	switch (id) {
	case 1: return 'Mainnet';
	case 42: return 'Kovan testnet';
	default: return 'Unknown network';
	}
};

const SectionHero = () => (
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
							<DrizzleContext.Consumer>
								{drizzleContext => {
									const { drizzleState, drizzle, initialized } = drizzleContext;
									if (!initialized) {
										return (
											<div className="message">
												<h3>MetaMask is not connected</h3>
												<p>
													Make sure MetaMask is installed and you are logged in.
												</p>
											</div>
										);
									}
									if (drizzleState.web3.networkMismatch) {
										return (
											<div className="message">
												<h3>Network mismatch</h3>
												<p>Please switch your MetaMask to mainnet.</p>
											</div>
										);
									}
									const { web3 } = drizzleState;
									return (
										<div className="message">
											<h3>Wallet connected</h3>
											<p>
												You are successfully connected to
												{' '}
												{networkTitle(web3.networkId)}
												{' '}
												with
												{' '}
												{drizzle.web3.currentProvider.selectedAddress}
											</p>
										</div>
									);
								}}
							</DrizzleContext.Consumer>
						</div>
						<p>
							<a href={process.env.WHITEPAPER_LINK} rel="noreferrer" target="_blank">What is Contribute</a>
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

export default SectionHero;

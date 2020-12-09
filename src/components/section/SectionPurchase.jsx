import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BuySell, GenesisStats } from '../ui';
import { LINKS } from '../../config/const';

export function SectionPurchase() {
	return (
		<section className="section-purchase bg-dark text-light text-center" id="anchor-participate">
			<Container>
				<Row className="justify-content-center text-center">
					<Col className="value-propositon">
						<h2 className="mb-5">
							The first autonomous interest-generating protocol.
							<br />
							Powered by You.
						</h2>
						<p className="mb-4">
							Welcome to the Contribute Ecosystem.
							<br />A protocol pushing the boundaries of capital coordination
							<br /> and a true Decentralized Autonomous Organisation.
						</p>
						<p className="mb-4">Join the Contribute DAO.</p>
						<h6 className="mb-0">
							<strong>Trade, Mine, Govern.</strong>
						</h6>
						<p className="mb-5">
							Learn more about it on <a href={LINKS.medium}>Medium</a>.
						</p>
						<hr className="mb-5" />
					</Col>
				</Row>
				<Row>
					<Col>
						<h2 className="text-uppercase mb-4 mb-md-5">
							Purchase <strong className="text-primary">TRIB</strong> tokens to participate
						</h2>
						<BuySell />
					</Col>
				</Row>
				<Row>
					<Col>
						<GenesisStats />
					</Col>
				</Row>
			</Container>
		</section>
	);
}

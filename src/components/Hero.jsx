import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import BuySell from './BuySell';

function Hero() {
	return (
		<section className="l-hero p-3">
			<Row>
				<Col>
					<h2>A Capital Coordination Tool That Pushes The Boundaries Of DeFi.</h2>
					<p>
						An autonomous interest-generating protocol powered by contributors all over the world! Early
						adopters are incentivized to bootstrap liquidity while late comers benefit from the contiuous
						interest being generated from the pool.
					</p>
					<p>
						<Button variant="link" className="pl-0 pr-0">How Contribute Works</Button>
					</p>
				</Col>
				<Col>
					<BuySell />
				</Col>
			</Row>
		</section>
	);
}

export default Hero;

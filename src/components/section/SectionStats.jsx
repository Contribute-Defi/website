import React from 'react';

import { Row, Col, Container } from 'react-bootstrap';

import { Bigstat } from '../ui';
import { useEthers } from '../../app';

export function SectionStats() {
	return (
		<section className="section-stats text-light">
			<Container>
				<h2 className="font-weight-light mb-5 text-center text-uppercase">Token Stats</h2>
				<Row>
					<Col md="6" className="pb-4">
						<Bigstat id="getCurrentTokenPrice">
							TRIB gets more expensive as the supply increases and cheaper as supply decreases.{' '}
							<strong>The contract provides infinite liquidity</strong> to users.
						</Bigstat>
					</Col>
					<Col md="6" className="pb-4">
						<Bigstat id="floor">
							Burned tokens can’t be sold back to the contract. This effectively creates a price floor{' '}
							<strong>which is constantly being raised</strong> every time tokens get burned.
						</Bigstat>
					</Col>
				</Row>
				<Row>
					<Col md="6" className="pb-4">
						<Bigstat id="getBurnedTokensAmount">
							Tokens are burned on every purchase and sale. Every time TRIB is burned the price floor is
							increased. TRIB’s price <strong>cannot go below the floor</strong>.
						</Bigstat>
					</Col>
					<Col md="6" className="pb-4">
						<Bigstat id="getTotalSupply">
							Price is a function of supply. The higher the supply the{' '}
							<strong>less amount of TRIB is needed</strong> to claim the accumulated interest.
						</Bigstat>
					</Col>
				</Row>
			</Container>
		</section>
	);
}

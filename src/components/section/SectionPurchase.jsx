import React from 'react';
import { Container } from 'react-bootstrap';
import { BuySell } from '../ui';

export function SectionPurchase() {
	return (
		<section className="section-purchase bg-dark text-light text-center" id="anchor-participate">
			<Container>
				<h2 className="mb-4">
					The first autonomous interest-generating protocol.
					<br />
					Powered by you.
				</h2>
				<p className="mb-5 mb-lg-6">
					Early adopters are incentivized to bootstrap liquidity.
					<br />
					Latecomers benefit from the contiuous interest generated from the lending pool.
				</p>

				<hr className="mb-4 mb-md-5" />

				<h2 className="text-uppercase mb-4 mb-md-5">
					Purchase
					{' '}
					<strong className="text-primary">TRIB</strong>
					{' '}
					tokens to participate
				</h2>

				<BuySell />
			</Container>
		</section>
	);
}

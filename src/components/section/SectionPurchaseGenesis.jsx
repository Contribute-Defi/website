import React from 'react';
import { Container } from 'react-bootstrap';
import { BuySell } from '../ui';

export function SectionPurchaseGenesis() {
	return (
		<section className="section-purchase bg-dark text-light text-center">
			<Container>
				<h2 className="text-uppercase mb-4 mb-md-5">
					Purchase
					{' '}
					<strong className="text-primary">TRIB</strong>
					{' '}
					tokens to participate
				</h2>

				<BuySell allowSell={false} />
			</Container>
		</section>
	);
}

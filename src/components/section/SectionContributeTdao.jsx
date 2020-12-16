import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BuySell, GenesisStats } from '../ui';

export function SectionContributeTdao() {
	return (
		<section className="section-purchase bg-dark text-light text-center" id="anchor-participate">
			<Container>
				<Row>
					<Col lg={{ span: 8, offset: 2 }}>
						<h2>
							All TRIB submitted to the event will match 5,000 TDAO tokens and both will be deposited to
							the TDAO/TRIB Uniswap Pool.
						</h2>
						<hr className="mt-5 mb-5 " />
					</Col>
				</Row>
				<h2 className="text-uppercase mb-4 mb-md-5">
					Contribute <strong>ETH</strong> or <strong className="text-primary">TRIB</strong> to participate
				</h2>
				<BuySell type="tdao" />
			</Container>
		</section>
	);
}

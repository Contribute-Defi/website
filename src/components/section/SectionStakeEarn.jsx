import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { StakeNft, StakeTrig } from '../ui';

function SectionStakeEarn() {
	return (
		<>
			<section className="section-account-info text-light">
				<Container>
					<Row>
						<Col md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }} xl={{ span: 6, offset: 3 }}>
							<h2 className="font-weight-light mb-5 text-center text-uppercase">Stake and Earn</h2>
							<div style={{ fontSize: '.8rem' }}>
								<StakeTrig />
								<StakeNft />
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
}

export default SectionStakeEarn;

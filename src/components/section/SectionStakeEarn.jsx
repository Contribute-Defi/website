import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { StakeLp, StakeNft, StakeTrig } from '../ui';

function SectionStakeEarn() {
	return (
		<>
			<section className="section-stake-earn text-light">
				<Container>
					<Row>
						<Col lg={{ span: 10, offset: 1 }} xl={{ span: 8, offset: 2 }}>
							<h2 className="font-weight-light mb-5 text-center text-uppercase">Stake and Earn</h2>
							<div style={{ fontSize: '.8rem' }}>
								<StakeTrig />
								<StakeNft />
								<StakeLp />
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
}

export default SectionStakeEarn;

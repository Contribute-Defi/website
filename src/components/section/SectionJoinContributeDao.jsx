import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export function SectionJoinContributeDao() {
	return (
		<section className="section-join-contribute-dao">
			<Container>
				<h2 className="text-center text-uppercase mb-4">
					Join the Contribute DAO by depositing your <span>TRIB</span> and securing your rights to mine TDAO.
				</h2>
				<Row className="justify-content-center">
					<Col className="text-center">
						<h4>Locked Liquidity</h4>
						<p>
							By contributing to the Locked Liquidity Event you are essentially exchanging TRIB tokens for
							a share of 1,000 TRIG. No more TRIG will ever be minted after the end of the event.
						</p>
					</Col>
					<Col className="text-center">
						<h4>Mining Tdao</h4>
						<p>
							Staked TRIG tokens offer users the ability to earn transfer fees in the form of TDAO, the
							governance token of Contribute’s ecosystem.
						</p>
					</Col>
					<Col className="text-center">
						<h4>governance rights</h4>
						<p>
							TDAO tokens grant holders full decisional power over the ecosystem and its treasury. Learn
							more here.
						</p>
					</Col>
				</Row>
			</Container>
		</section>
	);
}

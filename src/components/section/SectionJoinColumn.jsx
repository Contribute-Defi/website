import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function SectionJoinColumn() {
	return (
		<section className="section-join-contribute-columns">
			<Container fluid="sm">
				<Row>
					<Col className="d-flex justify-content-center">
						<h2>
							Join Contribute DAO by depositing Your <span>trib</span> and securing your rights to mine
							tdao
						</h2>
					</Col>
				</Row>
				<Row className="pointers">
					<Col>
						<h3>Locked Liquidity</h3>
						<p>
							By contributing to the Locked Liquidity Event you are essentially exchanging TRIB tokens for
							a share of 1,000 TRIG. No more TRIG will ever be minted after the end of the event.
						</p>
					</Col>
					<Col>
						<h3>Mining Tdao</h3>
						<p>
							Staked TRIG tokens offer users the ability to earn transfer fees in the form of TDAO, the
							governance token of Contribute’s ecosystem.
						</p>
					</Col>
					<Col>
						<h3>Governance Rights</h3>
						<p>
							TDAO tokens grant holders full decisional power over the ecosystem and its treasury.
							<br />
							<a
								href="https://medium.com/contribute-defi/contribute-dao-a-call-for-action-c66e8f5d57b"
								target="blank"
							>
								Learn more here.
							</a>
						</p>
					</Col>
				</Row>
			</Container>
		</section>
	);
}

export default SectionJoinColumn;

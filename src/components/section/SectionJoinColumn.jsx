import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function SectionJoinColumn() {
	return (
		<section className="section-join-contribute">
			<Container fluid="sm">
				<Row>
					<Col className="d-flex justify-content-center">
						<h1>
							Join Contribute DAO by depositing Your <span>trib</span> and securing your rights to mine
							tdao
						</h1>
					</Col>
				</Row>
				<Row className="pointers">
					<Col>
						<h2>Locked Liquidity</h2>
						<p>
							By contributing to the Locked Liquidity Event you are essentially exchanging TRIB tokens for
							a share of 1,000 TRIG. No more TRIG will ever be minted after the end of the event.
						</p>
					</Col>
					<Col>
						<h2>Mining Tdao</h2>
						<p>
							Staked TRIG tokens offer users the ability to earn transfer fees in the form of TDAO, the
							governance token of Contribute’s ecosystem.
						</p>
					</Col>
					<Col>
						<h2>Governance Rights</h2>
						<p>TDAO tokens grant holders full decisional power over the ecosystem and its treasury.</p>
					</Col>
				</Row>
			</Container>
		</section>
	);
}

export default SectionJoinColumn;

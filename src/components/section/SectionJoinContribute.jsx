import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export function SectionJoinContribute() {
	return (
		<section className="section-join-contribute">
			<Container>
				<Row className="justify-content-center">
					<Col>
						<h2 className="text-center text-uppercase mb-4">
							Join Con<span>trib</span>ute and <br /> become part of its Dao
						</h2>
						<p className="text-center">
							The treasury and all ecosystem fees will be controlled by TDAO holders through secure,
							on-chain voting.
						</p>
						<p className="text-center">
							Anybody can propose improvements, partnerships, automated strategies, profit-sharing and
							other ideas, and request funds or approval to execute.
						</p>
					</Col>
				</Row>
			</Container>
		</section>
	);
}

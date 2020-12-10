import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { LogoGovernance, Countdown } from '../ui';

export function SectionTrib(props) {
	return (
		<section className="section-hero-governance">
			<Container>
				<Row className="justify-content-center align-items-center">
					<Col>
						<div>
							<LogoGovernance />
							<h2 className="text-center text-capitalize mb-3">Locked Liquidity Event starts in</h2>
							<Countdown endDate={process.env.LLE_END} />
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
}

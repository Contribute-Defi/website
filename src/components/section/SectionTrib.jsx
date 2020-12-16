import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import contribute_trib from '../../assets/symbol.svg';
import { LogoGovernance, Countdown } from '../ui';

export function SectionHeroGovernance({ phase, endTime }) {
	return (
		<section className="section-hero-governance">
			<Container>
				<Row className="justify-content-center align-items-center">
					<Col>
						<div>
							<LogoGovernance />

							{phase === 1 ? (
								<>
									<h2 className="text-center text-capitalize mb-3">
										Locked Liquidity Event starts in
									</h2>
									{endTime && <Countdown endDate={endTime} />}
								</>
							) : phase === 2 ? (
								<>
									<h2 className="text-center text-capitalize mb-3">Locked Liquidity Event ends in</h2>
									{endTime && <Countdown endDate={endTime} />}
								</>
							) : null}
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
}

import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import IconBurned from '../../assets/icon-burned.svg';
import IconSupply from '../../assets/icon-supply.svg';
import IconFloor from '../../assets/icon-floor.svg';
import IconPrice from '../../assets/icon-price.svg';

import Statistic from '../Statistic';

function SectionStats2() {
	return (
		<section className="section-stats2 bg-dark text-light">
			<Row>
				<Col lg="9">
					<h2>TRIB stats</h2>
					<Row>
						<Col xs="6" md="3">
							<Statistic label="Burned" value={1245} image={IconBurned} />
						</Col>
						<Col xs="6" md="3">
							<Statistic label="Supply" value={1245} image={IconSupply} />
						</Col>
						<Col xs="6" md="3">
							<Statistic label="Floor" value={1245} image={IconFloor} />
						</Col>
						<Col xs="6" md="3">
							<Statistic label="Price" value={1245} image={IconPrice} />
						</Col>
					</Row>
				</Col>
				<Col lg="3">
					<Row>
						<Col xs="6" lg="12">
							<div className="mb-3">
								<Statistic label="Availabe to burn" value={124.24} unit="DAI" />
							</div>
							<div className="mb-3">
								<Button>Mint And Burn</Button>
							</div>
						</Col>
						<Col xs="6" lg="12">
							<Statistic label="Burning TRIB will increase it's price to" value={0.12} unit="DAI" />
						</Col>
					</Row>
				</Col>
			</Row>
		</section>
	);
}

export default SectionStats2;

import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Statistic from './Statistic';

function Stats() {
	return (
		<section className="l-stats p-3">
			<Row>
				<Col lg="3" md="6">
					<Statistic label="Locked Contributions" value={541245} unit="DAI" />
				</Col>
				<Col lg="3" md="6">
					<Statistic label="Continuous Earnings" value={7541245} unit="DAI" />
				</Col>
				<Col lg="3" md="6">
					<Statistic label="Interest Rate (APY)" value={2.5} unit="%" />
				</Col>
				<Col lg="3" md="6">
					<Statistic label="Interest Bearing Pool" value={1124574} unit="DAI" />
				</Col>
			</Row>
		</section>
	);
}

export default Stats;

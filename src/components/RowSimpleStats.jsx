import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Statistic from './Statistic';

function RowSimpleStats() {
	return (
		<Row className="text-center text-lg-left">
			<Col lg="3" sm="6" className="mb-4 mb-lg-0">
				<Statistic label="Locked Contributions" value={541245} unit="DAI" />
			</Col>
			<Col lg="3" sm="6" className="mb-4 mb-lg-0">
				<Statistic label="Continuous Earnings" value={7541245} unit="DAI" />
			</Col>
			<Col lg="3" sm="6" className="mb-4 mb-md-0">
				<Statistic label="Interest Rate (APY)" value={2.5} unit="%" />
			</Col>
			<Col lg="3" sm="6">
				<Statistic label="Interest Bearing Pool" value={1124574} unit="DAI" />
			</Col>
		</Row>
	);
}

export default RowSimpleStats;

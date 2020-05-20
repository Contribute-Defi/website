import React, { useState } from 'react';
import { Form, Row, Button, ButtonGroup, Col } from 'react-bootstrap';

function BuySell() {
	const [tab, setTab] = useState('buy');

	return (
		<Row className="justify-content-center">
			<Col md="6">
				<div className="mb-4">
					<ButtonGroup className="w-100">
						{Object.entries({ buy: 'Buy', sell: 'Sell' }).map(([key, title]) => (
							<Button
								key={key}
								variant={tab === key ? 'switch-active' : 'switch-inactive'}
								onClick={() => setTab(key)}
							>
								{title}
							</Button>
						))}
					</ButtonGroup>
				</div>
				<Row>
					<Col className="text-left">
						<Form.Label htmlFor="amount">Amount</Form.Label>
					</Col>
					<Col className="text-right">
						Balance: 0
					</Col>
				</Row>
				<div className="mb-3">
					<Form.Control type="text" id="amount" />
				</div>

				<Row>
					<Col className="text-left">
						<Form.Label htmlFor="receive">You will receive</Form.Label>
					</Col>
					<Col className="text-right">
						Balance: 0
					</Col>
				</Row>
				<div className="mb-4">
					<Form.Control type="text" id="receive" />
				</div>

				<div className="text-center mb-4">
					<Button>Purchase</Button>
				</div>

				<p className="fs-xs">
					10% of every transaction is
					{' '}
					<strong>locked forever</strong>
					{' '}
					in the interest-bearing pool.
					{' '}
					<a href="http://localhost/">Learn more</a>
					.
				</p>
			</Col>
		</Row>
	);
}

export default BuySell;

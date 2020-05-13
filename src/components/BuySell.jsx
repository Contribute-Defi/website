import React from 'react';
import { Card, Nav, Form } from 'react-bootstrap';

function BuySell() {
	return (
		<Card>
			<Card.Header>
				<Nav variant="tabs" defaultActiveKey="#buy">
					<Nav.Item>
						<Nav.Link onClick={() => alert('buy click')}>
							Buy
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link onClick={() => alert('sell click')}>
							Sell
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Card.Header>
			<Card.Body>
				<h3>Purchase TRIB tokens to participate</h3>
				<Form>
					<Form.Group controlId="sellDai">
						<Form.Label>Amount</Form.Label>
						<Form.Control type="text" />
					</Form.Group>
					<Form.Group controlId="sellTkns">
						<Form.Label>You will receive</Form.Label>
						<Form.Control type="text" />
					</Form.Group>
				</Form>
			</Card.Body>
		</Card>
	);
}

export default BuySell;

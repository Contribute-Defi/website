import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

function Header() {
	return (
		<section className="l-hero p-3">
			<Row>
				<Col>
					CON
					<strong>TRIB</strong>
					UTE
				</Col>
				<Col>
					<Button>Connect Wallet</Button>
				</Col>
			</Row>
		</section>
	);
}

export default Header;

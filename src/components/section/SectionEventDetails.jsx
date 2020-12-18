import React from 'react';
import dayjs from 'dayjs';
import { Col, Container, Row } from 'react-bootstrap';

export function SectionEventDetails(props) {
	const { startTime, endTime } = props;
	const duration = startTime && endTime ? dayjs.unix(endTime).diff(dayjs.unix(startTime), 'day') : 'N/A';
	return (
		<section className="section-event-details">
			<Container>
				<Row className="justify-content-center">
					<Col>
						<h2 className="font-weight-light text-center text-uppercase mb-4">Event Details</h2>
						<Row className="d-flex justify-content-center mb-4">
							<Col>
								<Container className="justify-content-center">
									<h4>Total Supply</h4>
									<h3>5000</h3>
								</Container>
							</Col>
							<Col>
								<Container className="justify-content-center">
									<h4>Primary Token</h4>
									<h3>TDAO</h3>
								</Container>
							</Col>
							<Col>
								<Container className="justify-content-center">
									<h4>Secondary Token</h4>
									<h3>TRIB</h3>
								</Container>
							</Col>
						</Row>
						<div className="details_container d-flex justify-content-between">
							<p className="m-0">Start Date</p>
							<p className="m-0 font-weight-bold">
								{startTime ? dayjs.unix(startTime).format('DD.MM.YYYY') : 'N/A'}
							</p>
						</div>
						<div className="details_container d-flex justify-content-between">
							<p className="m-0">Duration</p>
							<p className="m-0 font-weight-bold">{duration} Days</p>
						</div>
						<div className="details_container d-flex justify-content-between">
							<p className="m-0">Accepted Currencies</p>
							<p className="m-0 font-weight-bold">TRIB/ETH</p>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
}

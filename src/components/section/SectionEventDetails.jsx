import React from 'react';

export function SectionEventDetails(props) {
	return (
		<div className="event-details_container">
			<div className="event-details mx-auto">
				<h3 className="event-details_header text-center text-uppercase">Event Details</h3>
				<div className="details-table_container d-flex justify-content-center">
					<div className="column total-supply_container">
						<h5 className="total-supply_header">Total Supply</h5>
						<h3 className="total-supply">5000</h3>
					</div>
					<div className="column primary-token_container">
						<h5 className="primary-token_header">Primary Token</h5>
						<h3 className="primary-token">TDAO</h3>
					</div>
					<div className="column secondary-token_container">
						<h5 className="secondary-token_header">Secondary Token</h5>
						<h3 className="secondary-token">TRIB</h3>
					</div>
				</div>
				<div className="details_container start-date_container d-flex justify-content-between">
					<h5 className="detail_text m-0">Start Date</h5>
					<h5 className="detail m-0">16.Nov.2020</h5>
				</div>
				<div className="details_container duration_container d-flex justify-content-between">
					<h5 className="detail_text m-0">Duration</h5>
					<h5 className="detail m-0">10 Days</h5>
				</div>
				<div className="details_container currencies_container d-flex justify-content-between">
					<h5 className="detail_text m-0">Accepted Currencies</h5>
					<h5 className="detail m-0">TRIB/ETH</h5>
				</div>
			</div>
		</div>
	);
}

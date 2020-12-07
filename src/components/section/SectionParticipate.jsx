import React from 'react';

function SectionParticipate(props) {
	return (
		<div className="participate_container">
			<div className="participate mx-auto text-center">
				<h3 className="participation_header">
					All TRIB Submitted to the event will match <span className="amount">5,000 TDAO</span> token and both
					will be deposited to the TDAO/TRIB Uniswap pool
				</h3>
				<div className="participate-form_container mx-auto">
					<h3 className="participate-form_header text-uppercase mb-4">
						Contribute <span className="type">ETH</span> or <span className="trib">trib</span> to
						participate
					</h3>
					<div className="participate-input_container">
						<label className="d-flex justify-content-between" htmlFor="">
							<span>Amount:</span>
							<span>Balance: 0</span>
						</label>
						<div className="input_container d-flex">
							<input type="text" className="amount-input" />
							<div className="drop d-flex justify-content-between">
								<span className="drop-text">ETH</span>
								&#9662;
							</div>
						</div>
					</div>
					<button className="deposit-btn">Deposit</button>
				</div>
			</div>
		</div>
	);
}

export default SectionParticipate;

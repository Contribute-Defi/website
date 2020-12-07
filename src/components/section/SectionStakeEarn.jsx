import React from 'react';

function SectionStakeEarn(props) {
	return (
		<div className="stake-earn_container">
			<div className="stake-earn mx-auto">
				<h3 className="stake-earn_header text-center text-uppercase">Stake and earn</h3>
				<div className="stake trig-stake">
					<div className="header-and-purchase-btn d-flex justify-content-between">
						<div className="stake-header_container">
							<h3 className="stake_header m-0">Trig</h3>
						</div>
						<div className="purchase-btn_container d-flex justify-content-end align-items-center">
							<button className="purchase-btn mr-3">Purchase</button>
							<span className="mr-2">&#9652;</span>
						</div>
					</div>
					<div className="bottom-line"></div>
					<div className="stake-details_container d-flex flex-wrap pl-2">
						<div className="stake-detail_container">
							<h5 className="detail-text text-uppercase m-0">Apy</h5>
							<h5 className="detail-value text-uppercase m-0">
								54 <span>%</span>
							</h5>
						</div>
						<div className="stake-detail_container">
							<h5 className="detail-text text-uppercase m-0">Balance</h5>
							<h5 className="detail-value text-uppercase m-0">
								0 <span>trig</span>
							</h5>
						</div>
						<div className="stake-detail_container">
							<h5 className="detail-text text-uppercase m-0">Staked</h5>
							<h5 className="detail-value text-uppercase m-0">
								45.232 <span>trig</span>
							</h5>
						</div>
						<div className="stake-detail_container">
							<h5 className="detail-text text-uppercase m-0">Earned</h5>
							<h5 className="detail-value text-uppercase m-0">
								1.248 <span>tdao</span>
							</h5>
						</div>
						<div className="stake-detail_container">
							<h5 className="detail-text text-uppercase m-0">Value</h5>
							<h5 className="detail-value text-uppercase m-0">
								1,548.00 <span>usd</span>
							</h5>
						</div>
					</div>
					<div className="bottom-line"></div>

					<div className="stake-form_container d-flex flex-wrap mt-4">
						<div className="stake-form">
							<label className="d-flex justify-content-end" htmlFor="">
								<span>Balance: 0</span>
							</label>
							<input type="text" className="stake-input" placeholder="0" />
							<button className="stake-btn mt-4">Stake</button>
						</div>
						<div className="stake-form">
							<label className="d-flex justify-content-end" htmlFor="">
								<span>Balance: 0</span>
							</label>
							<input type="text" className="stake-input" placeholder="0" />
							<button className="stake-btn mt-4">Unstake</button>
						</div>
					</div>
					<div className="bottom-line mt-4"></div>
				</div>
				<div className="stake pioneer-stake">
					<div className="header-and-purchase-btn d-flex justify-content-between">
						<div className="stake-header_container d-flex align-items-center">
							<input className="pioneer-check mr-2" type="checkbox" name="" id="" />
							<h3 className="stake_header m-0">Pioneer</h3>
						</div>
						<div className="purchase-btn_container d-flex justify-content-end align-items-center">
							<button className="purchase-btn mr-3">Purchase</button>
							<span className="mr-2">&#9652;</span>
						</div>
					</div>
					<div className="bottom-line"></div>
					<div className="stake-details_container d-flex flex-wrap pl-2">
						<div className="stake-detail_container">
							<h5 className="detail-text text-uppercase m-0">Apy</h5>
							<h5 className="detail-value text-uppercase m-0">
								54 <span>%</span>
							</h5>
						</div>
						<div className="stake-detail_container">
							<h5 className="detail-text text-uppercase m-0">Balance</h5>
							<h5 className="detail-value text-uppercase m-0">
								0 <span>nft</span>
							</h5>
						</div>
						<div className="stake-detail_container">
							<h5 className="detail-text text-uppercase m-0">Staked</h5>
							<h5 className="detail-value text-uppercase m-0">
								45.232 <span>nft</span>
							</h5>
						</div>
						<div className="stake-detail_container">
							<h5 className="detail-text text-uppercase m-0">Earned</h5>
							<h5 className="detail-value text-uppercase m-0">
								1.248 <span>tdao</span>
							</h5>
						</div>
						<div className="stake-detail_container">
							<h5 className="detail-text text-uppercase m-0">Value</h5>
							<h5 className="detail-value text-uppercase m-0">
								1,548.00 <span>usd</span>
							</h5>
						</div>
					</div>
					<div className="bottom-line"></div>

					<div className="stake-form_container d-flex flex-wrap mt-4">
						<div className="stake-form">
							<label className="d-flex justify-content-end" htmlFor="">
								<span>Balance: 0</span>
							</label>
							<input type="text" className="stake-input" placeholder="0" />
							<button className="stake-btn mt-4">Stake</button>
						</div>
						<div className="stake-form">
							<label className="d-flex justify-content-end" htmlFor="">
								<span>Balance: 0</span>
							</label>
							<input type="text" className="stake-input" placeholder="0" />
							<button className="stake-btn mt-4">Unstake</button>
						</div>
					</div>
					<div className="bottom-line mt-4"></div>
				</div>
			</div>
		</div>
	);
}

export default SectionStakeEarn;

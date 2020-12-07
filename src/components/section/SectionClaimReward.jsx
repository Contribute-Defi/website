import React from 'react';

function SectionClaimReward(props) {
	return (
		<div className="claim-reward_container">
			<div className="claim-reward mx-auto text-center">
				<h3 className="claim-reward_header text-uppercase">Claim Reward</h3>
				<div className="claim-rewards-details_container">
					<div className="reward-details_container available-claim-detail d-flex justify-content-between">
						<h5 className="reward-detail-key m-0">Available to Claim</h5>
						<h5 className="reward-detail-value m-0"></h5>
					</div>
					<div className="reward-details_container trig-detail d-flex justify-content-between">
						<h5 className="reward-detail-key m-0">TRIG</h5>
						<h5 className="reward-detail-value m-0">5,241</h5>
					</div>
					<div className="reward-details_container divinity-detail d-flex justify-content-between">
						<h5 className="reward-detail-key m-0">DIVINITY (NFT)</h5>
						<h5 className="reward-detail-value m-0">1X</h5>
					</div>
				</div>

				<button className="claim-and-stake-btn mt-5">Claim and Stake</button>
			</div>
		</div>
	);
}

export default SectionClaimReward;

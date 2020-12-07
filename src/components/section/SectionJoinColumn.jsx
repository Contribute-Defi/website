import React from 'react';
import { Link } from 'react-router-dom';

function SectionJoinColumn(props) {
	return (
		<div className="join-contribute_container bg-white">
			<div className="join-contribute-column mx-auto">
				<h3 className="join-contribute_header text-center text-uppercase mx-auto px-5 mb-5">
					Join Contribute DAO by depositing Your <span>trib</span> and securing your rights to mine tdao
				</h3>
				<div className="d-flex columns_container flex-wrap">
					<div className="col-md-4 p-0 pr-5 column_container locked-liquidity_column text-center">
						<h5 className="point_header text-uppercase text-center">Locked Liquidity</h5>
						<p className="point text-center text-center mb-3">
							By contributing to the Locked Liquidity Event you are essentially exchanging TRIB tokens for
							a share of 1,000 TRIG. No more TRIG will ever be minted after the end of the event.
						</p>
					</div>
					<div className="col-md-4 p-0 px-5 column_container mining-tdao_column text-center">
						<h5 className="point_header text-uppercase text-center">Mining Tdao</h5>
						<p className="point text-center text-center mb-3">
							Staked TRIG tokens offer users the ability to earn transfer fees in the form of TDAO, the
							governance token of Contribute’s ecosystem.
						</p>
					</div>
					<div className="col-md-4 p-0 pl-5 column_container governance-rights_column text-center">
						<h5 className="point_header text-uppercase text-center">Governance Rights</h5>
						<p className="point text-center text-center m-0">
							TDAO tokens grant holders full decisional power over the ecosystem and its treasury.
						</p>
						<span className="column-link">Learn more here</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SectionJoinColumn;

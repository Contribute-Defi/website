import React from 'react';

function SectionLiveStats(props) {
	return (
		<div className="live-stats_container">
			<div className="live-stats mx-auto d-flex flex-column">
				<h3 className="live-stats_header text-center text-uppercase">Live Stats</h3>
				<div className="live-stats-parts d-flex flex-wrap justify-content-center">
					<div className="col-md-4 live-stats-part trib-contributed_container">
						<h5 className="live-part-text tribe-contributed-text">TRIB Contributed</h5>
						<h3 className="live-part-total">
							7,125,500 <span className="per-price">TRIB/14,393,510 USD</span>
						</h3>
					</div>
					<div className="col-md-4 live-stats-part tdao-price_container">
						<h5 className="live-part-text tdao-price-text">TDAO Price</h5>
						<h3 className="live-part-total">
							7,125,500 <span className="per-price">TRIB/14,393,510 USD</span>
						</h3>
					</div>
					<div className="col-md-4 live-stats-part trig-price_container">
						<h5 className="live-part-text trig-price-text">TRIG Price</h5>
						<h3 className="live-part-total">
							7,125,500 <span className="per-price">TRIB/14,393,510 USD</span>
						</h3>
					</div>
				</div>

				<div className="prices_container mx-auto mt-5">
					<div className="price_container trib-prices_container pl-2 mb-4 pt-2">
						<h5 className="price d-flex justify-content-between mb-3">
							<span className="price-text">TRIB Price</span>
							<span className="price-value">9.14 USD</span>
						</h5>
						<h5 className="price-floor d-flex justify-content-between mt-3 pb-2">
							<span className="price-text">TRIB Price Floor</span>
							<span className="price-value">8.05 USD</span>
						</h5>
					</div>
					<div className="price_container tdao-prices_container pl-2 mb-4 pt-2">
						<h5 className="price d-flex justify-content-between mb-3">
							<span className="price-text">TDAO Price</span>
							<span className="price-value">9.14 USD</span>
						</h5>
						<h5 className="price-floor d-flex justify-content-between mt-3 pb-2">
							<span className="price-text">TRIB Price Floor</span>
							<span className="price-value">8.05 USD</span>
						</h5>
					</div>
					<div className="price_container trig-prices_container pl-2 pt-2">
						<h5 className="price d-flex justify-content-between mb-3 pb-2">
							<span className="price-text">TRIG Price</span>
							<span className="price-value">9.14 USD</span>
						</h5>
					</div>
				</div>

				<button className="contribute-btn mx-auto mt-5">Contribute</button>

				<div className="live-stats-points_container mx-auto mt-5">
					<p className="live-stats-point">
						* The TRIB Price Floor takes into account the burned tokens in addition to the locked tokens in
						Uniswap Pool TDAO/TRIB.
					</p>
					<p className="live-stats-point">
						** The TDAO Price Floor is the price, in TRIB, that it will be listed at on Uniswap, No TDAO
						token can ever be sold for less than its Price Floor.
					</p>
				</div>
			</div>
		</div>
	);
}

export default SectionLiveStats;

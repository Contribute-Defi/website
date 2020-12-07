import React from 'react';
import { Link } from 'react-router-dom';

export function SectionIntroducing() {
	return (
		<div className="tdao-guaranteed">
			<div className="differences_container row">
				<div className="differences introducing-tdao col-md-5">
					<h5 className="difference_header text-uppercase">
						Introducing <span>Tdao</span>
					</h5>
					<div className="line"></div>
					<p className="difference-point">
						The &apos;Contribute DAO&apos; governance token. Backed by TRIB and distributed through Locked
						Liquidity Mining.
					</p>
					<p className="difference-point">
						Contribute is inviting holders to submit their TRIB and start managing the ecosystem through the
						use of TDAO tokens.
					</p>
					<p className="difference-point">
						Secure your rights to mine TDAO today by participating to the event and receiving a share of
						1,000 TRIG tokens in exchange for your TRIB.
					</p>
					<p className="difference-point m-0">
						Staking TRIG will earn TDAO transfer fees based on its volume. TRIG is in itself a tradable
						token with value. It represents exclusive access to Contribute&apos;s mines.
					</p>
				</div>
				<div className="differences guaranteed-liquidity col-md-5">
					<h5 className="difference_header text-uppercase">Guaranteed Liquidity</h5>
					<div className="line"></div>
					<p className="difference-point">
						Early supporters will also be gifted with a series of limited-edition NFTs granting a Bonus on
						their commitment.
					</p>
					<p className="difference-point">
						100% of the TRIB submitted in the event will match 5,000 TDAO tokens and both will be deposited
						to the TDAO/TRIB Uniswap Pool
					</p>
					<p className="difference-point">
						Initial liquidity will be <strong>locked forever</strong>, creating a Price Floor for TDAO, in
						addition to that of TRIB itself, calculated in mUSD.
					</p>
					<Link className="more-differences-link">More details are available on Medium</Link>
				</div>
			</div>
		</div>
	);
}

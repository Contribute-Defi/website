import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

export function SectionIntroducing() {
	return (
		<section className="section-introducing">
			<Container>
				<Row className="d-flex justify-content-center">
					<Col className="introducing-tdao">
						<h5>
							Introducing <span>Tdao</span>
						</h5>
						<div className="line"></div>
						<p>
							The &apos;Contribute DAO&apos; governance token. Backed by TRIB and distributed through
							Locked Liquidity Mining.
						</p>
						<p>
							Contribute is inviting holders to submit their TRIB and start managing the ecosystem through
							the use of TDAO tokens.
						</p>
						<p>
							Secure your rights to mine TDAO today by participating in the event and receiving a share of
							1,000 TRIG tokens in exchange for your TRIB.
						</p>
						<p>
							Staking TRIG will earn TDAO transfer fees based on its volume. TRIG is in itself a tradable
							token with value. It represents exclusive access to Contribute&apos;s mines.
						</p>
					</Col>
					<Col className="guaranteed-liquidity">
						<h5>Guaranteed Liquidity</h5>
						<div className="line"></div>
						<p>
							Early supporters will also be gifted with a series of limited-edition NFTs granting a Bonus
							on their commitment.
						</p>
						<p>
							100% of the TRIB submitted in the event will match 5,000 TDAO tokens and both will be
							deposited to the TDAO/TRIB Uniswap Pool
						</p>
						<p>
							Initial liquidity will be <strong>locked forever</strong>, creating a Price Floor for TDAO,
							in addition to that of TRIB itself, calculated in mUSD.
						</p>
						<a
							className="more-differences-link"
							target="blank"
							href="https://medium.com/contribute-defi/contribute-dao-a-call-for-action-c66e8f5d57b"
						>
							More details are available on Medium
						</a>
					</Col>
				</Row>
			</Container>
		</section>
	);
}

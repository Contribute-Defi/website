import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { RowStat, Statistic } from '../ui';

function SectionLiveStats(props) {
	return (
		<section className="section-live-stats text-light">
			<Container className="mb-6">
				<h2 className="font-weight-kight mb-5 text-center text-uppercase">Live Stats</h2>
				<Row className="text-center text-lg-left">
					<Col sm="6" lg="4">
						<Statistic id="lleTribContributed" idSecondary="lleTribContributedUsd" color="trib" />
					</Col>
					<Col sm="6" lg="4">
						<Statistic id="tdaoPrice" idSecondary="tdaoPriceUsd" color="tdao" />
					</Col>
					<Col sm="6" lg="4">
						<Statistic id="trigPrice" idSecondary="trigPriceUsd" color="trig" />
					</Col>
				</Row>
			</Container>
			<Container className="mb-6">
				<Row>
					<Col md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }} xl={{ span: 6, offset: 3 }}>
						<div className="border-trib">
							<RowStat id="tribPriceUsd" />
							<RowStat id="tribFloor" />
						</div>
						<div className="border-tdao">
							<RowStat id="tdaoMaxSupply" value={5000} />
							<RowStat id="tdaoPrice" idSecondary="tdaoPriceUsd" />
						</div>
						<div className="border-trig">
							<RowStat id="trigMaxSupply" value={1000} />
						</div>

						<div className="mt-5 mb-5 text-center">
							<Button href="#invest" className="btn-tdao pl-5 pr-5">
								Contribute
							</Button>
						</div>
						<div className="note">
							<p>
								* The TRIB Price Floor takes into account the burned tokens in addition to the locked
								tokens in Uniswap Pool TDAO/TRIB.
							</p>
							<p>
								** The TDAO Price Floor is the price, in TRIB, that it will be listed at on Uniswap, No
								TDAO token can ever be sold for less than its Price Floor.
							</p>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
}

export default SectionLiveStats;

import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { RowStat, Statistic } from '../ui';

function SectionLiveStats(props) {
	const { phase } = props;
	const handleScrollDown = () => {
		document.getElementById('anchor-participate').scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<section className="section-live-stats text-light">
			<Container className="mb-6">
				<h2 className="font-weight-kight mb-5 text-center text-uppercase">Live Stats</h2>
				<Row className="text-center text-lg-left">
					<Col sm="6" lg="4">
						<Statistic id="lleTribContributed" idSecondary="lleTribContributedUsd" color="trib" />
					</Col>
					<Col sm="6" lg="4">
						<Statistic id="tdaoPriceTRIB" idSecondary="tdaoPriceUSD" color="tdao" />
					</Col>
					<Col sm="6" lg="4">
						<Statistic id="trigPriceTRIB" idSecondary="trigPriceUSD" color="trig" />
					</Col>
				</Row>
			</Container>
			<Container className="mb-6">
				<Row>
					<Col md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }} xl={{ span: 6, offset: 3 }}>
						<div className="border-trib">
							<RowStat id="tribPriceUSD" />
							<RowStat id="tribFloor" />
						</div>
						<div className="border-tdao">
							<RowStat id="tdaoMaxSupply" value={5000} />
							<RowStat id="tdaoPriceFloorTRIB" idSecondary="tdaoPriceFloorUSD" />
						</div>
						<div className="border-trig">
							<RowStat id="trigMaxSupply" value={1000} />
						</div>
						{phase === 2 && (
							<div className="mt-5 mb-5 text-center">
								<Button onClick={handleScrollDown} className="btn-tdao pl-5 pr-5">
									Contribute
								</Button>
							</div>
						)}
						<div className="note">
							<p>
								* The TRIB Virtual Price Floor takes into account the burned tokens in addition to the
								locked tokens in the TDAO/TRIB Uniswap Pool.
							</p>
							<p>
								** The TDAO Price Floor is the price that TDAO will be listed on Uniswap, this is the
								minimum price that will be used to exchange TDAO for TRIB.
							</p>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
}

export default SectionLiveStats;

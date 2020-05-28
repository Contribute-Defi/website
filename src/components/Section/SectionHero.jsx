import React from 'react';

import { Button, Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import Statistic from '../Statistic';
import { fromWei } from '../../lib/utils';

class SectionHero extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lockedContributionsKey: null,
			continuousEarningKey: null,
			interestRateKey: null,
			interestPoolTotalKey: null,
		};
	}

	componentDidMount() {
		const { drizzle } = this.props;
		const { ViewContribute } = drizzle.contracts;

		this.setState({
			lockedContributionsKey: ViewContribute.methods.lockedContributions.cacheCall(),
			continuousEarningKey: ViewContribute.methods.continuousEarning.cacheCall(),
			interestRateKey: ViewContribute.methods.interestRate.cacheCall(),
			interestPoolTotalKey: ViewContribute.methods.interestPoolTotal.cacheCall(),
		});
	}

	render() {
		const { props, state } = this;
		const { ViewContribute } = props.drizzleState.contracts;
		const lockedContributions = ViewContribute.lockedContributions[state.lockedContributionsKey];
		const continuousEarning = ViewContribute.continuousEarning[state.continuousEarningKey];
		const interestRate = ViewContribute.interestRate[state.interestRateKey];
		const interestPoolTotal = ViewContribute.interestPoolTotal[state.interestPoolTotalKey];

		return (
			<section className="section-hero">
				<div className="hero-hero">
					<Container fluid="md">
						<Row className="justify-content-center text-center">
							<Col lg="6" md="8">
								<Logo />
								<h2 className="mb-5 mb-lg-6">
									A capital coordination tool that pushes the boundaries of DeFi.
								</h2>
								<div className="mb-4 mb-lg-5">
									<Button className="fs-xl">Connect Wallet</Button>
								</div>
								<p>
									<Button variant="link" className="text-white pl-0 pr-0 fs-s">
										What is Contribute
									</Button>
								</p>
							</Col>
						</Row>
					</Container>
				</div>
				<div className="hero-stats">
					<Container fluid="md">
						<Row className="text-center text-lg-left">
							<Col lg="3" sm="6" className="mb-4 mb-lg-0">
								<Statistic label="Locked Contributions" value={lockedContributions && fromWei(lockedContributions.value, 0)} unit="DAI" />
							</Col>
							<Col lg="3" sm="6" className="mb-4 mb-lg-0">
								<Statistic label="Continuous Earnings" value={continuousEarning && fromWei(continuousEarning.value, 0)} unit="DAI" />
							</Col>
							<Col lg="3" sm="6" className="mb-4 mb-md-0">
								<Statistic label="Interest Rate (APY)" value={interestRate && fromWei(interestRate.value, 0)} unit="%" />
							</Col>
							<Col lg="3" sm="6">
								<Statistic label="Interest Bearing Pool" value={interestPoolTotal && fromWei(interestPoolTotal.value, 0)} unit="DAI" />
							</Col>
						</Row>
					</Container>
				</div>
			</section>
		);
	}
}

SectionHero.propTypes = {
	drizzle: PropTypes.shape({
		contracts: PropTypes.shape({
			Contribute: PropTypes.object,
			ViewContribute: PropTypes.object,
		}),
		web3: PropTypes.object,
	}),
	drizzleState: PropTypes.shape({
		contracts: PropTypes.shape({
			Contribute: PropTypes.object,
			ViewContribute: PropTypes.object,
		}),
	}),
};

SectionHero.defaultProps = {
	drizzle: null,
	drizzleState: null,
};


export default SectionHero;

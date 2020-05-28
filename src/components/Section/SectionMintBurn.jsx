import React from 'react';
import PropTypes from 'prop-types';

import { Button, Col, Row } from 'react-bootstrap';

import Statistic from '../Statistic';
import { fromWei } from '../../lib/utils';

class SectionMintBurn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			availableToBurnKey: null,
			priceAfterBurnKey: null,
		};
	}

	componentDidMount() {
		const { drizzle } = this.props;
		const { ViewContribute } = drizzle.contracts;

		this.setState({
			availableToBurnKey: ViewContribute.methods.availableToBurn.cacheCall(),
			priceAfterBurnKey: ViewContribute.methods.priceAfterBurn.cacheCall(),
		});
	}

	render() {
		const { props, state } = this;
		const { ViewContribute } = props.drizzleState.contracts;
		const availableToBurn = ViewContribute.availableToBurn[state.availableToBurnKey];
		const priceAfterBurn = ViewContribute.priceAfterBurn[state.priceAfterBurnKey];

		return (
			<section className="section-mint-burn text-center">
				<h2 className="mb-3 mb-lg-4 text-uppercase font-weight-bold">Mint And Burn</h2>
				<Row className="justify-content-center mb-4 mb-lg-5">
					<Col md="10" lg="8">
						<p>
							<strong>This is where the magic happens!</strong>
							<br />
							Accumulated interest is used to mint and burn TRIB tokens. This increases its price and
							locks
							additional DAI, which continuously generates interest for the protocol.
						</p>
					</Col>
				</Row>

				<Row className="text-center justify-content-center">
					<Col md="10" lg="7">
						<Row>
							<Col md="4" className="float-md-left">
								<Statistic label="Available to burn" value={availableToBurn && fromWei(availableToBurn.value)} unit="DAI" />
							</Col>
							<Col md="4" className="mb-3 mb-md-0">
								<Button variant="secondary" className="btn-large text-nowrap">Mint And Burn</Button>
							</Col>
							<Col md="4" className="float-md-right">
								<Statistic label="Burning TRIB will increase its price to" value={priceAfterBurn && fromWei(priceAfterBurn.value)} unit="DAI" />
							</Col>
						</Row>
					</Col>
				</Row>
			</section>
		);
	}
}

SectionMintBurn.propTypes = {
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

SectionMintBurn.defaultProps = {
	drizzle: null,
	drizzleState: null,
};


export default SectionMintBurn;

import React from 'react';
import PropTypes from 'prop-types';
import { fromWei } from '../lib/utils';
import { stats } from '../config/const';

class ContractValueInner extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			methodKey: null,
		};
	}

	componentDidMount() {
		const { method, drizzle } = this.props;
		const { ViewContribute } = drizzle.contracts;

		this.setState({
			methodKey: ViewContribute.methods[method].cacheCall(),
		});
	}

	render() {
		const { props, state } = this;
		const { ViewContribute } = props.drizzleState.contracts;
		const value = ViewContribute[props.method][state.methodKey];
		const stat = stats[props.method];
		return (
			<span>
				{value && fromWei(value.value, { decimals: stat.decimals || 3, divideBy: stat.divideBy || 1 })}
			</span>
		);
	}
}

ContractValueInner.propTypes = {
	method: PropTypes.string.isRequired,
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

ContractValueInner.defaultProps = {
	drizzle: null,
	drizzleState: null,
};

export default ContractValueInner;

import React from 'react';
import PropTypes from 'prop-types';
import { stats } from '../config/const';

class ContractValueInner extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			methodKey: null,
		};
	}

	componentDidMount() {
		const { method, drizzle, param, contract: contractName } = this.props;
		const contract = drizzle.contracts[contractName];


		let methodKey;
		if (param === null) {
			methodKey = contract.methods[method].cacheCall();
		} else {
			methodKey = contract.methods[method].cacheCall(drizzle.web3.utils.toWei(param));
		}


		this.setState({
			methodKey,
		});
	}

	componentDidUpdate(prevProps) {
		const { method, drizzle, param, contract: contractName } = this.props;

		if (prevProps.param === param) {
			return;
		}
		const contract = drizzle.contracts[contractName];

		if (param === null) {
			return;
		}

		// eslint-disable-next-line react/no-did-update-set-state
		this.setState({
			methodKey: contract.methods[method].cacheCall(drizzle.web3.utils.toWei(param)),
		});
	}

	render() {
		const { props, state } = this;
		const contract = props.drizzleState.contracts[props.contract];
		const value = contract[props.method][state.methodKey];
		const stat = stats[props.method];

		if (!value || !value.value) {
			return null;
		}

		const fromWei = (amount, { divideBy = 1, decimals = 3 }) => parseFloat(
			parseFloat(props.drizzle.web3.utils.fromWei(amount)) / divideBy,
		).toLocaleString(undefined, { maximumFractionDigits: decimals });

		let valueStr = fromWei(value.value, { decimals: stat.decimals || 3, divideBy: stat.divideBy || 1 });
		let valueStr2 = null;

		if (stat.smallDecimals) {
			const divideAt = valueStr.length - stat.smallDecimals + 1;
			valueStr2 = valueStr.substring(divideAt);
			valueStr = valueStr.substring(0, divideAt);
		}


		return (
			<span>
				{valueStr}
				{valueStr2 ? <small>{valueStr2}</small> : null}
			</span>
		);
	}
}

ContractValueInner.propTypes = {
	method: PropTypes.string.isRequired,
	contract: PropTypes.string.isRequired,
	param: PropTypes.string,
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
	param: null,
	drizzle: null,
	drizzleState: null,
};

export default ContractValueInner;

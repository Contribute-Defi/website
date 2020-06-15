import React from 'react';
import PropTypes from 'prop-types';
import { stats } from '../config/const';

const INCREMENT_PERIOD = 100;

class ContractValueInner extends React.Component {
	constructor(props) {
		super(props);
		this.stat = stats[props.method];
		this.contract = props.drizzle.contracts[props.contract];
		this.web3 = props.drizzle.web3;

		this.state = {
			methodKey: null, // for getting value maintained by drizzle
			value: null, // manaually maintained value
		};
	}

	async componentDidMount() {
		const { method, param } = this.props;

		if (this.stat.continuous) {
			// updates latest value from chain and sets timers for value increment and new from-chain update
			this.updateValueFromChain();
		} else {
			let methodKey;
			if (param === null) {
				methodKey = this.contract.methods[method].cacheCall();
			} else {
				methodKey = this.contract.methods[method].cacheCall(this.web3.utils.toWei(param));
			}


			this.setState({
				methodKey,
			});
		}
	}

	componentDidUpdate(prevProps) {
		const { method, drizzle, param, contract: contractName } = this.props;
		if (param !== null && param !== prevProps.param) {
			const contract = drizzle.contracts[contractName];
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({
				methodKey: contract.methods[method].cacheCall(this.web3.utils.toWei(param)),
			});
		}
	}

	incrementValue(skip = false) {
		if (!skip) {
			const { value } = this.state;
			const { BN } = this.web3.utils;
			this.setState({
				value: (new BN(value)).add(new BN(this.incrementAmount)).toString(),
			});
		}
		if (this.incrementTimeout) {
			window.clearTimeout(this.incrementTimeout);
		}
		this.incrementTimeout = window.setTimeout(() => {
			this.incrementValue();
		}, INCREMENT_PERIOD); // 10x per second mate?
	}

	async updateValueFromChain() {
		const { method } = this.props;

		const block = await this.web3.eth.getBlock();
		const prevBlock = await this.web3.eth.getBlock(block.number - 1);
		const ts1 = prevBlock.timestamp;
		const ts2 = block.timestamp;
		const val1 = await (await this.contract.methods[method].call())
			.call({}, prevBlock.number); // WTF?
		const val2 = await (await this.contract.methods[method].call())
			.call({}, block.number); // WTF?
		const valDiff = val2 - val1;
		const tsDiff = ts2 - ts1;
		this.incrementAmount = Math.round((valDiff / tsDiff) * (INCREMENT_PERIOD / 1000)).toString(); // value increment per period
		this.incrementValue(true);

		this.setState({
			value: val2,
		});


		window.setTimeout(() => this.updateValueFromChain(), 60000); // once per minute, right mate?
	}

	render() {
		const { stat } = this;
		const { props, state } = this;

		const fromWei = (amount, { divideBy = 1, decimals, smallDecimals }) => parseFloat(
			parseFloat(this.web3.utils.fromWei(amount)) / divideBy,
		).toLocaleString(undefined, { maximumFractionDigits: decimals + smallDecimals });

		let valueWei;
		if (this.stat.continuous) {
			valueWei = state.value;
		} else {
			const contract = props.drizzleState.contracts[props.contract];
			const value = contract[props.method][state.methodKey];
			if (!value || !value.value) {
				return null;
			}
			valueWei = value.value;
		}
		if (!valueWei) {
			return null;
		}

		let valueStr = fromWei(valueWei, { decimals: stat.decimals || 3, smallDecimals: stat.smallDecimals || 0, divideBy: stat.divideBy || 1 });
		let valueStr2 = null;

		if (stat.smallDecimals) {
			const parts = valueStr.split('.');
			if (parts[1]) {
				const valueStr1 = parts[1].substring(0, stat.decimals).padEnd(stat.decimals, '0');
				valueStr2 = parts[1].substring(stat.decimals).padEnd(stat.smallDecimals, '0');
				valueStr = `${parts[0]}.${valueStr1}`;
			}
		}

		return (
			<span className="number">
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
		currentBlock: PropTypes.shape({
			number: PropTypes.number,
		}),
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

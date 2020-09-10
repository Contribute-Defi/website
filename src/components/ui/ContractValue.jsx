import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ethers from 'ethers';
import { useEthers } from '../../app';
import { stats } from "../../config/const";

const { formatEther } = ethers.utils;

function ContractValue({ id, params = [] }) {
	const { connected, contracts, timestamp } = useEthers();

	const { method, contract: contractName, pollInterval, decimals, smallDecimals } = stats[id];
	const [value, setValue] = useState()

	useEffect(() => {
		if (!connected || !contracts) return;

		const contract = contracts[contractName];
		const readValueFromContract = async() => {
			const rawValue = await contract[method || id](...params);
			const niceValue = processValue(rawValue);
			setValue(niceValue);
			// if (pollInterval) {
			// 	setTimeout(readValueFromContract, pollInterval);
			// }
		};
		readValueFromContract().then();
	}, [connected, contracts, timestamp]);

	if (!connected) {
		return <div className="lds-dual-ring" />;
	}

	const processValue = (value) => {
		if (typeof value === 'undefined') {
			return null;
		}
		if (typeof value === 'string') {
			return value;
		}
		if (typeof value === 'object' && value._isBigNumber) {
			const stringValue = formatEther(value);
			let [wholePart, decimalPart] = stringValue.split('.');
			wholePart = (new Intl.NumberFormat('en-US')).format(wholePart);
			if (decimals) {
				decimalPart = decimalPart.substr(0, decimals).padEnd(decimals, '0');
				if (smallDecimals) {
					const bigDecimals = decimals - smallDecimals;
					const bigDecimalPart = decimalPart.substr(0, bigDecimals);
					const smallDecimalPart = decimalPart.substr(bigDecimals);
					return <span>{wholePart}.{bigDecimalPart}<small>{smallDecimalPart}</small></span>
				} else {
					return <span>{wholePart}.{decimalPart}</span>
				}
			} else {
				return wholePart;
			}

		}
	};

	return (
		<span>
			{value}
		</span>
	);
}

ContractValue.propTypes = {
	id: PropTypes.string.isRequired,
	params: PropTypes.arrayOf(PropTypes.string),
};

ContractValue.defaultProps = {
	param: [],
}

export { ContractValue };

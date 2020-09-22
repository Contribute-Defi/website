import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ethers from 'ethers';
import { useContractValue, useEthers } from '../../app';
import { stats } from '../../config/const';

const { formatEther } = ethers.utils;

function ContractValue({ id, params = [] }) {
	const value = useContractValue(id, params);
	const stat = stats[id];
	const { decimals, smallDecimals } = stat;

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
			wholePart = new Intl.NumberFormat('en-US').format(wholePart);
			if (decimals) {
				decimalPart = decimalPart.substr(0, decimals).padEnd(decimals, '0');
				if (smallDecimals) {
					const bigDecimals = decimals - smallDecimals;
					const bigDecimalPart = decimalPart.substr(0, bigDecimals);
					const smallDecimalPart = decimalPart.substr(bigDecimals);
					return (
						<span>
							{wholePart}.{bigDecimalPart}
							<small>{smallDecimalPart}</small>
						</span>
					);
				} else {
					return (
						<span>
							{wholePart}.{decimalPart}
						</span>
					);
				}
			} else {
				return wholePart;
			}
		}
	};

	return <span>{processValue(value)}</span>;
}

ContractValue.propTypes = {
	id: PropTypes.string.isRequired,
	params: PropTypes.arrayOf(PropTypes.string),
};

ContractValue.defaultProps = {
	param: [],
};

export { ContractValue };

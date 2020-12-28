import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useContractValue, useEthers } from '../../app';
import { stats } from '../../config/const';
import { formatUnits } from 'ethers/lib/utils';

const { formatEther } = ethers.utils;

function ContractValue({ id, params = [] }) {
	const value = useContractValue(id, params);
	const stat = stats[id];
	const { decimals, smallDecimals, type } = stat;

	const processValue = (value) => {
		if (typeof value === 'undefined') {
			return null;
		}
		if (typeof value === 'string') {
			return value;
		}
		if (typeof value === 'object' && value._isBigNumber) {
			let stringValue;
			let wholePart, decimalPart;
			if (type === 'int') {
				wholePart = parseInt(value);
				decimalPart = '';
			} else {
				stringValue = formatEther(value);
				const tmp = stringValue.split('.');
				wholePart = tmp[0];
				decimalPart = tmp[1];
			}
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

export { ContractValue };

import React from 'react';
import PropTypes from 'prop-types';
import { stats } from '../../config/const';
import { useEthers } from '../../app';
import { ContractValue } from './ContractValue';

function Statistic({ id, value }) {
	const { label, unit, link } = stats[id];

	const { connected } = useEthers();

	function renderLabel() {
		if (link) {
			return (
				<a href={link} target="_blank" rel="noreferrer">
					{label}
				</a>
			);
		} else {
			return label;
		}
	}

	return (
		<div className="stat">
			<div className="stat-label">{renderLabel()}</div>
			<div className="stat-value-unit">
				<div className="stat-value">{value ? value : <ContractValue id={id} />}</div>
				{unit ? <div className="stat-unit">{unit}</div> : null}
			</div>
		</div>
	);
}

Statistic.propTypes = {
	id: PropTypes.string.isRequired,
};

export { Statistic };

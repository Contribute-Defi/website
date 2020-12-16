import React from 'react';
import PropTypes from 'prop-types';
import { stats } from '../../config/const';
import { ContractValue } from './ContractValue';

function Statistic({ id, idSecondary, value, color = '' }) {
	const { label, unit, link } = stats[id];
	const unitSecondary = stats[idSecondary] ? stats[idSecondary].unit : null;

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
			<div className={`stat-label ${color ? `border-${color}` : ''}`}>{renderLabel()}</div>
			<div className="stat-value-unit">
				<div className="stat-value">{value ? value : <ContractValue id={id} />}</div>
				{unit ? <div className="stat-unit">{unit}</div> : null}
				{idSecondary ? (
					<div className="stat-secondary">
						<ContractValue id={idSecondary} /> {unitSecondary}
					</div>
				) : null}
			</div>
		</div>
	);
}

Statistic.propTypes = {
	id: PropTypes.string.isRequired,
};

export { Statistic };

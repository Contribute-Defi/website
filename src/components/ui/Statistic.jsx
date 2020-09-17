import React from 'react';
import PropTypes from 'prop-types';
import { stats } from '../../config/const';
import { useEthers } from '../../app';
import { ContractValue } from './ContractValue';

function Statistic({ id, value }) {
	const { label, unit } = stats[id];

	const { connected } = useEthers();

	return (
		<div className="stat">
			<div className="stat-label">{label}</div>
			<div className="stat-value-unit">
				{connected ? (
					<>
						<div className="stat-value">{value ? value : <ContractValue id={id} />}</div>
						{unit ? <div className="stat-unit">{unit}</div> : null}
					</>
				) : (
					<div className="stat-value bigstat-value lds-dual-ring" />
				)}
			</div>
		</div>
	);
}

Statistic.propTypes = {
	id: PropTypes.string.isRequired,
};

export { Statistic };

import React from 'react';
import PropTypes from 'prop-types';
import { stats } from '../../config/const';
import { useEthers } from '../../app';
import { ContractValue } from './ContractValue';

function Statistic({
	id,
}) {
	const { label, unit, image } = stats[id];

	const { connected } = useEthers();

	return (
		<div className="stat">
			{image ? <img className="stat-image" src={image} alt={label} /> : null}
			<div className="stat-label">{label}</div>
			<div className="stat-value-unit">
				{connected
					? (
						<>
							<div className="stat-value">
								<ContractValue id={id} />
							</div>
							{unit ? <div className="stat-unit">{unit}</div> : null}
						</>
					)
					: <div className="stat-value bigstat-value lds-dual-ring" />}
			</div>
		</div>
	);
}

Statistic.propTypes = {
	id: PropTypes.string.isRequired,
};

export { Statistic };

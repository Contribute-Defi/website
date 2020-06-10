import React from 'react';
import PropTypes from 'prop-types';
import ContractValue from './ContractValue';
import { stats } from '../config/const';

function Statistic({
	id,
}) {
	const { label, unit, image } = stats[id];
	const value = <ContractValue method={id} />;

	return (
		<div className="stat">
			{image ? <img className="stat-image" src={image} alt={label} /> : null}
			<div className="stat-label">{label}</div>
			<div className="stat-value-unit">
				{value ? (
					<>
						<div className="stat-value">
							{value}
						</div>
						{unit ?	<div className="stat-unit">{unit}</div>	: null}
					</>
				) : '-'}
			</div>
		</div>
	);
}

Statistic.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Statistic;

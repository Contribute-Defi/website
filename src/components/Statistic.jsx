import React from 'react';
import PropTypes from 'prop-types';

function Statistic({
	label, value, unit, image,
}) {
	return (
		<div className="stat">
			{image ? <img className="stat-image" src={image} alt={label} /> : null}
			<div className="stat-label">{label}</div>
			<div className="stat-value-unit">
				<div className="stat-value">{value}</div>
				{unit ?	<div className="stat-unit">{unit}</div>	: null}
			</div>
		</div>
	);
}

Statistic.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
	unit: PropTypes.string,
	image: PropTypes.string,
};

Statistic.defaultProps = {
	unit: null,
	image: null,
};

export default Statistic;

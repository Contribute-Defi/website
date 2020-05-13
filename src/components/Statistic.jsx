import React from 'react';
import PropTypes from 'prop-types';

function Statistic({ label, value, unit }) {
	return (
		<div className="stat">
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
};

Statistic.defaultProps = {
	unit: null,
};

export default Statistic;

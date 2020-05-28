import React from 'react';
import PropTypes from 'prop-types';

function Bigstat({
	label, value, unit, image, children,
}) {
	return (
		<div className="bigstat">
			<div className="clearfix">
				<div className="bigstat-image float-left mr-2">
					<img src={image} alt={label} />
				</div>
				<h3 className="fs-l font-weight-light pt-1 mb-0">{label}</h3>
				<div className="bigstat-value-unit">
					<span className="bigstat-value fs-xxl lh-1 mr-1">{value}</span>
					{unit ?	<span className="bigstat-unit">{unit}</span> : null}
				</div>
			</div>
			<hr />
			<p>
				{children}
			</p>
		</div>
	);
}

Bigstat.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	unit: PropTypes.string,
	image: PropTypes.string.isRequired,
	children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

Bigstat.defaultProps = {
	unit: null,
	value: null,
};

export default Bigstat;

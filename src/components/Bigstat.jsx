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
					<div className="bigstat-value fs-xxl lh-1">{value}</div>
					{unit ?	<div className="bigstat-unit">{unit}</div> : null}
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
	value: PropTypes.number.isRequired,
	unit: PropTypes.string,
	image: PropTypes.string.isRequired,
	children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

Bigstat.defaultProps = {
	unit: null,
};

export default Bigstat;

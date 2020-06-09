import React from 'react';
import PropTypes from 'prop-types';
import { stats } from '../config/const';
import ContractValue from './ContractValue';

function Bigstat({
	id, children,
}) {
	const { label, unit, image } = stats[id];
	const value = <ContractValue method={id} />;

	return (
		<div className="bigstat">
			<div className="clearfix">
				<div className="bigstat-image float-left mr-2">
					<img src={image} alt={label} />
				</div>
				<h3 className="fs-l font-weight-light pt-1 mb-1">{label}</h3>
				<div className="stat-value-unit bigstat-value-unit">
					<span className="stat-value bigstat-value lh-1 mr-1">{value}</span>
					{unit ?	<span className="stat-unit bigstat-unit">{unit}</span> : null}
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
	id: PropTypes.string.isRequired,
	children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default Bigstat;

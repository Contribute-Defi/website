import React from 'react';
import PropTypes from 'prop-types';
import { DrizzleContext } from '@drizzle/react-plugin';
import ContractValue from './ContractValue';
import { stats } from '../config/const';

function Statistic({
	id,
}) {
	const { label, unit, image } = stats[id];

	return (
		<div className="stat">
			{image ? <img className="stat-image" src={image} alt={label} /> : null}
			<div className="stat-label">{label}</div>
			<div className="stat-value-unit">
				<DrizzleContext.Consumer>
					{drizzleContext => {
						const { drizzleState, initialized } = drizzleContext;
						if (!initialized || drizzleState.web3.networkMismatch) {
							return <div className="stat-value bigstat-value lds-dual-ring" />;
						}
						return (
							<>
								<div className="stat-value">
									<ContractValue method={id} />
								</div>
								{unit ?	<div className="stat-unit">{unit}</div>	: null}
							</>
						);
					}}
				</DrizzleContext.Consumer>
			</div>
		</div>
	);
}

Statistic.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Statistic;

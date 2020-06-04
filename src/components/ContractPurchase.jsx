import React from 'react';
import PropTypes from 'prop-types';
import { DrizzleContext } from '@drizzle/react-plugin';
import ContractValueInner from './ContractValueInner';

const ContractPurchase = ({ method }) => (
	<DrizzleContext.Consumer>
		{drizzleContext => {
			const { drizzle, drizzleState, initialized } = drizzleContext;
			if (!initialized) {
				return null;
			}

			return <ContractPurchaseInner method={method} drizzle={drizzle} drizzleState={drizzleState} />;
		}}
	</DrizzleContext.Consumer>
);

ContractPurchase.propTypes = {
	method: PropTypes.string.isRequired,
};

export default ContractPurchase;

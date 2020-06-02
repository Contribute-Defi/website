import React from 'react';
import PropTypes from 'prop-types';
import { DrizzleContext } from '@drizzle/react-plugin';
import ContractValueInner from './ContractValueInner';

const ContractValue = ({ method }) => (
	<DrizzleContext.Consumer>
		{drizzleContext => {
			const { drizzle, drizzleState, initialized } = drizzleContext;
			if (!initialized) {
				return null;
			}

			return <ContractValueInner method={method} drizzle={drizzle} drizzleState={drizzleState} />;
		}}
	</DrizzleContext.Consumer>
);

ContractValue.propTypes = {
	method: PropTypes.string.isRequired,
};

export default ContractValue;

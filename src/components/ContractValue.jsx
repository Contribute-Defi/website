import React from 'react';
import PropTypes from 'prop-types';
import { DrizzleContext } from '@drizzle/react-plugin';
import ContractValueInner from './ContractValueInner';

const ContractValue = ({ method, contract, param }) => (
	<DrizzleContext.Consumer>
		{drizzleContext => {
			const { drizzle, drizzleState, initialized } = drizzleContext;
			if (!initialized || drizzleState.web3.networkMismatch) {
				return null;
			}

			return <ContractValueInner contract={contract} method={method} param={param} drizzle={drizzle} drizzleState={drizzleState} />;
		}}
	</DrizzleContext.Consumer>
);

ContractValue.propTypes = {
	method: PropTypes.string.isRequired,
	contract: PropTypes.string,
	param: PropTypes.string,
};

ContractValue.defaultProps = {
	contract: 'ViewContribute',
	param: null,
};

export default ContractValue;

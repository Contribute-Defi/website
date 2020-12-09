import React from 'react';
import gov from '../../assets/symbol.svg';

export function LogoGovernance() {
	return (
		<h1 className="text-uppercase d-flex justify-content-center align-items-center m-4">
			Trib G<img className="logoGovernance" src={gov} alt="" />
			vernance
		</h1>
	);
}

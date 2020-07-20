import React from 'react';

import Ethereum from '../../assets/ethereum.svg';

function SectionFooter() {
	return (
		<section className="section-footer text-center fs-xxs">
			<p className="mb-0">
				Powered by
				{' '}
				<img src={Ethereum} alt="Ethereum" />
				{' '}
				ethereum
			</p>
		</section>
	);
}

export default SectionFooter;

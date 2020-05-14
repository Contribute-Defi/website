import React from 'react';

import Ethereum from '../../assets/ethereum.svg';

function SectionFooter() {
	return (
		<section className="section-footer text-center">
			<p>
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

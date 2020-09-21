import React from 'react';

import Ethereum from '../../assets/ethereum.svg';

export function SectionFooter() {
	return (
		<section className="section-footer text-center fs-xxs">
			<p className="mb-0">
				<a href="https://ethereum.org" target="_blank" rel="noreferrer" className="text-dark">
					Powered by <img src={Ethereum} alt="Ethereum" /> ethereum
				</a>
			</p>
		</section>
	);
}

import React from 'react';

import { ComingSoon, Hero } from '../ui';

export function SectionComingSoon() {
	return (
		<section className="section-hero fullpage">
			<ComingSoon />
			<Hero />
			<div>
				<a className="btn btn-primary" href={process.env.WHITEPAPER_LINK} rel="noreferrer" target="_blank">
					Read the Whitepaper
				</a>
			</div>
		</section>
	);
}

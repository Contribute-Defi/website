import React from 'react';
import { Link } from 'react-router-dom';

import ComingSoon from '../ComingSoon';
import Hero from '../Hero';

const SectionComingSoon = () => (
	<section className="section-hero fullpage">
		<ComingSoon />
		<Hero />
		<div className="text-center fs-xxs pb-2">
			<Link to="/very-secret-page">sneak peek</Link>
		</div>
	</section>
);

export default SectionComingSoon;

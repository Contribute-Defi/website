import React from 'react';
import { Link } from 'react-router-dom';
import { LINKS } from '../../config/const';

export function Menu(props) {
	const { activePath } = props;

	const linkClass = 'text-uppercase m-0 mx-4';
	return (
		<nav>
			<ul className="links_container d-flex align-items-center m-0 p-0">
				<li className={`${linkClass} about-link  ${activePath === 'about' ? 'active-path' : ''}`}>
					<a href={LINKS.medium} target="blank">
						About
					</a>
				</li>
				<Link to="/">
					<li className={`${linkClass} trade-link ${activePath === 'trade' ? 'active-path' : ''}`}>Trade</li>
				</Link>
				<Link to="/govern">
					<li className={`${linkClass} govern-link ${activePath === 'govern' ? 'active-path' : ''}`}>
						Govern
					</li>
				</Link>
			</ul>
		</nav>
	);
}

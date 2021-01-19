import React from 'react';
import { Link } from 'react-router-dom';
import { LINKS } from '../../config/const';

export function Menu(props) {
	const { activePath } = props;
	const linkClass = 'text-uppercase m-0 mx-4';
	return (
		<nav>
			<ul className="links_container d-flex align-items-center m-0 p-0">
				<Link to="/">
					<li className={`${linkClass} trib-link ${activePath === 'trib' ? 'active-path' : ''}`}>Trib</li>
				</Link>
				<Link to="/tdao">
					<li className={`${linkClass} tdao-link ${activePath === 'tdao' ? 'active-path' : ''}`}>Tdao</li>
				</Link>
				<li className={`${linkClass} about-link  ${activePath === 'about' ? 'active-path' : ''}`}>
					<a href={LINKS.medium} target="blank">
						About
					</a>
				</li>
			</ul>
		</nav>
	);
}

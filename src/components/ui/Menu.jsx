import React from 'react';
import { Link } from 'react-router-dom';

export function Menu(props) {
	return (
		<nav>
			<ul className="links_container d-flex align-items-center m-0 p-0">
				<Link>
					<li
						className={`text-uppercase about-link m-0 mx-4 ${
							props.activePath == 'about' ? 'active-path' : ''
						}`}
					>
						About
					</li>
				</Link>
				<Link to="/">
					<li
						className={`text-uppercase trade-link m-0 mx-4 ${
							props.activePath == 'trade' ? 'active-path' : ''
						}`}
					>
						Trade
					</li>
				</Link>
				<Link to="/page3">
					<li
						className={`text-uppercase govern-link m-0 mx-4 ${
							props.activePath == 'govern' ? 'active-path' : ''
						}`}
					>
						Govern
					</li>
				</Link>
			</ul>
		</nav>
	);
}

import React from 'react';
import trib from '../../assets/trib.svg';

export function Logo() {
	return (
		<h1 className="text-uppercase d-flex justify-content-center align-items-center m-4">
			c
			<img className="logo" src={trib} alt="" />n<strong>trib</strong>ute
		</h1>
	);
}

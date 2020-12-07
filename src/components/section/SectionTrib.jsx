import React from 'react';
import contribute_trib from '../../assets/symbol.svg';

export function SectionTrib(props) {
	return (
		<div className="section-Trib text-center">
			<h2 className="trib_header text-uppercase d-flex justify-content-center align-items-center m-0">
				Trib G<img src={contribute_trib} alt="" />
				vernance
			</h2>
			<div className="timer_container_container">
				<h5 className="timer_header">Locked Liquidity Event start in</h5>
				<h3 className="timer_container d-flex align-items-center justify-content-center m-0">
					<p className="timer days_container m-0">
						<p className="time days m-0">05</p>
						<p className="time_text days-text">days</p>
					</p>
					<span className="colon align-self-start">:</span>
					<p className="timer hours_container m-0">
						<p className="time hours m-0">20</p>
						<p className="time_text hours-text">hours</p>
					</p>
					<span className="colon align-self-start">:</span>
					<p className="timer minutes_container m-0">
						<p className="time minutes m-0">12</p>
						<p className="time_text minutes-text">minutes</p>
					</p>
					<span className="colon align-self-start">:</span>
					<p className="timer seconds_container m-0">
						<p className="time seconds m-0">00</p>
						<p className="time_text seconds-text">seconds</p>
					</p>
				</h3>
			</div>
		</div>
	);
}

import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const DAY = 24 * 3600;
const HOUR = 3600;
const MINUTE = 60;

export function Countdown({ endDate }) {
	const [diff, setDiff] = useState({});
	const [tm, setTm] = useState();

	const updateDiff = () => {
		let now = dayjs.utc().unix();

		if (endDate < now) {
			setDiff({ days: 0, hours: 0, minutes: 0, seconds: 0 });
		} else {
			let diff = endDate - now;
			const days = Math.floor(diff / DAY);
			diff -= days * DAY;

			const hours = Math.floor(diff / HOUR);
			diff -= hours * HOUR;

			const minutes = Math.floor(diff / MINUTE);
			const seconds = diff - minutes * MINUTE;
			setDiff({
				days,
				hours,
				minutes,
				seconds,
			});
			setTm(window.setTimeout(updateDiff, 1000));
		}
	};

	useEffect(() => {
		if (endDate) {
			if (tm) {
				clearTimeout(tm);
			}
			updateDiff();
		}
	}, [endDate]);

	const plural = (str, num) => (num === 1 ? str : `${str}s`);
	const pad = (x) => (x ? x.toString().padStart(2, '0') : '00');

	const { days, hours, minutes, seconds } = diff;
	return (
		<div className="countdown">
			<span className="part">
				<span className="value">{days}</span>
				<span className="unit">{plural('day', days)}</span>
			</span>{' '}
			<span className="part">
				<span className="value">{pad(hours)}</span>
				<span className="unit">{plural('hour', hours)}</span>
			</span>{' '}
			<span className="part">
				<span className="value">{pad(minutes)}</span>
				<span className="unit">{plural('minute', minutes)}</span>
			</span>{' '}
			<span className="part">
				<span className="value">{pad(seconds)}</span>
				<span className="unit">{plural('second', seconds)}</span>
			</span>
		</div>
	);
}

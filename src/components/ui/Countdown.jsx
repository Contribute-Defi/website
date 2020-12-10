import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function Countdown({ endDate }) {
	let now = dayjs.utc();
	const end = dayjs.utc(endDate);
	const [diff, setDiff] = useState({});

	const updateDiff = () => {
		let endTemp = end;
		now = dayjs.utc();
		const days = endTemp.diff(now, 'days');
		endTemp = endTemp.subtract(days, 'days');

		const hours = endTemp.diff(now, 'hours');
		endTemp = endTemp.subtract(hours, 'hours');

		const minutes = endTemp.diff(now, 'minutes');
		endTemp = endTemp.subtract(minutes, 'minutes');

		const seconds = endTemp.diff(now, 'seconds');

		if (seconds < 0) {
			setDiff({ days: 0, hours: 0, minuts: 0, seconds: 0 });
		} else {
			setDiff({
				days,
				hours,
				minutes,
				seconds,
			});
			window.setTimeout(updateDiff, 1000);
		}
	};

	useEffect(() => {
		updateDiff();
	}, []);

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

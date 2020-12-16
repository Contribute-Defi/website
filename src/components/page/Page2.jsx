import React, { useState, useEffect } from 'react';
import {
	SectionEventDetails,
	SectionHeroGovernance,
	SectionFooter,
	SectionJoin,
	SectionPurchaseSimple,
	SectionIntroducing,
	SectionJoinContribute,
	SectionJoinContributeDao,
	SectionContributeTdao,
} from '../section';
import Header from '../ui/Header';
import SectionLiveStats from '../section/SectionLiveStats';
import { useContractValue, useEthers } from '../../app';
import SectionAccountInfo from '../section/SectionAccountInfo';

export function Page2() {
	const { provider } = useEthers();
	const [phase, setPhase] = useState(1);
	const [currentTime, setCurrentTime] = useState();
	const eventStartTime = useContractValue('eventStartTime');
	const eventEndTime = useContractValue('eventEndTime');
	const [phaseEndTime, setPhaseEndTime] = useState();

	useEffect(() => {
		if (provider) {
			provider.getBlock().then((block) => {
				setCurrentTime(block.timestamp);
			});
		}
	}, [provider]);

	useEffect(() => {
		if (eventStartTime && eventEndTime && currentTime) {
			const startTime = eventStartTime.toNumber();
			const endTime = eventEndTime.toNumber();
			console.log({ currentTime, startTime, endTime });
			if (currentTime < startTime) {
				setPhase(1);
				setPhaseEndTime(startTime);
			} else if (currentTime < endTime) {
				setPhase(2);
				setPhaseEndTime(endTime);
			} else {
				setPhase(3);
			}
		}
	}, [eventStartTime, eventEndTime, currentTime]);

	console.log({ phase, phaseEndTime });
	return (
		<div className="page2">
			<Header activePath="govern" />
			<SectionHeroGovernance phase={phase} endTime={phaseEndTime} />
			{phase >= 2 && <SectionLiveStats />}
			<SectionIntroducing />
			{phase === 1 && <SectionEventDetails />}
			{phase === 1 && <SectionPurchaseSimple />}
			{phase === 1 && <SectionJoinContribute />}
			{phase === 2 && <SectionJoinContributeDao />}
			{phase === 2 && <SectionContributeTdao />}
			{phase === 3 && <SectionAccountInfo />}
			<SectionJoin />
			<SectionFooter />
		</div>
	);
}

export default Page2;

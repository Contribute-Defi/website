import React, { useState, useEffect } from 'react';
import {
	SectionEventDetails,
	SectionHeroGovernance,
	SectionFooter,
	SectionJoin,
	SectionPurchaseSimple,
	SectionIntroducing,
	SectionJoinContribute,
	SectionJoinColumn,
	SectionContributeTdao,
	SectionNFT,
} from '../section';
import Header from '../ui/Header';
import SectionLiveStats from '../section/SectionLiveStats';
import { useContractValue, useEthers } from '../../app';
import SectionAccountInfo from '../section/SectionAccountInfo';
import SectionStakeEarn from '../section/SectionStakeEarn';

export function PageGovern() {
	const { address, provider, onUpdate } = useEthers();
	const [phase, setPhase] = useState(1);
	const [currentTime, setCurrentTime] = useState();
	const eventStartTime = useContractValue('eventStartTime');
	const eventEndTime = useContractValue('eventEndTime');
	const [phaseEndTime, setPhaseEndTime] = useState();
	const tribContributed = useContractValue('lleAccountContributed', [address]);
	const [hasClaimed, setHasClaimed] = useState(false);

	useEffect(() => {
		setHasClaimed(tribContributed == 0 ? true : false);
	}, [tribContributed]);

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

	const startTime = eventStartTime ? eventStartTime.toNumber() : undefined;
	const endTime = eventEndTime ? eventEndTime.toNumber() : undefined;

	console.log({ currentTime, startTime, endTime, phase });

	return (
		<div className="page2">
			<Header activePath="tdao" />
			<SectionHeroGovernance phase={phase} endTime={phaseEndTime} />
			{phase >= 2 && <SectionLiveStats phase={phase} />}
			<SectionIntroducing />
			{phase === 1 && <SectionEventDetails startTime={startTime} endTime={endTime} />}
			{phase === 1 && <SectionPurchaseSimple />}
			{phase === 1 && <SectionJoinContribute />}
			{phase === 2 && <SectionJoinColumn />}
			{phase === 2 && <SectionContributeTdao />}
			{((phase === 2 && address) || (phase === 3 && !hasClaimed && address)) && (
				<SectionAccountInfo phase={phase} hasClaimed={hasClaimed} onClaimed={onUpdate} />
			)}
			{phase === 3 && hasClaimed && <SectionStakeEarn phase={phase} />}
			{phase >= 2 && <SectionNFT />}
			<SectionJoin />
			<SectionFooter />
		</div>
	);
}

export default PageGovern;

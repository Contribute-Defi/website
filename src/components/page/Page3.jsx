import React from 'react';
import SectionLiveStats from '../section/SectionLiveStats';
import { SectionHeroGovernance, SectionJoin, SectionFooter, SectionIntroducing } from '../section';
import Header from '../ui/Header';
import SectionJoinColumn from '../section/SectionJoinColumn';
import SectionParticipate from '../section/SectionParticipate';
import SectionAccountInfo from '../section/SectionAccountInfo';
import SectionStakeEarn from '../section/SectionStakeEarn';
import SectionNft from '../section/SectionNft';
import SectionClaimReward from '../section/SectionClaimReward';

export function Page3(props) {
	return (
		<div className="page3">
			<Header activePath="trade" />
			<SectionHeroGovernance />
			<SectionLiveStats />
			<SectionIntroducing />
			<SectionJoinColumn />
			<SectionParticipate />
			<SectionAccountInfo />
			<SectionStakeEarn />
			<SectionNft />
			<SectionClaimReward />
			<SectionJoin />
			<SectionFooter />
		</div>
	);
}

export default Page3;

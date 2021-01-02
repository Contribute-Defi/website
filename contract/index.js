import Contribute from './Contribute.json';
import ContributeMock from './ContributeMock.json';
import genesis from './Genesis.json';
import trib from './Trib.json';
import musd from './mUSD.json';
import vault from './Vault.json';
import router from './TribRouter.json';
import nftRewardsVault from './NFTRewardsVault.json';
import trigRewardsVault from './TrigRewardsVault.json';
import rewardsVault from './RewardsVault.json';
import lockedLiquidityEvent from './LockedLiquidityEvent.json';
import tribRouterLLE from './TribRouterLLE.json';
import uiView from './UIView.json';
import trig from './TRIG.json';
import feeController from './FeeController.json';
import ierc20 from './IERC20.json';
import nft from './NFT.json';

const contribute = process.env.TEST === '1' ? ContributeMock : Contribute;

export const artifacts = {
	contribute,
	genesis,
	trib,
	musd,
	vault,
	router,
	nftRewardsVault,
	trigRewardsVault,
	rewardsVault,
	lockedLiquidityEvent,
	tribRouterLLE,
	uiView,
	trig,
	feeController,
	ierc20,
	nft,
};

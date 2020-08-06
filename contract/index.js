import _contributeContract from './Contribute.json';
import _viewContributeContract from './ViewContribute.json';
import _erc20Contract from './ERC20.json';
import _genesisContract from './Genesis.json';
import _tribContract from './Trib.json';
import _musdContract from './mUSD.json';

export const contributeContractArtifacts = _contributeContract;
export const viewContributeContractArtifacts = _viewContributeContract;
export const erc20ContractArtifacts = _erc20Contract;
export const genesisArtifacts = _genesisContract;
export const tribArtifacts = _tribContract;
export const musdArtifacts = _musdContract;

export const artifacts = {
	contribute: _contributeContract,
	viewContribute: _viewContributeContract,
	erc20: _erc20Contract,
	genesis: _genesisContract,
	trib: _tribContract,
	musd: _musdContract,
};

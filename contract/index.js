import _contributeContract from './Contribute.json';
import _contributeMockContract from './ContributeMock.json';
import _genesisContract from './Genesis.json';
import _tribContract from './Trib.json';
import _musdContract from './mUSD.json';
import _vaultContract from './Vault.json';

const contribute = process.env.TEST === '1' ? _contributeMockContract : _contributeContract;

export const artifacts = {
	contribute,
	genesis: _genesisContract,
	trib: _tribContract,
	musd: _musdContract,
	vault: _vaultContract,
};

import React, { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import { Metamask } from '../lib';
import { getContract } from './contracts';

export const EthersContext = React.createContext({});

export const EthersStatus = {
	DISCONNECTED: 1,
	CONNECTED: 2,
	FAILED: 3,
	WRONG_NETWORK: 4,
};

const DISCONNECTED_CONTRACT_CONFIG = {
	status: EthersStatus.DISCONNECTED,
	networkId: process.env.DEFAULT_ETHER_NETWORK_ID,
	provider: new ethers.providers.EtherscanProvider(
		process.env.DEFAULT_ETHER_NETWORK_NAME,
		process.env.ETHERSCAN_API_KEY,
	),
};

export function EthersProvider({ children }) {
	const [provider, setProvider] = useState();
	const [signer, setSigner] = useState();
	const [networkId, setNetworkId] = useState();
	const [status, setStatus] = useState();
	const [address, setAddress] = useState();
	const [contracts, setContracts] = useState();
	const [isGenesis, setIsGenesis] = useState();
	const [error, setError] = useState();
	const [timestamp, setTimestamp] = useState(0);

	let metamask;
	if (process.browser && window.ethereum) {
		metamask = new Metamask(window.ethereum);
	}

	let initialized = false;

	useEffect(() => {
		connect(true);
	}, []);

	useEffect(() => {
		(async () => {
			if (initialized) {
				await setupContracts({ status, signer, provider, networkId });
			}
		})();
	}, [status]);

	useEffect(() => {
		(async () => {
			if (initialized && contracts && contracts.contribute) {
				setIsGenesis(await contracts.contribute.GME());
			}
		})();
	}, [contracts, timestamp]);

	useEffect(() => {
		// eslint-disable-next-line no-unused-vars
		const updateAddress = async () => {
			if (initialized && provider) {
				const accounts = await provider.listAccounts();
				if (accounts && accounts.length > 0) {
					setAddress(accounts[0]);
				}
			}
		};
	});

	async function connect(silent) {
		let contractConfiguration;
		if (!metamask) {
			contractConfiguration = DISCONNECTED_CONTRACT_CONFIG;
		} else {
			const ethereum = await metamask.initAndConnect(silent);
			if (ethereum) {
				contractConfiguration = await extractContractConfigFromMetamask(ethereum);
			} else {
				contractConfiguration = DISCONNECTED_CONTRACT_CONFIG;
			}
		}
		setNetworkId(contractConfiguration.networkId);
		setSigner(contractConfiguration.signer);
		setProvider(contractConfiguration.provider);
		setAddress(contractConfiguration.address);
		await setupContracts(contractConfiguration);
		setStatus(contractConfiguration.status);
		initialized = true;
	}

	async function extractContractConfigFromMetamask(metamaskEthereum) {
		const provider = new ethers.providers.Web3Provider(metamaskEthereum);
		const accounts = await provider.listAccounts();
		const hasAccount = accounts && accounts.length > 0;
		const signer = provider.getSigner();
		const networkId = await signer.getChainId();
		const status = hasAccount ? EthersStatus.CONNECTED : EthersStatus.DISCONNECTED;
		return {
			status,
			networkId,
			provider,
			signer,
			address: hasAccount ? accounts[0] : undefined,
		};
	}

	async function setupContracts(config) {
		const { status, signer, provider, networkId } = config;
		let networkAccessor = status === EthersStatus.CONNECTED && signer ? signer : provider;
		try {
			const contribute = getContract('contribute', { networkId, networkAccessor });
			const genesisAddress = await contribute.genesis();
			const tribAddress = await contribute.token();
			const musdAddress = await contribute.reserve();
			const vaultAddress = await contribute.vault();
			const isGenesis = await contribute.GME();

			const genesis = getContract('genesis', { address: genesisAddress, networkAccessor });
			const trib = getContract('trib', { address: tribAddress, networkAccessor });
			const musd = getContract('musd', { address: musdAddress, networkAccessor });
			const vault = getContract('vault', { address: vaultAddress, networkAccessor });
			const router = getContract('router', { networkId, networkAccessor });

			const nftRewardsVault = getContract('nftRewardsVault', { networkId, networkAccessor });
			const trigRewardsVault = getContract('trigRewardsVault', { networkId, networkAccessor });
			const rewardsVault = getContract('rewardsVault', { networkId, networkAccessor });
			const lockedLiquidityEvent = getContract('lockedLiquidityEvent', { networkId, networkAccessor });
			const tribRouterLLE = getContract('tribRouterLLE', { networkId, networkAccessor });
			const uiView = getContract('uiView', { networkId, networkAccessor });
			const trig = getContract('trig', { networkId, networkAccessor });
			const feeController = getContract('feeController', { networkId, networkAccessor });
			const ethTdaoLpAddress = await feeController.pairWETH();
			const pairWeth = getContract('ierc20', { address: ethTdaoLpAddress, networkAccessor });
			const nftAddress = await lockedLiquidityEvent.nft();
			const nft = getContract('nft', { address: nftAddress, networkAccessor });

			setContracts({
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
				pairWeth,
				nft,
			});
			setIsGenesis(isGenesis);
		} catch (e) {
			console.error(e);
			setError(e.message);
			setStatus(EthersStatus.WRONG_NETWORK);
		}
	}

	async function disconnect() {
		if (!metamask) {
			return;
		}
		await metamask.disconnect();
		setProvider(DISCONNECTED_CONTRACT_CONFIG.provider);
		setNetworkId(DISCONNECTED_CONTRACT_CONFIG.networkId);
		setSigner(undefined);
		setAddress(undefined);
		setStatus(EthersStatus.DISCONNECTED);
	}

	return (
		<EthersContext.Provider
			value={{
				provider,
				signer,
				status,
				connected: status === EthersStatus.CONNECTED,
				address,
				networkId,
				connect,
				disconnect,
				contracts,
				error,
				timestamp,
				isGenesis,
				onUpdate: () => setTimestamp(Date.now()),
			}}
		>
			{children}
		</EthersContext.Provider>
	);
}

EthersProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export function useEthers() {
	return useContext(EthersContext);
}

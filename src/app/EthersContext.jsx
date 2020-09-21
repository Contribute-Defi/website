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

export function EthersProvider({ children }) {
	const [provider, setProvider] = useState(undefined);
	const [signer, setSigner] = useState();
	const [networkId, setNetworkId] = useState();
	const [status, setStatus] = useState(EthersStatus.DISCONNECTED);
	const [address, setAddress] = useState();
	const [contracts, setContracts] = useState();
	const [isGenesis, setIsGenesis] = useState();
	const [error, setError] = useState();
	const [timestamp, setTimestamp] = useState(Date.now());

	let metamask;
	if (process.browser && window.ethereum) {
		metamask = new Metamask(window.ethereum);
	}

	useEffect(() => {
		(async () => {
			if (status === EthersStatus.CONNECTED && networkId && signer) {
				try {
					const contribute = getContract('contribute', { networkId, signer });
					const genesisAddress = await contribute.genesis();
					const tribAddress = await contribute.token();
					const musdAddress = await contribute.reserve();
					const vaultAddress = await contribute.vault();
					const isGenesis = await contribute.GME();
					const genesis = getContract('genesis', { address: genesisAddress, signer });
					const trib = getContract('trib', { address: tribAddress, signer });
					const musd = getContract('musd', { address: musdAddress, signer });
					const vault = getContract('vault', { address: vaultAddress, signer });
					setContracts({
						contribute,
						genesis,
						trib,
						musd,
						vault,
					});
					setIsGenesis(isGenesis);
				} catch (e) {
					console.error(e);
					setError(e.message);
					setStatus(EthersStatus.WRONG_NETWORK);
				}
			}
		})();
	}, [networkId, signer, status]);

	useEffect(() => {
		(async () => {
			if (contracts && contracts.contribute) {
				setIsGenesis(await contracts.contribute.GME());
			}
		})();
	}, [contracts, timestamp]);

	async function connect(silent) {
		if (!metamask) {
			return;
		}
		const ethereum = await metamask.initAndConnect(silent);
		if (ethereum) {
			const _provider = new ethers.providers.Web3Provider(ethereum);
			setProvider(_provider);
			if (_provider) {
				const _signer = _provider.getSigner();
				setSigner(_signer);
				const _networkId = await _signer.getChainId();
				setNetworkId(_networkId);
				const accounts = await _provider.listAccounts();
				if (accounts && accounts.length > 0) {
					setAddress(accounts[0]);
					setStatus(EthersStatus.CONNECTED);
				}
			}
		} else {
			setStatus(EthersStatus.FAILED);
		}
	}

	useEffect(() => {
		connect(true);
	}, []);

	useEffect(() => {
		// eslint-disable-next-line no-unused-vars
		const updateAddress = async () => {
			if (provider) {
				const accounts = await provider.listAccounts();
				if (accounts && accounts.length > 0) {
					setAddress(accounts[0]);
				}
			}
		};
	});

	async function disconnect() {
		if (!metamask) {
			return;
		}
		await metamask.disconnect();
		setProvider(undefined);
		setSigner(undefined);
		setAddress(undefined);
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

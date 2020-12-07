import { Contract } from 'ethers';
import { artifacts } from '../../contract';

export function getContract(contractName, config) {
	const { address, networkId, networkAccessor } = config;
	if (!networkAccessor) {
		throw new Error('Must provide either an ether signer or provider');
	}
	const contractArtifacts = artifacts[contractName];
	if (!contractArtifacts || !contractArtifacts.abi) {
		throw new Error(`Contract '${contractName}' artifacts not defined`);
	}
	const { networks, abi } = contractArtifacts;
	let contractAddress;
	if (address) {
		contractAddress = address;
	} else {
		if (!networks || !networks[networkId]) {
			throw new Error(`Contract '${contractName}' not deployed on network '${networkId}'`);
		}
		contractAddress = networks[networkId].address;
	}
	return new Contract(contractAddress, abi, networkAccessor);
}

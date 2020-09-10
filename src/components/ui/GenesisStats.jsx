import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useEthers } from '../../app';
import { shortenAddress } from '../../lib';
import { ContractValue } from './ContractValue';


export function GenesisStats() {
	const { address, connected, contracts } = useEthers();
	const [share, setShare] = useState();

	useEffect(() => {
		if (contracts) {
			recountShare();
		}
	}, [contracts]);

	const recountShare = async () => {
		const total = await contracts.genesis.totalTokenBalance();
		const mine = await contracts.genesis.getShare(address);
		const share = mine.mul(100000)
			.div(total)
			.toNumber() / 1000;

		setShare(share);
	};

	if (!connected) return null;

	return (
		<Row className="justify-content-center">
			<Col md="6">
				<Table striped hover variant="dark">
					<tbody>
					<tr>
						<td className="text-left">
							Connected account
						</td>
						<td className="text-right">
							<strong title={address}>{shortenAddress(address)}</strong>
						</td>
					</tr>
					<tr>
						<td className="text-left">
							Your Current Share
						</td>
						<td className="text-right"><strong>{share} %</strong></td>
					</tr>
					<tr>
						<td className="text-left">
							You Will Receive
						</td>
						<td className="text-right">
							<strong><ContractValue id="genesisReceive" params={[address]}/> TRIB</strong>
						</td>
					</tr>
					</tbody>
				</Table>
				<Button disabled variant="light">Claim TRIB</Button>
			</Col>
		</Row>
	);
}

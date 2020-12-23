import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Statistic } from './Statistic';
import { useEthers } from '../../app';
import { nfts } from '../../config/const';
import { parseUnits } from 'ethers/lib/utils';
import { TransactionModal } from './TransactionModal';

const defaultToggles = {
	VISIONARY: true,
	EXPLORER: true,
	ALCHEMIST: true,
	VOYAGER: true,
	LEGEND: true,
	SUPREME: true,
	IMMORTAL: true,
	DIVINITY: true,
};

export function StakeNft() {
	const { address, contracts, onUpdate } = useEthers();
	const [toggles, setToggles] = useState(defaultToggles);
	const [inputs, setInputs] = useState({});
	const [transactionStatus, setTransactionStatus] = useState(0);

	const [nftBalances, setNftBalances] = useState();

	useEffect(() => {
		const ids = Object.values(nfts);
		const addresses = ids.map((x) => address);
		console.log('get nft balances', { addresses, ids });
		contracts.uiView.nftBalance(ids, addresses).then((result) => {
			console.log('NFT BALANCES VOLE RESULT', { result });
			setNftBalances(result.map((x) => x.toNumber()));
		});
		// contracts.nftRewardsVault.userInfo(address, id); ... to be finished
	}, [address]);

	function handleToggle(key) {
		setToggles({ ...toggles, [key]: !toggles[key] });
	}

	function handleChangeInput(key, value) {
		setInputs({ ...inputs, [key]: value });
	}

	const handleDeposit = async (nftId) => {
		const amount = parseUnits(inputs[`stake${nftId}`]);
		await handleTransaction(async () => await contracts.trigRewardsVault.deposit(0, amount));
	};

	const handleWithdraw = async (nftId, claim = false) => {
		const amount = claim ? 0 : parseUnits(inputs[`unstake${nftId}`]);
		await handleTransaction(async () => await contracts.trigRewardsVault.withdraw(0, amount));
	};

	async function handleTransaction(callback) {
		try {
			setTransactionStatus(1);
			const t = await callback();
			setTransactionStatus(2);
			await t.wait();
			setTransactionStatus(3);
			onUpdate();
		} catch (e) {
			console.error(e);
			setTransactionStatus(10);
		}
	}

	// const myNfts = nftBalances ? Object.entries(nfts).filter(([nftName, id]) => nftBalances[id] > 0) : [];

	return (
		<>
			{Object.entries(nfts).map(([nftName, nftId]) => (
				<div className="border-nft mb-4" key={nftName}>
					<Row className="mb-3">
						<Col sm={4}>
							<h4>{nftName}</h4>
						</Col>
						<Col sm={8} className="text-right">
							<Button href="https://app.uniswap.org" variant="outline-secondary">
								Trade In Uniswap
							</Button>
							&nbsp;
							<Button variant="outline-secondary" onClick={() => handleWithdraw(nftId, true)}>
								Claim rewards
							</Button>
							&nbsp;
							<Button onClick={() => handleToggle(nftName)} variant="link">
								{toggles[nftName] ? '▲' : '▼'}
							</Button>
						</Col>
					</Row>
					{toggles[nftName] && (
						<>
							<Row>
								<Col>
									<Statistic id="apyNft" params={[address, nftId, false]} />
								</Col>
								<Col>
									<Statistic id="nftBalance" value={(nftBalances && nftBalances[nftId]) || 0} />
								</Col>
								<Col>
									<Statistic id="nftStaked" params={[nftId, address]} />
								</Col>
								<Col>
									<Statistic id="nftPendingReward" params={[nftId, address]} />
								</Col>
								<Col>
									<Statistic id="nftValue" params={[nftId, address]} />
								</Col>
							</Row>
							<hr />
							<Row className="mb-3">
								<Col sm={6}>
									<InputGroup>
										<Form.Control
											type="number"
											id="trigStake"
											value={inputs[`stake${nftId}`] || 0}
											onChange={(e) =>
												handleChangeInput('nftStake', `stake${nftId}`, e.target.value)
											}
										/>
									</InputGroup>
								</Col>
								<Col sm={6}>
									<InputGroup>
										<Form.Control
											type="number"
											id="trigUnstake"
											value={inputs[`unstake${nftId}`] || 0}
											onChange={(e) =>
												handleChangeInput('nftUnstake', `unstake${nftId}`, e.target.value)
											}
										/>
									</InputGroup>
								</Col>
							</Row>
							<Row className="pb-2">
								<Col sm={6}>
									<Button onClick={() => handleDeposit(nftId)} block variant="outline-secondary">
										Stake
									</Button>
								</Col>
								<Col sm={6}>
									<Button onClick={() => handleWithdraw(nftId)} block variant="outline-secondary">
										Unstake
									</Button>
								</Col>
							</Row>
						</>
					)}
				</div>
			))}{' '}
			<TransactionModal status={transactionStatus} onHide={() => setTransactionStatus(0)} />
		</>
	);
}

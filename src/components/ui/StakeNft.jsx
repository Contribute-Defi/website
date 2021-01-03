import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Statistic } from './Statistic';
import { useEthers } from '../../app';
import { nfts } from '../../config/const';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { TransactionModal } from './TransactionModal';

const defaultToggles = {
	VISIONARY: false,
	EXPLORER: false,
	ALCHEMIST: false,
	VOYAGER: false,
	LEGEND: false,
	SUPREME: false,
	IMMORTAL: false,
	DIVINITY: false,
};

const nftPrices = [500, 2000, 5000, 10000, 20000, 50000, 100000, 50000];

export function StakeNft() {
	const { address, contracts, onUpdate } = useEthers();
	const [toggles, setToggles] = useState(defaultToggles);
	const [inputs, setInputs] = useState({});
	const [transactionStatus, setTransactionStatus] = useState(0);
	const [ts, setTs] = useState(Date.now()); // this is for keeping nft balances in sync

	const [apys, setApys] = useState({});
	const [nftBalances, setNftBalances] = useState();

	async function calcApy(nftName) {
		const id = nfts[nftName];
		try {
			const totalAllocPoint = await contracts.nftRewardsVault.totalAllocPoint();
			const poolInfo = await contracts.nftRewardsVault.poolInfo(id);
			const poolAllocationPoint = poolInfo.allocPoint;
			const rewardsPerSecond = await contracts.nftRewardsVault.avgFeesPerSecondTotal();
			const totalStaked = await contracts.nft.balanceOf(contracts.nftRewardsVault.address, id);
			const ether = parseUnits('1');

			const tribPriceUSD = await contracts.uiView.tribPriceUSD();
			const nftUSD = tribPriceUSD.mul(nftPrices[id].toString());
			let totalStakedUSD = totalStaked.mul(nftUSD);
			totalStakedUSD = totalStakedUSD.eq(0) ? nftUSD : totalStakedUSD;

			const tdaoUSD = await contracts.uiView.tdaoPriceUSD(true);
			const rewardsPerYear = rewardsPerSecond.mul('31536000');
			const rewardYearUSD = rewardsPerYear.mul(tdaoUSD).div(ether);

			const apy = rewardYearUSD.mul(poolAllocationPoint).mul(ether).div(totalStakedUSD).div(totalAllocPoint);
			const floatApy = Number(formatUnits(apy)) * 100;
			let niceApy = floatApy.toFixed(2);
			setApys({ ...apys, [id]: niceApy });
		} catch (e) {
			console.log(e);
			setApys({ ...apys, [id]: '00.000' });
		}
	}

	useEffect(() => {
		const ids = Object.values(nfts);
		const addresses = ids.map((x) => address);
		contracts.uiView.nftBalance(addresses, ids).then((result) => {
			setNftBalances(result.map((x) => x.toNumber()));
		});
		// contracts.nftRewardsVault.userInfo(address, id); ... to be finished
	}, [address, ts]);

	function handleToggle(key) {
		// since nfts are collapsed by default, makes more sense to only compute the APY we need on toggle.
		// note: we could do the same with NFT balances, but we get those with a single call so it's easier to keep it
		setToggles({ ...toggles, [key]: !toggles[key] });
		const willOpen = !toggles[key];
		if (willOpen) calcApy(key);
	}

	function handleChangeInput(key, value) {
		setInputs({ ...inputs, [key]: value });
	}

	const handleDeposit = async (nftId) => {
		if (!inputs[`stake${nftId}`]) return;
		const amount = inputs[`stake${nftId}`];
		await handleTransaction(async () => await contracts.nftRewardsVault.deposit(nftId, amount));
		setInputs({ ...inputs, [`stake${nftId}`]: 0 });
		setTs(Date.now());
	};

	const handleWithdraw = async (nftId, claim = false) => {
		if (!claim && !inputs[`unstake${nftId}`]) return;
		const amount = claim ? 0 : inputs[`unstake${nftId}`];
		await handleTransaction(async () => await contracts.nftRewardsVault.withdraw(nftId, amount));
		setInputs({ ...inputs, [`unstake${nftId}`]: 0 });
		setTs(Date.now());
	};

	const handleUpdateStake = async (nftId) => {
		setInputs({ ...inputs, [`stake${nftId}`]: nftBalances[nftId], [`unstake${nftId}`]: 0 });
	};

	const handleUpdateUnstake = async (nftId) => {
		const result = await contracts.nftRewardsVault.userInfo(nftId, address);
		const amount = result.amount.toNumber();
		setInputs({ ...inputs, [`unstake${nftId}`]: amount, [`stake${nftId}`]: 0 });
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
	console.log({ apys });

	return (
		<>
			{Object.entries(nfts).map(([nftName, nftId]) => (
				<div className="border-nft mb-4" key={nftName}>
					<Row className="mb-3  stake-earn-header">
						<Col sm={4}>
							<h4>{nftName}</h4>
						</Col>
						<Col sm={8} className="text-right">
							<Button href="https://app.uniswap.org" variant="outline-secondary">
								Trade in OpenSea
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
							<hr />
							<Row>
								<Col>
									<Statistic id="apyNft" value={apys[nftId] || 0} />
								</Col>
								<Col onClick={() => handleUpdateStake(nftId)}>
									<Statistic id="nftBalance" value={(nftBalances && nftBalances[nftId]) || 0} />
								</Col>
								<Col onClick={() => handleUpdateUnstake(nftId)}>
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
											onChange={(e) => handleChangeInput(`stake${nftId}`, e.target.value)}
										/>
									</InputGroup>
								</Col>
								<Col sm={6}>
									<InputGroup>
										<Form.Control
											type="number"
											id="trigUnstake"
											value={inputs[`unstake${nftId}`] || 0}
											onChange={(e) => handleChangeInput(`unstake${nftId}`, e.target.value)}
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

import React, { useState, useEffect } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Statistic } from './Statistic';
import { useContractValue, useEthers } from '../../app';
import { TransactionModal } from './TransactionModal';
import { formatUnits, parseUnits } from 'ethers/lib/utils';

export function StakeTrig() {
	const { address, contracts, onUpdate } = useEthers();
	const [toggle, setToggle] = useState(true);
	const [inputs, setInputs] = useState({});
	const [transactionStatus, setTransactionStatus] = useState(0);
	const [apy, setApy] = useState('00.00');
	const trigBalance = useContractValue('trigBalance', [address]);
	const trigStaked = useContractValue('trigStaked', [address]);

	async function calcApy() {
		try {
			const ether = parseUnits('1');

			const totalStaked = await contracts.trig.balanceOf(contracts.trigRewardsVault.address);
			const trigUSD = await contracts.uiView.trigPriceUSD(false);
			let totalStakedUSD = totalStaked.mul(trigUSD).div(ether);
			totalStakedUSD = totalStakedUSD.eq(0) ? trigUSD : totalStakedUSD;

			const tdaoUSD = await contracts.uiView.tdaoPriceUSD(true);
			const rewardsPerSecond = await contracts.trigRewardsVault.avgFeesPerSecondTotal();
			const rewardsPerYear = rewardsPerSecond.mul('31536000');
			const rewardYearUSD = rewardsPerYear.mul(tdaoUSD).div(ether);

			const apy = rewardYearUSD.mul(ether).div(totalStakedUSD);
			const floatApy = Number(formatUnits(apy)) * 100;
			let niceApy = floatApy.toFixed(2);
			setApy(niceApy);
		} catch (e) {
			console.log(e);
			setApy('00.000');
		}
	}

	useEffect(() => {
		if (contracts) {
			calcApy();
		}
	}, [contracts]);

	function handleToggle() {
		setToggle(!toggle);
	}

	function handleChangeInput(key, value) {
		setInputs({ ...inputs, [key]: value });
	}

	const handleDeposit = async (amount) => {
		if (!amount) return;
		amount = parseUnits(amount);
		await handleTransaction(async () => await contracts.trigRewardsVault.deposit(0, amount));
	};

	const handleWithdraw = async (amount) => {
		if (!amount) return;
		amount = parseUnits(amount);
		await handleTransaction(async () => await contracts.trigRewardsVault.withdraw(0, amount));
	};

	const handleClaim = async () => {
		await handleTransaction(async () => await contracts.trigRewardsVault.withdraw(0, 0));
	};

	const handleUpdateStake = async () => {
		setInputs({ ...inputs, stake: formatUnits(trigBalance), unstake: 0 });
	};

	const handleUpdateUnstake = async () => {
		setInputs({ ...inputs, unstake: formatUnits(trigStaked), stake: 0 });
	};

	async function handleTransaction(callback) {
		try {
			setTransactionStatus(1);
			const t = await callback();
			setTransactionStatus(2);
			await t.wait();
			setTransactionStatus(3);
			onUpdate();
			setInputs({});
		} catch (e) {
			console.error(e);
			setTransactionStatus(10);
		}
	}

	return (
		<div className="border-trig mb-4">
			<Row className="mb-3 stake-earn-header">
				<Col sm={4}>
					<h4>TRIG</h4>
				</Col>
				<Col sm={8} className="text-right">
					<Button href="https://app.uniswap.org" variant="outline-secondary">
						Trade In Uniswap
					</Button>
					&nbsp;
					<Button onClick={() => handleClaim(0)}>Claim rewards</Button>
					&nbsp;
					<Button onClick={() => handleToggle()} variant="link">
						{toggle ? '▲' : '▼'}
					</Button>
				</Col>
			</Row>
			{toggle && (
				<>
					<hr />
					<Row>
						<Col>
							<Statistic id="apyTrig" value={apy} />
						</Col>
						<Col onClick={() => handleUpdateStake()}>
							<Statistic id="trigBalance" params={[address]} />
						</Col>
						<Col onClick={() => handleUpdateUnstake()}>
							<Statistic id="trigStaked" params={[address]} />
						</Col>
						<Col>
							<Statistic id="trigPendingReward" params={[address]} />
						</Col>
						<Col>
							<Statistic id="trigValue" params={[address]} />
						</Col>
					</Row>
					<hr />
					<Row className="mb-3">
						<Col sm={6}>
							<InputGroup>
								<Form.Control
									type="number"
									id="stake"
									value={inputs.stake || 0}
									onChange={(e) => handleChangeInput('stake', e.target.value)}
								/>
							</InputGroup>
						</Col>
						<Col sm={6}>
							<InputGroup>
								<Form.Control
									type="number"
									id="unstake"
									value={inputs.unstake || 0}
									onChange={(e) => handleChangeInput('unstake', e.target.value)}
								/>
							</InputGroup>
						</Col>
					</Row>
					<Row className="pb-2">
						<Col sm={6}>
							<Button onClick={() => handleDeposit(inputs['stake'])} block>
								Stake
							</Button>
						</Col>
						<Col sm={6}>
							<Button onClick={() => handleWithdraw(inputs['unstake'])} block>
								Unstake
							</Button>
						</Col>
					</Row>
				</>
			)}
			<TransactionModal status={transactionStatus} onHide={() => setTransactionStatus(0)} />
		</div>
	);
}

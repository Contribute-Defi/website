import React, { useState, useEffect } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Statistic } from './Statistic';
import { useContractValue, useEthers } from '../../app';
import { TransactionModal } from './TransactionModal';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

export function StakeLp() {
	const { address, contracts, onUpdate } = useEthers();
	const [toggle, setToggle] = useState(true);
	const [inputs, setInputs] = useState({});
	const [transactionStatus, setTransactionStatus] = useState(0);
	const [apy, setApy] = useState('00.00');
	const lpBalance = useContractValue('lpBalance', [address]);
	const lpStaked = useContractValue('lpStaked', [address]);

	async function calcApy() {
		try {
			const ether = parseUnits('1');

			const totalStaked = await contracts.pairWeth.balanceOf(contracts.rewardsVault.address);
			const lpUSD = await contracts.uiView.calculateLpPriceUSD(contracts.pairWeth.address);
			let totalStakedUSD = totalStaked.mul(lpUSD).div(ether);
			totalStakedUSD = totalStakedUSD.eq(0) ? lpUSD : totalStakedUSD;

			const tdaoUSD = await contracts.uiView.tdaoPriceUSD(true);
			const rewardsPerSecond = await contracts.rewardsVault.avgFeesPerSecondTotal();
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
		const maxAllowance = BigNumber.from(2).pow(256).sub(1);
		const spenderAddress = contracts.rewardsVault.address;
		const allowance = await contracts.pairWeth.allowance(address, spenderAddress);
		if (allowance.lt(amount)) {
			setTransactionStatus(9);
			await contracts.pairWeth.approve(spenderAddress, maxAllowance);
		}
		await handleTransaction(async () => await contracts.rewardsVault.deposit(0, amount));
	};

	const handleWithdraw = async (amount) => {
		if (!amount) return;
		amount = parseUnits(amount);
		await handleTransaction(async () => await contracts.rewardsVault.withdraw(0, amount));
	};

	const handleClaim = async () => {
		await handleTransaction(async () => await contracts.rewardsVault.withdraw(0, 0));
	};

	const handleUpdateStake = async () => {
		setInputs({ ...inputs, stake: formatUnits(lpBalance), unstake: 0 });
	};

	const handleUpdateUnstake = async () => {
		setInputs({ ...inputs, unstake: formatUnits(lpStaked), stake: 0 });
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
		<div className="border-lp mb-4">
			<Row className="mb-3 stake-earn-header">
				<Col sm={4}>
					<h4>TDAO/ETH LP</h4>
				</Col>
				<Col sm={8} className="text-right">
					<Button href="https://app.uniswap.org" variant="outline-secondary">
						Trade In Uniswap
					</Button>
					&nbsp;
					<Button onClick={() => handleClaim(0)} variant="outline-secondary">
						Claim rewards
					</Button>
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
							<Statistic id="apyLp" value={apy} />
						</Col>
						<Col onClick={() => handleUpdateStake()}>
							<Statistic id="lpBalance" params={[address]} />
						</Col>
						<Col onClick={() => handleUpdateUnstake()}>
							<Statistic id="lpStaked" params={[address]} />
						</Col>
						<Col>
							<Statistic id="lpPendingReward" params={[address]} />
						</Col>
						<Col>
							<Statistic id="lpValue" params={[address]} />
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
							<Button onClick={() => handleDeposit(inputs['stake'])} block variant="outline-secondary">
								Stake
							</Button>
						</Col>
						<Col sm={6}>
							<Button onClick={() => handleWithdraw(inputs['unstake'])} block variant="outline-secondary">
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

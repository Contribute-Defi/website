import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Statistic } from './Statistic';
import { useContractValue, useEthers } from '../../app';
import { TransactionModal } from './TransactionModal';
import { formatUnits, parseUnits } from 'ethers/lib/utils';

export function StakeLp() {
	const { address, contracts, onUpdate } = useEthers();
	const [toggle, setToggle] = useState(true);
	const [inputs, setInputs] = useState({});
	const [transactionStatus, setTransactionStatus] = useState(0);
	const lpBalance = useContractValue('lpBalance', [address]);
	const lpStaked = useContractValue('lpStaked', [address]);

	function handleToggle() {
		setToggle(!toggle);
	}

	function handleChangeInput(key, value) {
		setInputs({ ...inputs, [key]: value });
	}

	const handleDeposit = async (amount) => {
		if (!amount) return;
		amount = parseUnits(amount);
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
							<Statistic id="apyLp" params={[address, 0, true]} />
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

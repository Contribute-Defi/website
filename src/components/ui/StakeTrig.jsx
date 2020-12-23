import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Statistic } from './Statistic';
import { useEthers } from '../../app';
import { TransactionModal } from './TransactionModal';
import { parseUnits } from 'ethers/lib/utils';

export function StakeTrig() {
	const { address, contracts, onUpdate } = useEthers();
	const [toggle, setToggle] = useState(true);
	const [inputs, setInputs] = useState({});
	const [transactionStatus, setTransactionStatus] = useState(0);

	function handleToggle() {
		setToggle(!toggle);
	}

	function handleChangeInput(key, value) {
		setInputs({ ...inputs, [key]: value });
	}

	const handleDeposit = async (amount) => {
		amount = parseUnits(amount);
		await handleTransaction(async () => await contracts.trigRewardsVault.deposit(0, amount));
	};

	const handleWithdraw = async (amount) => {
		amount = parseUnits(amount);
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

	return (
		<div className="border-trig mb-4">
			<Row className="mb-3">
				<Col sm={4}>
					<h4>TRIG</h4>
				</Col>
				<Col sm={8} className="text-right">
					<Button href="https://app.uniswap.org" variant="outline-secondary">
						Trade In Uniswap
					</Button>
					&nbsp;
					<Button onClick={() => handleWithdraw(0)}>Claim rewards</Button>
					&nbsp;
					<Button onClick={() => handleToggle('trig')} variant="link">
						{toggle ? '▲' : '▼'}
					</Button>
				</Col>
			</Row>
			{toggle && (
				<>
					<Row>
						<Col>
							<Statistic id="trigApy" params={[address, 0, true, false]} />
						</Col>
						<Col>
							<Statistic id="trigBalance" params={[address]} />
						</Col>
						<Col>
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

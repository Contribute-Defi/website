import React, { useState, useEffect } from 'react';
import { ethers, BigNumber } from 'ethers';
import { Form, Row, Button, ButtonGroup, Col, Alert, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { ContractValue } from './ContractValue';
import { useEthers } from '../../app';
import { parseEther, formatEther } from 'ethers/lib/utils';
// const { parseEther, formatEther } = ethers.utils;

export function BuySell({ isGenesis = false }) {
	const defaultAmount = '';

	const FORM_EDIT = null;
	const FORM_APPROVING = 1;
	const FORM_APPROVING_WAITING = 2;
	const FORM_SIGNING = 3;
	const FORM_SIGNING_WAITING = 4;

	const { connected, provider, signer, contracts, address, onUpdate, networkId } = useEthers();

	const [ethBalance, setEthBalance] = useState();
	const [tab, setTab] = useState('buy');
	const [formStatus, setFormStatus] = useState(FORM_EDIT);
	const [currFromSelect, setCurrFromSelect] = useState('ETH');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);
	const [amount, setAmount] = useState(defaultAmount);
	const [receiveAmount, setReceiveAmount] = useState(null);
	const [isComputing, setIsComputing] = useState(false);
	const [txHash, setTxHash] = useState();
	const currFrom = tab === 'buy' ? currFromSelect : 'TRIB';
	const currTo = tab === 'buy' ? 'TRIB' : 'mUSD';

	useEffect(() => {
		loadEthBalance();
	}, []);

	async function loadEthBalance() {
		setEthBalance(await provider.getBalance(address));
	}

	function formatEth(eth) {
		if (!ethBalance) return '';
		return Math.round(parseFloat(formatEther(ethBalance)) * 1000000) / 1000000;
	}

	const buttonTitle = () => {
		if (formStatus === FORM_APPROVING || formStatus === FORM_APPROVING_WAITING) {
			return 'Approving mUSD spending...';
		}
		if (formStatus === FORM_SIGNING || formStatus === FORM_SIGNING_WAITING) {
			return tab === 'buy' ? 'Purchasing TRIB' : 'Selling TRIB';
		}

		return tab === 'buy' ? 'Purchase TRIB' : 'Sell TRIB and claim interest';
	};

	const handleUpdate = () => {
		onUpdate();
		loadEthBalance();
	};

	const handleChangeTab = (key) => {
		setTab(key);
		setAmount('');
		setReceiveAmount('');
		onUpdate();
	};

	const handleAmountUpdated = async (value) => {
		setAmount(value);
		setIsComputing(true);

		let result;
		if (value === '') {
			result = 'N/A';
		} else {
			value = parseEther(value);
			if (tab === 'buy') {
				// (new Intl.NumberFormat('en-US')).format(wholePart)
				if (isGenesis) {
					result = await contracts.contribute.getReserveToTokens(value);
				} else {
					if (currFrom === 'ETH') {
						console.log('calcTribOut', value);
						result = await contracts.router.calcTribOut(value);
						console.log('result', result);
					} else {
						result = await contracts.contribute.getReserveToTokensTaxed(value);
					}
				}
			} else {
				result = await contracts.contribute.getTokensToReserveTaxed(value);
			}
			result = formatEther(result);
		}
		setIsComputing(false);
		setReceiveAmount(result);
	};

	const handlePurchase = async () => {
		setFormStatus(FORM_EDIT);
		setError(null);
		setSuccess(false);
		setTxHash(undefined);
		const method = tab === 'buy' ? 'invest' : 'sell';

		const amountWei = parseEther(amount);

		try {
			if (currFrom === 'mUSD' && method === 'invest') {
				setFormStatus(FORM_APPROVING);
				const spenderAddress = isGenesis ? contracts.genesis.address : contracts.contribute.address;
				const allowance = await contracts.musd.allowance(address, spenderAddress);
				if (allowance.lt(amountWei)) {
					const maxAllowance = BigNumber.from(2).pow(256).sub(1);
					const transaction = await contracts.musd.approve(spenderAddress, maxAllowance);
					await transaction.wait();
					setFormStatus(FORM_APPROVING_WAITING);
				}
			}
			setFormStatus(FORM_SIGNING);

			let transaction;
			const transactionOptions = { gasLimit: 1000000 };
			if (method === 'invest') {
				if (isGenesis) {
					transaction = await contracts.genesis.deposit(amountWei, transactionOptions);
				} else {
					if (currFrom === 'ETH') {
						transaction = await signer.sendTransaction({
							to: contracts.router.address,
							value: amountWei,
							...transactionOptions,
						});
					} else {
						transaction = await contracts.contribute.invest(amountWei, transactionOptions);
					}
				}
			} else {
				transaction = await contracts.contribute.sell(amountWei, transactionOptions);
			}
			setFormStatus(FORM_SIGNING_WAITING);
			await transaction.wait();
			// sometimes it doesn't update after the trasaction is confirmed
			// why not reload after some additional confirmations
			handleUpdate();
			transaction.wait(1).then(() => {
				handleUpdate();
			});
			transaction.wait(2).then(() => {
				handleUpdate();
			});
			transaction.wait(3).then(() => {
				handleUpdate();
			});
			setTxHash(transaction.hash);
			setSuccess(true);
		} catch (err) {
			if (err.code === 4001) {
				setError('Please approve all MetaMask popups');
			} else {
				setError('Error during processing the transaction. Do you have enough balance?');
				console.error(err);
			}
		}
		setFormStatus(FORM_EDIT);
		setAmount('');
		setReceiveAmount('');
	};

	const fillAmountFromBalance = async () => {
		let newAmount;
		if (tab === 'buy') {
			if (currFrom === 'ETH') {
				newAmount = ethBalance;
			} else {
				newAmount = await contracts.musd.balanceOf(address);
			}
		} else {
			newAmount = await contracts.trib.balanceOf(address);
		}
		handleAmountUpdated(formatEther(newAmount));
	};

	if (!connected) {
		// todo: show connect component instead i guess
		return <p>Not connected</p>;
	}

	let tabOptions = { buy: 'Buy', sell: 'Sell and Claim*' };
	const allowSell = !isGenesis;

	function renderTxLink() {
		if (!txHash) return <span>Transaction</span>;

		let domain;
		if (networkId === 1) {
			domain = 'etherscan.io';
		} else if (networkId === 42) {
			domain = 'kovan.etherscan.io';
		} else {
			return <span>Transaction</span>;
		}

		return (
			<a href={`https://${domain}/tx/${txHash}`} target="_blank" rel="noreferrer">
				Transaction
			</a>
		);
	}

	return (
		<Row className="justify-content-center">
			<Col className="buy-sell-form">
				{allowSell && (
					<div className="mb-4">
						<ButtonGroup className="w-100">
							{Object.entries(tabOptions).map(([key, title]) => (
								<Button
									key={key}
									variant={tab === key ? 'switch-active' : 'switch-inactive'}
									onClick={() => handleChangeTab(key)}
								>
									{title}
								</Button>
							))}
						</ButtonGroup>
					</div>
				)}
				<Row>
					<Col className="text-left">
						<Form.Label htmlFor="amount">Amount:</Form.Label>
					</Col>
					<Col className="text-right">
						Balance:{' '}
						<span
							className="tooltiped number"
							onClick={() => fillAmountFromBalance()}
							title="Use whole balance"
							role="button"
						>
							{tab === 'buy' && currFrom === 'ETH' ? (
								<span>{formatEth(ethBalance)}</span>
							) : (
								<ContractValue
									id={currFrom === 'mUSD' ? 'reserveBalance' : 'tokenBalance'}
									params={[address]}
								/>
							)}
						</span>
					</Col>
				</Row>
				<div className="mb-3 form-unit-wrap">
					<InputGroup>
						<Form.Control
							type="number"
							id="amount"
							value={amount}
							onChange={(e) => handleAmountUpdated(e.target.value)}
							disabled={formStatus !== FORM_EDIT}
						/>
						{tab === 'buy' ? (
							<DropdownButton
								id="currFrom"
								as={InputGroup.Append}
								variant="outline-primary"
								title={currFrom}
							>
								<Dropdown.Item onClick={() => setCurrFromSelect('ETH')}>ETH</Dropdown.Item>
								<Dropdown.Item onClick={() => setCurrFromSelect('mUSD')}>mUSD</Dropdown.Item>
							</DropdownButton>
						) : (
							<div className="form-unit">{currFrom}</div>
						)}
					</InputGroup>
				</div>

				<Row>
					<Col className="text-left">
						<Form.Label htmlFor="receive">You will {isGenesis ? 'mint' : 'receive after tax'}:</Form.Label>
					</Col>
					<Col className="text-right">
						Balance:{' '}
						<ContractValue
							id={
								currTo === 'TRIB'
									? isGenesis
										? 'genesisTokenBalance'
										: 'tokenBalance'
									: 'reserveBalance'
							}
							params={[address]}
						/>
					</Col>
				</Row>
				<div className="mb-4">
					<div className="form-control text-left number form-unit-wrap">
						{isComputing ? 'computing...' : receiveAmount}
						<div className="form-unit">{currTo}</div>
					</div>
				</div>

				<div className="text-center mb-4">
					<Button onClick={() => handlePurchase()} disabled={formStatus !== FORM_EDIT}>
						{buttonTitle()}
					</Button>
				</div>

				{formStatus !== FORM_EDIT ? (
					<Alert variant="info">
						{formStatus === FORM_APPROVING
							? 'Please sign transaction to approve mUSD spending'
							: formStatus === FORM_APPROVING_WAITING
							? 'Waiting for confirmation'
							: formStatus === FORM_SIGNING
							? 'Please sign transaction to process your order'
							: formStatus === FORM_SIGNING_WAITING
							? 'Waiting for confirmation'
							: null}
					</Alert>
				) : null}

				{error ? (
					<Alert variant="danger" dismissible onClose={() => setError(null)}>
						{error}
					</Alert>
				) : null}

				{success ? (
					<Alert variant="success" dismissible onClose={() => setSuccess(false)}>
						{renderTxLink()} complete. Thank you for your contribution!
					</Alert>
				) : null}

				<p className="fs-xs">
					10% of every transaction is <strong>locked forever</strong> in the interest-bearing pool.{' '}
					<a
						href="https://medium.com/@kentosadim/contribute-in-a-nutshell-5ec5ecb9ace5"
						rel="noreferrer"
						target="_blank"
					>
						Learn more
					</a>
					.
				</p>
			</Col>
		</Row>
	);
}

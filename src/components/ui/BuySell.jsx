import React, { useState, useEffect } from 'react';
import { ethers, BigNumber } from 'ethers';
import { Form, Row, Button, ButtonGroup, Col, Alert, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { ContractValue } from './ContractValue';
import { useEthers } from '../../app';
import { parseEther, formatEther } from 'ethers/lib/utils';
// const { parseEther, formatEther } = ethers.utils;

// type = trib | tdao
export function BuySell({ type = 'trib' }) {
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

	const buyCurrencies = type === 'trib' ? ['ETH', 'mUSD'] : ['ETH', 'TRIB'];

	useEffect(() => {
		if (address) {
			loadEthBalance();
		}
	}, [address]);

	async function loadEthBalance() {
		setEthBalance(await provider.getBalance(address));
	}

	function formatEth(eth) {
		if (!ethBalance) return '';
		return Math.round(parseFloat(formatEther(ethBalance)) * 1000000) / 1000000;
	}

	const buttonTitle = () => {
		if (type === 'trib') {
			if (formStatus === FORM_APPROVING || formStatus === FORM_APPROVING_WAITING) {
				return 'Approving mUSD spending...';
			}
			if (formStatus === FORM_SIGNING || formStatus === FORM_SIGNING_WAITING) {
				return tab === 'buy' ? 'Purchasing TRIB' : 'Selling TRIB';
			}

			return tab === 'buy' ? 'Purchase TRIB' : 'Sell TRIB and claim interest';
		} else {
			if (formStatus === FORM_APPROVING || formStatus === FORM_APPROVING_WAITING) {
				return 'Approving TRIB spending...';
			}
			if (formStatus === FORM_SIGNING || formStatus === FORM_SIGNING_WAITING) {
				return 'Depositing...';
			}

			return 'Deposit';
		}
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
				if (currFrom === 'ETH') {
					result = await contracts.router.calcTribOut(value);
				} else {
					result = await contracts.contribute.getReserveToTokensTaxed(value);
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
		let contract;
		let ethContract;
		let baseCurrencyContract;
		let investMethod;
		if (type === 'trib') {
			ethContract = 'router';
			contract = 'contribute';
			baseCurrencyContract = 'musd';
			investMethod = tab === 'buy' ? 'invest' : 'sell';
		} else {
			ethContract = 'tribRouterLLE';
			contract = 'lockedLiquidityEvent';
			baseCurrencyContract = 'trib';
			investMethod = 'addLiquidity';
		}

		const amountWei = parseEther(amount);

		try {
			if (
				(currFrom === 'mUSD' && investMethod === 'invest') ||
				(currFrom === 'TRIB' && investMethod === 'addLiquidity')
			) {
				setFormStatus(FORM_APPROVING);
				const spenderAddress = contracts[contract].address;
				const allowance = await contracts[baseCurrencyContract].allowance(address, spenderAddress);
				if (allowance.lt(amountWei)) {
					const maxAllowance = BigNumber.from(2).pow(256).sub(1);
					const transaction = await contracts[baseCurrencyContract].approve(spenderAddress, maxAllowance);
					await transaction.wait();
					setFormStatus(FORM_APPROVING_WAITING);
				}
			}
			setFormStatus(FORM_SIGNING);

			let transaction;
			let transactionOptions = { gasLimit: 800000 };
			if (investMethod === 'invest' || investMethod === 'addLiquidity') {
				if (currFrom === 'ETH') {
					transaction = await signer.sendTransaction({
						to: contracts[ethContract].address,
						value: amountWei,
						...transactionOptions,
					});
				} else {
					transaction = await contracts[contract][investMethod](amountWei);
				}
			} else {
				transaction = await contracts[contract].sell(amountWei);
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
				{type === 'trib' && (
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
								{buyCurrencies.map((currency) => (
									<Dropdown.Item onClick={() => setCurrFromSelect(currency)} key={currency}>
										{currency}
									</Dropdown.Item>
								))}
							</DropdownButton>
						) : (
							<div className="form-unit">{currFrom}</div>
						)}
					</InputGroup>
				</div>

				{type === 'trib' && (
					<>
						<Row>
							<Col className="text-left">
								<Form.Label htmlFor="receive">You will receive after tax:</Form.Label>
							</Col>
							<Col className="text-right">
								Balance:{' '}
								<ContractValue
									id={tab === 'buy' ? 'tokenBalance' : 'reserveBalance'}
									params={[address]}
								/>
							</Col>
						</Row>

						<div className="mb-4">
							<div className="form-control text-left number form-unit-wrap">
								{isComputing ? 'computing...' : receiveAmount}
								<div className="form-unit">{tab === 'buy' ? 'TRIB' : 'mUSD'}</div>
							</div>
						</div>
					</>
				)}

				<div className="text-center mb-4">
					<Button onClick={() => handlePurchase()} disabled={formStatus !== FORM_EDIT}>
						{buttonTitle()}
					</Button>
				</div>

				{formStatus !== FORM_EDIT ? (
					<Alert variant="info">
						{formStatus === FORM_APPROVING
							? `Please sign transaction to approve ${type === 'trib' ? 'mUSD' : 'TRIB'} spending`
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

				{type === 'trib' && (
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
				)}
			</Col>
		</Row>
	);
}

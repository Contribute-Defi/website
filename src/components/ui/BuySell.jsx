import React, { useState } from 'react';
import ethers from 'ethers';
import { Form, Row, Button, ButtonGroup, Col, Alert } from 'react-bootstrap';
import { ContractValue } from './ContractValue';
import { useEthers } from '../../app';

const { parseEther, formatEther } = ethers.utils;

export function BuySell({ allowSell }) {
	const defaultAmount = '';

	const FORM_EDIT = null;
	const FORM_APPROVING = 1;
	const FORM_APPROVING_WAITING = 2;
	const FORM_SIGNING = 3;
	const FORM_SIGNING_WAITING = 4;

	const { connected, contracts, address } = useEthers();

	const [tab, setTab] = useState('buy');
	const [formStatus, setFormStatus] = useState(FORM_EDIT);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);
	const [amount, setAmount] = useState(defaultAmount);
	const [receiveAmount, setReceiveAmount] = useState(null);
	const [isComputing, setIsComputing] = useState(false);
	const currFrom = tab === 'buy' ? 'mUSD' : 'TRIB';
	const currTo = tab === 'buy' ? 'TRIB' : 'mUSD';

	const buttonTitle = () => {
		if (formStatus === FORM_APPROVING || formStatus === FORM_APPROVING_WAITING) {
			return 'Approving mUSD spending...';
		}
		if (formStatus === FORM_SIGNING || formStatus === FORM_SIGNING_WAITING) {
			return tab === 'buy' ? 'Purchasing TRIB' : 'Selling TRIB';
		}

		return tab === 'buy' ? 'Purchase TRIB' : 'Sell TRIB';
	};

	const handleChangeTab = key => {
		setTab(key);
		setAmount('');
	};

	const handleAmountUpdated = async value => {
		setAmount(value);
		setIsComputing(true);

		let result;
		if (value === '') {
			result = 'N/A';
		} else {
			value = parseEther(value);
			if (tab === 'buy') {
				// (new Intl.NumberFormat('en-US')).format(wholePart)
				result = await contracts.contribute.getReserveToTokensTaxed(value)
			} else {
				result = await contracts.contribute.getTokensToReserveTaxed(value)
			}
			result = formatEther(result);
		}
		setIsComputing(false);
		setReceiveAmount(result);
	}

	const handlePurchase = async () => {
		setFormStatus(FORM_EDIT);
		setError(null);
		const method = tab === 'buy' ? 'invest' : 'sell';
		const amountWei = parseEther(amount);

		try {
			if (method === 'invest') {
				setFormStatus(FORM_APPROVING);
				const transaction = await contracts.musd.approve(contracts.contribute.address, amountWei);
				setFormStatus(FORM_APPROVING_WAITING);
				await transaction.wait();
			}
			setFormStatus(FORM_SIGNING);
			const transaction = await contracts.contribute[method](amountWei);
			setFormStatus(FORM_SIGNING_WAITING);
			await transaction.wait();
			setSuccess(true);
		} catch (err) {
			console.error(err);
			setError('Please approve all MetaMask popups');
		}
		setFormStatus(FORM_EDIT);
		setAmount('');
	};

	const fillAmountFromBalance = async () => {
		let newAmount;
		if (tab === 'buy') {
			newAmount = await contracts.musd.balanceOf(address);
		} else {
			newAmount = await contracts.musd.balanceOf(address);
		}
		handleAmountUpdated(formatEther(newAmount));
	};

	if (!connected) {
		// todo: show connect component instead i guess
		return <p>Not connected</p>;
	}

	let tabOptions = { buy: 'Buy', sell: 'Sell' };

	return (
		<Row className="justify-content-center">
			<Col md="6">
				{allowSell &&
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
				}
				<Row>
					<Col className="text-left">
						<Form.Label htmlFor="amount">
							Amount:
						</Form.Label>
					</Col>
					<Col className="text-right">
						Balance:
						{' '}
						<span className="tooltiped number" onClick={() => fillAmountFromBalance()} title="Use whole balance" role="button">
							<ContractValue id={currFrom === 'mUSD' ? 'reserveBalance' : 'tokenBalance'} params={[address]} />
						</span>
					</Col>
				</Row>
				<div className="mb-3 form-unit-wrap">
					<Form.Control
						type="number"
						id="amount"
						value={amount}
						onChange={e => handleAmountUpdated(e.target.value)}
						disabled={formStatus !== FORM_EDIT}
					/>
					<div className="form-unit">{currFrom}</div>
				</div>

				<Row>
					<Col className="text-left">
						<Form.Label htmlFor="receive">
							You will receive (
							{currTo}
							):
						</Form.Label>
					</Col>
					<Col className="text-right">
						Balance:
						{' '}
						<ContractValue id={currFrom === 'mUSD' ? 'tokenBalance' : 'reserveBalance'} params={[address]} />
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
						{formStatus === FORM_APPROVING ?
							'Please sign transaction to approve mUSD spending'
							: formStatus === FORM_APPROVING_WAITING ? 'Waiting for confirmation'
							: formStatus === FORM_SIGNING ? 'Please sign transaction to process your order'
							: formStatus === FORM_SIGNING_WAITING ? 'Waiting for confirmation'
							: null
						}
					</Alert>
				) : null}

				{error ? (
					<Alert variant="danger" dismissible onClose={() => setError(null)}>
						{error}
					</Alert>
				) : null}

				{success ? (
					<Alert variant="success" dismissible onClose={() => setSuccess(false)}>
						Transaction complete. Thank you for your contribution!
					</Alert>
				) : null}

				<p className="fs-xs">
					10% of every transaction is
					{' '}
					<strong>locked forever</strong>
					{' '}
					in the interest-bearing pool.
					{' '}
					<a href={process.env.WHITEPAPER_LINK} rel="noreferrer" target="_blank">Learn more</a>
					.
				</p>
			</Col>
		</Row>
	);
}

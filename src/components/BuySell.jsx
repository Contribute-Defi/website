import React, { useState } from 'react';
import { Form, Row, Button, ButtonGroup, Col, Alert } from 'react-bootstrap';
import ContractValue from './ContractValue';
import drizzle from '../lib/drizzle';

function BuySell() {
	const defaultAmount = '';

	const FORM_EDIT = null;
	const FORM_APPROVING = 1;
	const FORM_PROCESSING = 2;

	const { ViewContribute, Contribute, ERC20 } = drizzle.contracts;

	const [tab, setTab] = useState('buy');
	const [formStatus, setFormStatus] = useState(FORM_EDIT);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);
	const [amount, setAmount] = useState(defaultAmount);
	const currFrom = tab === 'buy' ? 'DAI' : 'TRIB';
	const currTo = tab === 'buy' ? 'TRIB' : 'DAI';

	const buttonTitle = () => {
		if (formStatus === FORM_APPROVING) {
			return 'Approving DAI spending...';
		}
		if (formStatus === FORM_PROCESSING) {
			return tab === 'buy' ? 'Purchasing TRIB' : 'Selling TRIB';
		}

		return tab === 'buy' ? 'Purchase TRIB' : 'Sell TRIB';
	};

	const handleChangeTab = key => {
		setTab(key);
		setAmount('');
	};

	const handlePurchase = async () => {
		setFormStatus(FORM_EDIT);
		setError(null);
		const method = tab === 'buy' ? 'invest' : 'sell';
		const amountWei = drizzle.web3.utils.toWei(amount);

		try {
			if (method === 'invest') {
				setFormStatus(FORM_APPROVING);
				await ERC20.methods.approve(Contribute.address, amountWei)
					.send();
			}
			setFormStatus(FORM_PROCESSING);
			await Contribute.methods[method](amountWei).send();
			setSuccess(true);
		} catch (err) {
			setError('Please approve all MetaMask popups');
		}
		setFormStatus(FORM_EDIT);
		setAmount('');
	};

	const fillAmountFromBalance = async () => {
		const method = tab === 'buy' ? 'getDaiBalance' : 'getTribBalance';
		const newAmount = await (await ViewContribute.methods[method].call()).call(); // WTF?
		setAmount(drizzle.web3.utils.fromWei(newAmount));
	};

	const sanitizeAmount = a => (a || 0).toString();

	const renderReceive = () => {
		if (amount === '') {
			return 'N/A';
		}
		if (tab === 'buy') {
			return (
				<ContractValue
					method="getDaiToTrib"
					contract="Contribute"
					param={sanitizeAmount(amount)}
				/>
			);
		}
		return (
			<ContractValue
				method="getTribToDai"
				contract="Contribute"
				param={sanitizeAmount(amount)}
			/>
		);
	};


	return (
		<Row className="justify-content-center">
			<Col md="6">
				<div className="mb-4">
					<ButtonGroup className="w-100">
						{Object.entries({ buy: 'Buy', sell: 'Sell' }).map(([key, title]) => (
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
							<ContractValue method={currFrom === 'DAI' ? 'getDaiBalance' : 'getTribBalance'} />
						</span>
					</Col>
				</Row>
				<div className="mb-3 form-unit-wrap">
					<Form.Control
						type="number"
						id="amount"
						value={amount}
						onChange={e => setAmount(e.target.value)}
						disabled={formStatus !== FORM_EDIT}
					/>
					<div className="form-unit">{currFrom}</div>
				</div>

				<Row>
					<Col className="text-left">
						<Form.Label htmlFor="receive">
							You will receive (
							{currTo}
							)
						</Form.Label>
					</Col>
					<Col className="text-right">
						Balance:
						{' '}
						<ContractValue method={currFrom === 'DAI' ? 'getTribBalance' : 'getDaiBalance'} />
					</Col>
				</Row>
				<div className="mb-4">
					<div className="form-control text-left number form-unit-wrap">
						{renderReceive()}
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
						Transaction in progress. Please confirm action on MetaMask.
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

export default BuySell;

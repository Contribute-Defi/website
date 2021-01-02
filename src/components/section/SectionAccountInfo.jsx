import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { nftImages, nfts } from '../../config/const';
import { useEthers } from '../../app';
import { RowStat } from '../ui';

function SectionAccountInfo({ phase, hasClaimed, onClaimed }) {
	const { address, contracts } = useEthers();
	const [nftBalances, setNftBalances] = useState();
	const [success, setSuccess] = useState();
	const [error, setError] = useState();
	const [transactionStatus, setTransactionStatus] = useState();

	useEffect(() => {
		const ids = Object.values(nfts);
		const addresses = ids.map((x) => address);
		contracts.uiView.nftBalance(addresses, ids).then((result) => {
			setNftBalances(result.map((x) => x.toNumber()));
		});
	}, [address]);

	const handleClaim = async () => {
		setSuccess(false);
		const { lockedLiquidityEvent } = contracts;
		setTransactionStatus('signing');
		try {
			const transaction = await lockedLiquidityEvent.claimTrig();
			setTransactionStatus('confirming');
			await transaction.wait();
			setSuccess(true);
		} catch (err) {
			if (err.code === 4001) {
				setError('Please approve all MetaMask popups');
			} else {
				setError('Error during processing the transaction. Do you have enough balance?');
				console.error(err);
			}
		}
		setTransactionStatus(undefined);
		onClaimed();
	};

	const myNfts = nftBalances ? Object.entries(nfts).filter(([nftName, id]) => nftBalances[id] > 0) : [];

	return (
		<section className="section-account-info text-light" id="anchor-participate">
			<Container>
				<h2 className="font-weight-light mb-5 text-center text-uppercase">
					{phase === 2 || hasClaimed ? 'Account Info' : 'Claim your rewards'}
				</h2>

				<Row className="justify-content-center">
					<Col md="6">
						<RowStat id="lleAccountContributed" params={[address]} nohr />
						<RowStat id="claimableTrig" params={[address]} nohr />
						<Row>
							<Col className="py-2 mb-2" style={{ background: '#333' }}>
								Total NFTs Earned
							</Col>
						</Row>
						{myNfts.map(([nftName, id]) => (
							<RowStat
								label={nftName}
								value={nftBalances[id]}
								unit="x"
								key={id}
								nohr={id === myNfts[myNfts.length - 1][1]}
							/>
						))}

						{phase === 3 && (
							<div className="text-center mb-4">
								<Button className="btn-tdao px-5" onClick={handleClaim}>
									Claim
								</Button>
							</div>
						)}

						{transactionStatus ? (
							<Alert variant="info">
								{transactionStatus === 'signing'
									? 'Please sign transaction to proceed'
									: transactionStatus === 'confirming'
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
								Transaction complete. Thank you for your contribution!
							</Alert>
						) : null}
					</Col>
				</Row>

				<h2 className="font-weight-light mb-5 mt-4 text-center text-uppercase">NFT Gallery</h2>

				<div className="nft-gallery">
					{myNfts.map(([nftName]) => (
						<div className="nft-image" key={nftName}>
							<img src={nftImages[nftName]} alt="" />
							<div>{nftName}</div>
						</div>
					))}
				</div>
			</Container>
		</section>
	);
}

export default SectionAccountInfo;

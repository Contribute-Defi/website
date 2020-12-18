import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, InputGroup, Form } from 'react-bootstrap';
import { Statistic } from '../ui';
import { useEthers } from '../../app';
import { nfts, nftImages } from '../../config/const';

function SectionStakeEarn(props) {
	const { address, contracts } = useEthers();
	const [toggles, setToggles] = useState({ trig: true });
	const [inputs, setInputs] = useState({});

	const [nftBalances, setNftBalances] = useState();

	useEffect(() => {
		const ids = Object.values(nfts);
		const addresses = ids.map((x) => address);
		contracts.uiView.nftBalance(addresses, ids).then((result) => {
			setNftBalances(result.map((x) => x.toNumber()));
		});
		// contracts.nftRewardsVault.userInfo(address, id); ... to be finished
	}, [address]);

	function handleToggle(key) {
		setToggles({ ...toggles, [key]: !toggles[key] });
	}

	function handleChangeInput(key, value) {
		setInputs({ ...inputs, [key]: value });
	}

	async function handleStakeTrig() {}

	async function handleUnstakeTrig() {}

	async function handleClaimTrig() {}

	async function handleStakeNft(nftId) {}

	async function handleUnstakeNft(nftId) {}

	async function handleClaimNft(nftId) {}

	const myNfts = nftBalances ? Object.entries(nfts).filter(([nftName, id]) => nftBalances[id] > 0) : [];
	console.log({ nftBalances, myNfts });

	return (
		<>
			<section className="section-account-info text-light">
				<Container>
					<h2 className="font-weight-light mb-5 text-center text-uppercase">Stake and Earn</h2>
					<div className="border-trig">
						<Row>
							<Col sm={4}>
								<h4>TRIG</h4>
							</Col>
							<Col sm={8} className="text-right">
								<Button href="https://app.uniswap.org" variant="outline-light">
									Trade In Uniswap
								</Button>
								&nbsp;
								<Button onClick={handleClaimTrig}>Claim rewards</Button>
								&nbsp;
								<Button onClick={() => handleToggle('trig')} variant="link">
									{toggles.trig ? '▲' : '▼'}
								</Button>
							</Col>
						</Row>
						{toggles.trig && (
							<>
								<hr />
								<Row>
									<Col>
										<Statistic id="trigApy" value={54} />
									</Col>
									<Col>
										<Statistic id="trigBalance" params={[address]} />
									</Col>
									<Col>
										<Statistic id="trigStaked" params={[address, '0']} />
									</Col>
									<Col>
										<Statistic id="trigPendingRewards" params={['0', address]} />
									</Col>
									<Col>
										<Statistic id="tdaoUniswapPriceUSD" />
									</Col>
								</Row>
								<hr />
								<Row className="mb-2">
									<Col sm={6}>
										<InputGroup>
											<Form.Control
												type="number"
												id="trigStake"
												value={inputs.trigStake || 0}
												onChange={(e) => handleChangeInput('trigStake', e.target.value)}
											/>
										</InputGroup>
									</Col>
									<Col sm={6}>
										<InputGroup>
											<Form.Control
												type="number"
												id="trigUnstake"
												value={inputs.trigStake || 0}
												onChange={(e) => handleChangeInput('trigUnstake', e.target.value)}
											/>
										</InputGroup>
									</Col>
								</Row>
								<Row>
									<Col sm={6}>
										<Button onClick={handleStakeTrig} block>
											Stake
										</Button>
									</Col>
									<Col sm={6}>
										<Button onClick={handleUnstakeTrig} block>
											Unstake
										</Button>
									</Col>
								</Row>
							</>
						)}
					</div>
					{myNfts.map(([nftName, nftId]) => (
						<div className="border-nft" key={nftName}>
							<Row>
								<Col sm={4}>
									<h4>TRIG</h4>
								</Col>
								<Col sm={8} className="text-right">
									<Button href="https://app.uniswap.org" variant="outline-light">
										Trade In Uniswap
									</Button>
									&nbsp;
									<Button onClick={() => handleClaimNft(nftId)}>Claim rewards</Button>
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
											<Statistic id="trigApy" value={54} />
										</Col>
										<Col>
											<Statistic id="trigBalance" params={[address]} />
										</Col>
										<Col>
											<Statistic id="trigStaked" params={[address, '0']} />
										</Col>
										<Col>
											<Statistic id="trigPendingRewards" params={['0', address]} />
										</Col>
										<Col>
											<Statistic id="tdaoUniswapPriceUSD" />
										</Col>
									</Row>
									<hr />
									<Row className="mb-2">
										<Col sm={6}>
											<InputGroup>
												<Form.Control
													type="number"
													id="trigStake"
													value={inputs.trigStake || 0}
													onChange={(e) =>
														handleChangeInput('nftStake', nftId, e.target.value)
													}
												/>
											</InputGroup>
										</Col>
										<Col sm={6}>
											<InputGroup>
												<Form.Control
													type="number"
													id="trigUnstake"
													value={inputs.trigStake || 0}
													onChange={(e) =>
														handleChangeInput('nftUnstake', nftId, e.target.value)
													}
												/>
											</InputGroup>
										</Col>
									</Row>
									<Row>
										<Col sm={6}>
											<Button onClick={() => handleStakeNft(nftId)} block>
												Stake
											</Button>
										</Col>
										<Col sm={6}>
											<Button onClick={() => handleUnstakeNft(nftId)} block>
												Unstake
											</Button>
										</Col>
									</Row>
								</>
							)}
						</div>
					))}
				</Container>
			</section>
		</>
	);
}

export default SectionStakeEarn;

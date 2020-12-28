import React, { useEffect, useState } from 'react';
import { useEthers } from '../../app';

import tier1 from '../../assets/nft/VISIONARY.jpg';
import tier2 from '../../assets/nft/EXPLORER.jpg';
import tier3 from '../../assets/nft/ALCHEMIST.jpg';
import tier4 from '../../assets/nft/VOYAGER.jpg';
import tier5 from '../../assets/nft/LEGEND.jpg';
import tier6 from '../../assets/nft/SUPREME.jpg';
import tier7 from '../../assets/nft/IMMORTAL.jpg';
import tier8 from '../../assets/nft/DIVINITY.jpg';

export function SectionNFT(props) {
	const { address, connected, contracts, timestamp, onUpdate } = useEthers();
	const [nftQuantity, setNftQuantity] = useState([1, 1, 2, 4, 5, 6, 8, 10]);

	useEffect(() => {
		if (contracts && address) {
			recountNFTRemaining();
		}
	}, [contracts, timestamp, address]);

	const recountNFTRemaining = async () => {
		const address = await contracts.lockedLiquidityEvent.address;
		const addresses = [address, address, address, address, address, address, address, address];
		const ids = [0, 1, 2, 3, 4, 5, 6, 7];
		const nftBalance = await contracts.uiView.nftBalance(addresses, ids);
		let newBalance = new Array();
		for (let i in nftBalance) {
			newBalance.push(nftBalance[i].toString());
		}
		setNftQuantity(newBalance.reverse());
	};

	return (
		<div className="nft-container">
			<div className="nft text-center mx-auto">
				<h3 className="nft_header text-uppercase mx-auto">
					Earn Even <span>More Fees</span> By staking These <span>Exclusive Nfts</span>
				</h3>
				<p className="nft-desc mx-auto">
					These NFTs were crested to reward users who take the most risk in the Locked Liquidity Event
				</p>
				<span className="read-block-link">
					<a target="blank" href="https://medium.com/contribute-defi">
						Read the blog post to learn more.
					</a>
				</span>
				<div className="gallery d-flex">
					<div className="card_container">
						<div className="card">
							<p className="issued">{nftQuantity[0]}x</p>
							<img src={tier8} alt="" />
						</div>
						<h5 className="img-title text-uppercase m-0 mt-3">Divinity</h5>
						<h5 className="total-issued text-uppercase">
							5.0% of NFT rewards
							<br />
							<span>Top</span> Contributor
						</h5>
					</div>
					<div className="card_container mx-5">
						<div className="card">
							<p className="issued">{nftQuantity[1]}x</p>
							<img src={tier7} alt="" />
						</div>
						<h5 className="img-title text-uppercase m-0 mt-3">Immortal</h5>
						<h5 className="total-issued text-uppercase">
							36% of NFT rewards
							<br />
							<span>100,000 TRIB</span> Minimum
						</h5>
					</div>
					<div className="card_container">
						<div className="card">
							<p className="issued">{nftQuantity[2]}x</p>
							<img src={tier6} alt="" />
						</div>
						<h5 className="img-title text-uppercase m-0 mt-3">Supreme</h5>
						<h5 className="total-issued text-uppercase">
							28% of NFT rewards
							<br />
							<span>50,000 TRIB</span> Minimum
						</h5>
					</div>
				</div>
				<div className="gallery second_row d-flex">
					<div className="card_container">
						<div className="card">
							<p className="issued">{nftQuantity[3]}x</p>
							<img src={tier5} alt="" />
						</div>
						<h5 className="img-title text-uppercase m-0 mt-3">Legend</h5>
						<h5 className="total-issued text-uppercase">
							18% of NFT rewards
							<br />
							<span>20,000 TRIB</span> Minimum
						</h5>
					</div>
					<div className="card_container ml-4">
						<div className="card">
							<p className="issued">{nftQuantity[4]}x</p>
							<img src={tier4} alt="" />
						</div>
						<h5 className="img-title text-uppercase m-0 mt-3">Voyager</h5>
						<h5 className="total-issued text-uppercase">
							8.4% of NFT rewards
							<br />
							<span>10,000 TRIB</span> Minimum
						</h5>
					</div>
					<div className="card_container mx-4">
						<div className="card">
							<p className="issued">{nftQuantity[5]}x</p>
							<img src={tier3} alt="" />
						</div>
						<h5 className="img-title text-uppercase m-0 mt-3">Alchemist</h5>
						<h5 className="total-issued text-uppercase">
							3.4% of NFT rewards
							<br />
							<span>5,000 TRIB</span> Minimum
						</h5>
					</div>
					<div className="card_container mr-4">
						<div className="card">
							<p className="issued">{nftQuantity[6]}x</p>
							<img src={tier2} alt="" />
						</div>
						<h5 className="img-title text-uppercase m-0 mt-3">Explorer</h5>
						<h5 className="total-issued text-uppercase">
							1.0% of NFT rewards
							<br />
							<span>1,000 TRIB</span> Minimum
						</h5>
					</div>
					<div className="card_container">
						<div className="card">
							<p className="issued">{nftQuantity[7]}x</p>
							<img src={tier1} alt="" />
						</div>
						<h5 className="img-title text-uppercase m-0 mt-3">Visionary</h5>
						<h5 className="total-issued text-uppercase">
							0.2% of NFT rewards
							<br />
							<span>500 TRIB</span> Minimum
						</h5>
					</div>
				</div>
			</div>
		</div>
	);
}

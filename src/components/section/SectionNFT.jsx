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
	const { contracts } = useEthers();
	const [nftQuantity, setNftQuantity] = useState([1, 1, 2, 2, 2, 6, 8, 10]);
	const nftURL = 'https://opensea.io/assets/0x2da71c9db22f9d620fdc07bd42105e852afe05a2/';

	return (
		<div className="nft-container">
			<div className="nft text-center mx-auto">
				<h3 className="nft_header text-uppercase mx-auto">
					Earn Even <span>More Fees</span> By staking These <span>Exclusive Nfts</span>
				</h3>
				<p className="nft-desc mx-auto">
					These NFTs were created to reward users who take the most risk in the Locked Liquidity Event
				</p>
				<span className="read-blog-link">
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
						<h5 className="img-title text-uppercase m-0 mt-3">
							<a href={nftURL + '7'} target="blank">
								Divinity
							</a>
						</h5>
						<h5 className="total-issued text-uppercase">5.0% of NFT rewards</h5>
					</div>
					<div className="card_container mx-5">
						<div className="card">
							<p className="issued">{nftQuantity[1]}x</p>
							<img src={tier7} alt="" />
						</div>
						<h5 className="img-title text-uppercase m-0 mt-3">
							<a href={nftURL + '6'} target="blank">
								Immortal
							</a>
						</h5>
						<h5 className="total-issued text-uppercase">36% of NFT rewards</h5>
					</div>
					<div className="card_container">
						<div className="card">
							<p className="issued">{nftQuantity[2]}x</p>
							<img src={tier6} alt="" />
						</div>
						<h5 className="img-title text-uppercase m-0 mt-3">
							<a href={nftURL + '5'} target="blank">
								Supreme
							</a>
						</h5>
						<h5 className="total-issued text-uppercase">28% of NFT rewards</h5>
					</div>
				</div>
				<div className="gallery second_row d-flex">
					<div className="card_container">
						<div className="card">
							<p className="issued">{nftQuantity[3]}x</p>
							<img src={tier5} alt="" />
						</div>
						<h5 className="img-title text-uppercase m-0 mt-3">
							<a href={nftURL + '4'} target="blank">
								Legend
							</a>
						</h5>
						<h5 className="total-issued text-uppercase">18% of NFT rewards</h5>
					</div>
					<div className="card_container ml-4">
						<div className="card">
							<p className="issued">{nftQuantity[4]}x</p>
							<img src={tier4} alt="" />
						</div>
						<h5 className="img-title text-uppercase m-0 mt-3">
							<a href={nftURL + '3'} target="blank">
								Voyager
							</a>
						</h5>
						<h5 className="total-issued text-uppercase">8.4% of NFT rewards</h5>
					</div>
					<div className="card_container mx-4">
						<div className="card">
							<p className="issued">{nftQuantity[5]}x</p>
							<img src={tier3} alt="" />
						</div>
						<h5 className="img-title text-uppercase m-0 mt-3">
							<a href={nftURL + '2'} target="blank">
								Alchemist
							</a>
						</h5>
						<h5 className="total-issued text-uppercase">3.4% of NFT rewards</h5>
					</div>
					<div className="card_container mr-4">
						<div className="card">
							<p className="issued">{nftQuantity[6]}x</p>
							<img src={tier2} alt="" />
						</div>
						<h5 className="img-title text-uppercase m-0 mt-3">
							<a href={nftURL + '1'} target="blank">
								Explorer
							</a>
						</h5>
						<h5 className="total-issued text-uppercase">1.0% of NFT rewards</h5>
					</div>
					<div className="card_container">
						<div className="card">
							<p className="issued">{nftQuantity[7]}x</p>
							<img src={tier1} alt="" />
						</div>
						<h5 className="img-title text-uppercase m-0 mt-3">
							<a href={nftURL + '0'} target="blank">
								Visionary
							</a>
						</h5>
						<h5 className="total-issued text-uppercase">0.2% of NFT rewards</h5>
					</div>
				</div>
			</div>
		</div>
	);
}

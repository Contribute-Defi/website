import React from 'react';
import nasa from '../../assets/nasa.jpg';

function SectionAccountInfo(props) {
	return (
		<div className="account-info_container">
			<div className="account-info mx-auto text-center">
				<h3 className="account-info_header text-uppercase">Account Info</h3>
				<div className="account-details_container">
					<div className="account-detail_container contributed-detail d-flex justify-content-between">
						<h5 className="account-detail-key m-0">Contribute</h5>
						<h5 className="account-detail-value m-0">
							100,000 <span>TRIB</span>
						</h5>
					</div>
					<div className="account-detail_container nft-detail d-flex justify-content-between">
						<h5 className="account-detail-key m-0">NFTs Earned</h5>
						<h5 className="account-detail-value m-0"></h5>
					</div>
					<div className="account-detail_container common-detail d-flex justify-content-between">
						<h5 className="account-detail-key m-0">COMMON</h5>
						<h5 className="account-detail-value m-0">2X</h5>
					</div>
					<div className="account-detail_container tribber-detail d-flex justify-content-between">
						<h5 className="account-detail-key m-0">TRIBBER</h5>
						<h5 className="account-detail-value m-0">1X</h5>
					</div>
				</div>
				<div className="nft-gallery_container text-center">
					<h3 className="nft-gallery_header text-uppercase">Nft Gallery</h3>
					<div className="nft-gallery mx-auto d-flex">
						<div className="gallery_container mr-3">
							<div className="gallery-img d-flex justify-content-center align-items-center">
								<img src={nasa} alt="" />
							</div>
							<h5 className="img-title text-uppercase mt-2">Visionary</h5>
						</div>
						<div className="gallery_container ml-3">
							<div className="gallery-img d-flex justify-content-center align-items-center">
								<img src={nasa} alt="" />
							</div>
							<h5 className="img-title text-uppercase mt-2">Explorer</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SectionAccountInfo;

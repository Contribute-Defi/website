import React from 'react';
import { Link } from 'react-router-dom';
import { EthersStatus, useEthers } from '../../app';
import { shortenAddress } from '../../lib';
import { Menu } from './Menu';

function Header(props) {
	const { connect, connected, address, error, status } = useEthers();

	if (status === EthersStatus.DISCONNECTED) {
		return (
			<div className="header_container">
				<div className="header mx-auto d-flex justify-content-between align-items-center">
					<div className="logo_container">
						<h3 className="logo text-uppercase m-0">
							Con<span>trib</span>ute
						</h3>
					</div>
					<Menu />
					<button className="connect-wallet-btn" onClick={() => connect()}>
						Connect Wallet
					</button>
				</div>
			</div>
		);
	}
	if (!connected) {
		return (
			<div className="header_container d-flex">
				<div className="header mx-auto d-flex justify-content-between align-items-center">
					<div className="logo_container">
						<h3 className="logo text-uppercase m-0">
							Con<span>trib</span>ute
						</h3>
					</div>
					<Menu />
					<button className="connect-wallet-btn">Connect Wallet</button>
				</div>
			</div>
		);
	}
	return (
		<div className="header_container d-flex">
			<div className="header mx-auto d-flex justify-content-between align-items-center">
				<div className="logo_container">
					<h3 className="logo text-uppercase m-0">
						Con<span>trib</span>ute
					</h3>
				</div>
				<Menu />
				<p className="connected_wallet">
					<strong>Wallet connected:</strong> {shortenAddress(address)}
				</p>
			</div>
		</div>
	);
}

export default Header;

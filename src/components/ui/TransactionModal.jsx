import React from 'react';
import { Modal } from 'react-bootstrap';

export function TransactionModal({ status, onHide }) {
	if (status === 0) return null;

	return (
		<Modal show={true} onHide={onHide}>
			<Modal.Header closeButton={status === 3 || status === 10}>Transaction</Modal.Header>
			<Modal.Body>
				{status === 1 ? (
					<span>Waiting for signature...</span>
				) : status === 2 ? (
					<span>Waiting for network confirmation...</span>
				) : status === 10 ? (
					<span>
						Error when processing the transaction. See error console (F12) for details and contact us when
						not sure what to do.
					</span>
				) : (
					<span>Transaction finished.</span>
				)}
			</Modal.Body>
		</Modal>
	);
}

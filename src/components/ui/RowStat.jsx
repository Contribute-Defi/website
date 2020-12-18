import React from 'react';
import PropTypes from 'prop-types';
import { stats } from '../../config/const';
import { ContractValue } from './ContractValue';
import { Col, Row } from 'react-bootstrap';

function RowStat({ id, idSecondary, value, label, unit, params, nohr }) {
	if (!label && stats[id]) label = stats[id].label;
	if (!unit && stats[id]) unit = stats[id].unit;
	const unitSecondary = stats[idSecondary] ? stats[idSecondary].unit : null;

	return (
		<div className="row-stat mb-3">
			<Row>
				<Col>{label}</Col>
				<Col className="text-right">
					{value ? value : <ContractValue id={id} params={params} />} {unit}
					{idSecondary ? (
						<div className="stat-secondary">
							<ContractValue id={idSecondary} /> {unitSecondary}
						</div>
					) : null}
				</Col>
			</Row>
			{!nohr && <hr />}
		</div>
	);
}
export { RowStat };

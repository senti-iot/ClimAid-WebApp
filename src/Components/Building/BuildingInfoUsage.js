import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import buildingStyles from 'Styles/buildingStyles';
import { Notifications } from 'variables/icons';

const BuildingInfoUsage = (props) => {
	const classes = buildingStyles();

	return (
		<div>
			<p><b>Brugstid</b></p>
			<Table className={classes.table} aria-label="Brugstid tabel">
				<TableBody>
					<TableRow style={{ height: 40 }} hover>
						<TableCell>Energiforbrug: Fjernvarme</TableCell>
						<TableCell></TableCell>
						<TableCell><Notifications style={{ color: '#ccc' }} /></TableCell>
					</TableRow>
					<TableRow style={{ height: 40 }} hover>
						<TableCell>Energiforbrug: Brugsvand</TableCell>
						<TableCell></TableCell>
						<TableCell><Notifications style={{ color: '#ccc' }} /></TableCell>
					</TableRow>
					<TableRow style={{ height: 40 }} hover>
						<TableCell>Energiforbrug: Solceller</TableCell>
						<TableCell></TableCell>
						<TableCell><Notifications style={{ color: '#ccc' }} /></TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}

export default BuildingInfoUsage;
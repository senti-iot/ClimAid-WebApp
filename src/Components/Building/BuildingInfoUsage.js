import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import buildingStyles from 'Styles/buildingStyles';
// import { Notifications } from 'variables/icons';

const BuildingInfoUsage = (props) => {
	const classes = buildingStyles();

	return (
		<>
			<p><b>Brugstid</b></p>
			<Table className={classes.table} aria-label="Brugstid tabel">
				<TableBody>
					{props.building.usage.map(usageInfo => {
						return <TableRow style={{ height: 40 }}>
							<TableCell>{usageInfo.text}</TableCell>
							<TableCell align="right">{usageInfo.value} {usageInfo.unit}</TableCell>
							<TableCell align="right">{/* <Notifications style={{ color: '#ccc' }} /> */}</TableCell>
						</TableRow>
					})}
				</TableBody>
			</Table>
		</>
	);
}

export default BuildingInfoUsage;
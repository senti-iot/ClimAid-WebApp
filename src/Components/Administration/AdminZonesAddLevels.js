import React from 'react';
import { Grid, Paper } from '@material-ui/core';

import adminStyles from 'Styles/adminStyles';
import AdminMenu from './AdminMenu';

const AdminZonesAddLevels = props => {
	const classes = adminStyles();

	console.log(props.history.location.state);

	return (
		<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={3}>
			<Grid container item xs={3}>
				<Paper elevation={3} className={classes.adminPaperContainer}>
					<AdminMenu />
				</Paper>
			</Grid>
			<Grid container item xs={6}>
				<Paper elevation={3} className={classes.adminPaperContainer}>
					<div className={classes.adminHeader}>Tilføj zone - grænseværdier</div>

					<table width="100%" border="1">
						<thead>
							<tr>
								<td></td>
								<td>Rødzone nedre</td>
								<td>Gulzone nedre</td>
								<td>Grønzone nedre</td>
								<td>Grønzone øvre</td>
								<td>Gulzone øvre</td>
								<td>Rødzone øvre</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Temperatur [°C]</td>
								<td><input id='temp_red_lower' /></td>
								<td><input id='temp_yellow_lower' /></td>
								<td><input id='temp_green_lower' /></td>
								<td><input id='temp_green_upper' /></td>
								<td><input id='temp_yellow_upper' /></td>
								<td><input id='temp_red_upper' /></td>
							</tr>
							<tr>
								<td>Relativ luftfugtighed [%]</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>CO2 koncentration [ppm]</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Lysniveau [lx]</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Partikler [ug/m3]</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>VOC [mg/m2]</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Batteri [%]</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>

					</table>

				</Paper>
			</Grid>
			<Grid container item xs={3}>
				<Paper elevation={3} className={classes.adminPaperContainer}>
				</Paper>
			</Grid>
		</Grid >
	);
}

export default AdminZonesAddLevels;
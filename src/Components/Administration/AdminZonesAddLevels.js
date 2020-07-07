import React, { useState } from 'react';
import { Grid, Paper, ButtonGroup, Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import adminStyles from 'Styles/adminStyles';
import AdminMenu from './AdminMenu';
import { addRoom } from 'data/climaid';

const AdminZonesAddLevels = props => {
	const classes = adminStyles();
	const [levelValues, setLevelValues] = useState({});
	const [alertSuccess, setAlertSuccess] = useState(false);
	const [alertFail, setAlertFail] = useState(false);

	// console.log(props.history.location.state);

	const handleAlertSuccessClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlertSuccess(false);
	};

	const handleAlertFailClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlertFail(false);
	}

	const handleInputChange = event => {
		let newValues = { ...levelValues };
		newValues[event.target.id] = event.target.value;
		console.log(newValues);
		setLevelValues(newValues);
	}

	const handleReset = () => {
		setLevelValues([]);
	}

	const handleCancel = () => {
		props.history.goBack();
	};

	const handleSave = async () => {
		let data = {
			name: props.history.location.state.name,
			address: props.history.location.state.address,
			size: props.history.location.state.size,
			primaryFunction: props.history.location.state.primaryFunction,
			levels: levelValues,
			building: {
				uuid: props.history.location.state.building
			}
		}

		const result = await addRoom(data);
		console.log(result);
		if (!result) {
			setAlertFail(true);
		} else {
			setAlertSuccess(true);

			setTimeout(function () {
				props.history.push('/administration/zones/list/' + props.history.location.state.building);
			}, 500);
		}
	}

	return (
		<>
			<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={3}>
				<Grid container item xs={3}>
					<Paper elevation={3} className={classes.adminPaperContainer}>
						<AdminMenu />
					</Paper>
				</Grid>
				<Grid container item xs={6}>
					<Paper elevation={3} className={classes.adminPaperContainer}>
						<div className={classes.adminHeader}>Zone oprettelse - Grænseværdier</div>

						<p>Herunder indtastes grænseværdierne for hvordan målingerne skal analyseres. Felterne er udfyldt med de værdier som Dansk Standard anbefaler.</p>
						<p>Alle felter skal udfyldes. Tips, hvis du ændrer i værdierne, start med de grønne.</p>

						<table width="100%" border="0" cellPadding="5" cellSpacing="0">
							<thead>
								<tr>
									<td></td>
									<td className={`${classes.levelHeaderCell} ${classes.levelCellRed}`}>Rødzone nedre</td>
									<td className={`${classes.levelHeaderCell} ${classes.levelCellYellow}`}>Gulzone nedre</td>
									<td className={`${classes.levelHeaderCell} ${classes.levelCellGreen}`}>Grønzone nedre</td>
									<td className={`${classes.levelHeaderCell} ${classes.levelCellGreen}`}>Grønzone øvre</td>
									<td className={`${classes.levelHeaderCell} ${classes.levelCellYellow}`}>Gulzone øvre</td>
									<td className={`${classes.levelHeaderCell} ${classes.levelCellRed}`}>Rødzone øvre</td>
								</tr>
							</thead>
							<tbody>
								<tr className={classes.levelRow}>
									<td>Temperatur [°C]</td>
									<td className={`${classes.levelCell} ${classes.levelCellRed}`}><input id='temp_red_lower' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellYellow}`}><input id='temp_yellow_lower' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellGreen}`}><input id='temp_green_lower' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellGreen}`}><input id='temp_green_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellYellow}`}><input id='temp_yellow_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellRed}`}><input id='temp_red_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
								</tr>
								<tr className={classes.levelRow}>
									<td>Relativ luftfugtighed [%]</td>
									<td className={`${classes.levelCell} ${classes.levelCellRed}`}><input id='humidity_red_lower' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellYellow}`}><input id='humidity_yellow_lower' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellGreen}`}><input id='humidity_green_lower' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellGreen}`}><input id='humidity_green_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellYellow}`}><input id='humidity_yellow_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellRed}`}><input id='humidity_red_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
								</tr>
								<tr className={classes.levelRow}>
									<td>CO2 koncentration [ppm]</td>
									<td className={`${classes.levelCell} ${classes.levelCellRed}`}></td>
									<td className={`${classes.levelCell} ${classes.levelCellYellow}`}></td>
									<td className={`${classes.levelCell} ${classes.levelCellGreen}`}></td>
									<td className={`${classes.levelCell} ${classes.levelCellGreen}`}><input id='co2_green_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellYellow}`}><input id='co2_yellow_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellRed}`}><input id='co2_red_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
								</tr>
								<tr className={classes.levelRow}>
									<td>Lysniveau [lx]</td>
									<td className={`${classes.levelCell} ${classes.levelCellRed}`}></td>
									<td className={`${classes.levelCell} ${classes.levelCellYellow}`}></td>
									<td className={`${classes.levelCell} ${classes.levelCellGreen}`}></td>
									<td className={`${classes.levelCell} ${classes.levelCellGreen}`}><input id='lux_green_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellYellow}`}><input id='lux_yellow_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellRed}`}><input id='lux_red_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
								</tr>
								<tr className={classes.levelRow}>
									<td>Partikler [ug/m3]</td>
									<td className={`${classes.levelCell} ${classes.levelCellRed}`}></td>
									<td className={`${classes.levelCell} ${classes.levelCellYellow}`}></td>
									<td className={`${classes.levelCell} ${classes.levelCellGreen}`}></td>
									<td className={`${classes.levelCell} ${classes.levelCellGreen}`}><input id='p_green_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellYellow}`}><input id='p_yellow_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellRed}`}><input id='p_red_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
								</tr>
								<tr className={classes.levelRow}>
									<td>VOC [mg/m2]</td>
									<td className={`${classes.levelCell} ${classes.levelCellRed}`}></td>
									<td className={`${classes.levelCell} ${classes.levelCellYellow}`}></td>
									<td className={`${classes.levelCell} ${classes.levelCellGreen}`}></td>
									<td className={`${classes.levelCell} ${classes.levelCellGreen}`}><input id='voc_green_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellYellow}`}><input id='voc_yellow_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellRed}`}><input id='voc_red_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
								</tr>
								<tr className={classes.levelRow}>
									<td>Batteri [%]</td>
									<td className={`${classes.levelCell} ${classes.levelCellRed}`}><input id='battery_red_lower' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellYellow}`}><input id='battery_yellow_lower' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellGreen}`}><input id='battery_green_lower' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellGreen}`}><input id='battery_green_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellYellow}`}><input id='battery_yellow_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
									<td className={`${classes.levelCell} ${classes.levelCellRed}`}><input id='battery_red_upper' onChange={handleInputChange} className={classes.levelInput} /></td>
								</tr>
							</tbody>
						</table>

						<Grid container style={{ marginTop: 40 }}>
							<Grid container item xs={6}>
								<Button onClick={handleReset} variant="contained" color="primary">Gendan anbefalede værdier</Button>
							</Grid>
							<Grid container item xs={6} justify="flex-end">
								<ButtonGroup variant="contained" color="primary">
									<Button onClick={handleCancel}>Annuller</Button>
									<Button onClick={handleSave}>Opret</Button>
								</ButtonGroup>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid container item xs={3}>
					<Paper elevation={3} className={classes.adminPaperContainer}>
					</Paper>
				</Grid>
			</Grid >
			<Snackbar open={alertSuccess} autoHideDuration={3000} onClose={handleAlertSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
				<Alert onClose={handleAlertSuccessClose} severity="success" elevation={6} variant="filled">Zone oprettet!</Alert>
			</Snackbar>
			<Snackbar open={alertFail} autoHideDuration={3000} onClose={handleAlertFailClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
				<Alert onClose={handleAlertFailClose} severity="error" elevation={6} variant="filled">Der opstod en fejl!</Alert>
			</Snackbar>
		</>
	);
}

export default AdminZonesAddLevels;
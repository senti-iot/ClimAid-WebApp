import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Grid, Paper } from '@material-ui/core';

import adminStyles from 'Styles/adminStyles';
import { addBuilding } from 'data/climaid';
import AdminMenu from './AdminMenu';

const AdminBuildingsAdd = (props) => {
	const classes = adminStyles();
	const [formData, setformData] = useState({ name: '', latlong: '' });
	const [alertSuccess, setAlertSuccess] = React.useState(false);
	const [alertFail, setAlertFail] = React.useState(false);

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
	};

	const handleChange = (e) => {
		const { id, value } = e.target
		setformData({ ...formData, [id]: value })
	}

	const handleFormSubmit = async () => {
		let result = await addBuilding(formData);

		if (!result) {
			setAlertFail(true);
		} else {
			setAlertSuccess(true);

			setTimeout(function () {
				props.history.push('/administration/buildings/list');
			}, 500);
		}
	}

	return (
		<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={3}>
			<Grid container item xs={3}>
				<Paper elevation={3} className={classes.adminPaperContainer}>
					<AdminMenu />
				</Paper>
			</Grid>
			<Grid container item xs={6}>
				<Paper elevation={3} className={classes.adminPaperContainer}>
					<div className={classes.adminHeader}>Tilføj bygning</div>

					<Grid container justify={'flex-start'} spacing={0}>
						<form >
							<Grid item xs={12}>
								<TextField
									id={'name'}
									label='Bygning navn'
									// value={user.firstName}
									// className={classes.textField}
									onChange={(e) => handleChange(e)}
									margin='normal'
									variant='outlined'
									// error={error}
									className={classes.textField}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id={'latlong'}
									label='Bygning lokation'
									// value={user.firstName}
									// className={classes.textField}
									onChange={(e) => handleChange(e)}
									margin='normal'
									variant='outlined'
									color='primary'
									// error={error}
								/>
							</Grid>
						</form>
						<Grid item xs={12}>
							<p>
								<Button
									variant="contained"
									color="primary"
									onClick={handleFormSubmit}
								>Gem</Button>
							</p>
						</Grid>
					</Grid>
					<Snackbar open={alertSuccess} autoHideDuration={3000} onClose={handleAlertSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
						<Alert onClose={handleAlertSuccessClose} severity="success" elevation={6} variant="filled">Bygning tilføjet!</Alert>
					</Snackbar>
					<Snackbar open={alertFail} autoHideDuration={3000} onClose={handleAlertFailClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
						<Alert onClose={handleAlertFailClose} severity="error" elevation={6} variant="filled">Der opstod en fejl!</Alert>
					</Snackbar>
				</Paper>
			</Grid>
			<Grid container item xs={3}>
				<Paper elevation={3} className={classes.adminPaperContainer}>
				</Paper>
			</Grid>
		</Grid >
	);
}

export default AdminBuildingsAdd;
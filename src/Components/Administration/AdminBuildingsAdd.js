import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { GridContainer, ItemGrid } from 'Components';
import adminStyles from 'Styles/adminStyles';
import { addBuilding } from 'data/climaid';

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
		<Paper elevation={3} className={classes.adminPaperContainer}>
			<h1 className={classes.adminHeader}>Tilføj bygning</h1>

			<GridContainer justify={'flex-start'}>
				<form >
					<ItemGrid container xs={12}>
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
					</ItemGrid>
					<ItemGrid container xs={12}>
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
					</ItemGrid>
				</form>
				<ItemGrid container xs={12}>
					<p>
						<Button
							variant="contained"
							color="primary"
							onClick={handleFormSubmit}
						>
							Gem
						</Button>
					</p>
				</ItemGrid>
			</GridContainer>
			<Snackbar open={alertSuccess} autoHideDuration={3000} onClose={handleAlertSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
				<Alert onClose={handleAlertSuccessClose} severity="success" elevation={6} variant="filled">Bygning tilføjet!</Alert>
			</Snackbar>
			<Snackbar open={alertFail} autoHideDuration={3000} onClose={handleAlertFailClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
				<Alert onClose={handleAlertFailClose} severity="error" elevation={6} variant="filled">Der opstod en fejl!</Alert>
			</Snackbar>
		</Paper>
	);
}

export default AdminBuildingsAdd;
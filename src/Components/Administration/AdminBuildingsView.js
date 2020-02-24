import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { climaidApi } from 'data/climaid';
import adminStyles from 'Styles/adminStyles';
import { getBuilding, addBuildingImage } from 'data/climaid';
// import AdminBuildingViewImage from 'Components/Administration/AdminBuildingsViewImage';

const AdminBuildingsView = (props) => {
	const { uuid } = useParams();
	const [building, setBuilding] = useState(null);
	const [alertSuccess, setAlertSuccess] = React.useState(false);
	const [alertFail, setAlertFail] = React.useState(false);
	const classes = adminStyles();

	useEffect(() => {
		async function fetchData() {
			const data = await getBuilding(uuid);

			if (data) {
				setBuilding(data);
			}
		}

		fetchData();
	}, [uuid]);

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

	const uploadImage = async (e) => {
		var formData = new FormData();
		formData.append('file', e.target.files[0]);

		let uploadResult = await addBuildingImage(building.uuid, formData);

		if (!uploadResult.filename) {
			setAlertFail(true);
		} else {
			setAlertSuccess(true);
			const data = await getBuilding(uuid);

			if (data) {
				console.log(data);
				setBuilding(data);
			}
		}
	}

	return (
		<Paper elevation={3} className={classes.adminPaperContainer}>
			{building ?
				<div>
					<h1 className={classes.adminHeader}>{building.name}</h1>

					<label htmlFor="contained-button-file">
						<Button variant="contained" color="primary" component="span">Vedhæft plantegning</Button>
					</label>

					<p>Lokation: {building.latlong}</p>
					<p>Billede:</p>

					{/* <AdminBuildingViewImage building={building} /> */}
					{building.image ?
						<img style={{ maxWidth: 400 }} src={climaidApi.getBaseURL() + '/building/' + building.uuid + '/image'} alt="" />
						: "<p>Intet valgt</p>"
					}

					<form>
						<input
							accept="image/*"
							className={classes.uploadinput}
							id="contained-button-file"
							type="file"
							name="file"
							onChange={uploadImage}
						/>
					</form>

					<Snackbar open={alertSuccess} autoHideDuration={3000} onClose={handleAlertSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
						<Alert onClose={handleAlertSuccessClose} severity="success" elevation={6} variant="filled">Billede tilføjet!</Alert>
					</Snackbar>
					<Snackbar open={alertFail} autoHideDuration={3000} onClose={handleAlertFailClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
						<Alert onClose={handleAlertFailClose} severity="error" elevation={6} variant="filled">Der opstod en fejl!</Alert>
					</Snackbar>
				</div>
				: ""}
		</Paper>
	)
}

export default AdminBuildingsView;
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Grid, Paper } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { DropzoneArea } from 'material-ui-dropzone';

import adminStyles from 'Styles/adminStyles';
import { addBuilding, addBuildingImage } from 'data/climaid';
import { addressLookup } from 'data/data';
import AdminMenu from './AdminMenu';

const AdminBuildingsAdd = (props) => {
	const classes = adminStyles();
	const [alertSuccess, setAlertSuccess] = useState(false);
	const [alertFail, setAlertFail] = useState(false);

	const [name, setName] = useState('');
	const [nameError, setNameError] = useState('');
	const [address, setAddress] = useState('');
	const [addressError, setAddressError] = useState('');
	const [size, setSize] = useState('');
	const [sizeError, setSizeError] = useState('');
	const [primaryFunction, setPrimaryFunction] = useState('');
	const [primaryFunctionError, setPrimaryFunctionError] = useState('');
	const [file, setFile] = useState(null);

	const primaryFunctionOptions = ['Kontor', 'Undervisning', 'Kantine', 'Mødelokale', 'Lager', 'Køkken'];

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

	const handleCancel = () => {
		props.history.push('/administration/buildings/list');
	}

	const handleSave = async () => {
		let isOK = true;

		if (!name.length) {
			setNameError('Du skal indtaste et navn på bygningen');
			isOK = false;
		} else if (!address.length) {
			setAddressError('Du skal indtaste en adresse på bygningen');
			isOK = false;
		} else if (!size.length) {
			setSizeError('Du skal indtaste en størrelse på bygningen');
			isOK = false;
		} else if (!primaryFunction.length) {
			setPrimaryFunctionError('Du skal vælge en primær funktion på bygningen');
			isOK = false;
		}

		let latlong = '';
		if (address.length) {
			let addresses = await addressLookup(address);

			if (!addresses.length) {
				setAddressError('Addressen blev ikke fundet');
				isOK = false;
			} else {
				latlong = addresses[0]["adgangsadresse"]["adgangspunkt"]["koordinater"][1] + ', ' + addresses[0]["adgangsadresse"]["adgangspunkt"]["koordinater"][0];
			}
		}

		if (isOK) {
			let data = { name: name, address: address, latlong: latlong, size: size, primaryFunction: primaryFunction };
			console.log(data);

			let added = true;

			let result = await addBuilding(data);
			console.log(result);
			if (!result) {
				added = false;

				setAlertFail(true);
			} else {
				if (file) {
					let imageData = { filename: file.name, filedata: await toBase64(file[0]) }
					let imageResultStatus = await addBuildingImage(result.uuid, imageData);

					if (imageResultStatus !== 200) {
						added = false;
					}
				}

				if (!added) {
					setAlertFail(true);
				} else {
					setAlertSuccess(true);

					setTimeout(function () {
						props.history.push('/administration/buildings/list');
					}, 500);
				}
			}
		}
	}

	const toBase64 = file => new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result.replace('data:', '').replace(/^.+,/, ''));
		reader.onerror = error => reject(error);
	});

	const handleUpload = async (file) => {
		if (file.length) {
//			console.log(await toBase64(file[0]));
			console.log(file[0]);
			setFile(file[0]);
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
						<form>
							<Grid item xs={12}>
								<TextField
									id={'name'}
									label='Bygning navn'
									value={name}
									onChange={(e) => setName(e.target.value)}
									margin='normal'
									variant='outlined'
									error={nameError.length ? true : false}
									helperText={nameError}
									className={classes.textField}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id={'address'}
									label='Bygning adresse'
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									margin='normal'
									variant='outlined'
									color='primary'
									error={addressError.length ? true : false}
									helperText={addressError}
									className={classes.textField}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id={'latlong'}
									label='Bygning størrelse i m2'
									value={size}
									onChange={(e) => setSize(e.target.value)}
									margin='normal'
									variant='outlined'
									color='primary'
									error={sizeError.length ? true : false}
									helperText={sizeError}
									className={classes.textField}
								/>
							</Grid>
							<Grid item xs={12} style={{ marginTop: 15 }}>
								<TextField
									id="primaryfunction"
									select
									label="Bygningens primære funktion"
									value={primaryFunction}
									onChange={(e) => setPrimaryFunction(e.target.value)}
									error={primaryFunctionError.length ? true : false}
									helperText={primaryFunctionError}
									variant="outlined"
									className={classes.textField}
								>
									{primaryFunctionOptions.map((option) => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12} style={{ marginTop: 20 }}>
								<DropzoneArea
									onChange={handleUpload}
									acceptedFiles={['image/jpeg', 'image/png']}
									showPreviewsInDropzone={false}
									maxFileSize={1000000}
									filesLimit={1}
									showAlerts={false}
									dropzoneText="Upload plantegning"
								/>
							</Grid>
						</form>
						<Grid item xs={12} style={{ marginTop: 40 }}>
							<ButtonGroup variant="contained" color="primary">
								<Button onClick={handleCancel}>Annuller</Button>
								<Button onClick={handleSave}>Opret</Button>
							</ButtonGroup>
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
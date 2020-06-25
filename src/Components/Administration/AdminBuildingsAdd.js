import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Grid, Paper } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { DropzoneArea } from 'material-ui-dropzone';

import adminStyles from 'Styles/adminStyles';
import { addBuilding, addBuildingImage, setBuildingPermissions } from 'data/climaid';
import { addressLookup } from 'data/data';
import { getUserOrgs, getUser } from 'data/users';
import AdminMenu from './AdminMenu';
import CircularLoader from 'Components/Loaders/CircularLoader';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const AdminBuildingsAdd = (props) => {
	const classes = adminStyles();
	const [alertSuccess, setAlertSuccess] = useState(false);
	const [alertFail, setAlertFail] = useState(false);

	const [loading, setLoading] = useState(true);
	const [orgs, setOrgs] = useState([]);

	const [name, setName] = useState('');
	const [nameError, setNameError] = useState('');
	const [address, setAddress] = useState('');
	const [addressError, setAddressError] = useState('');
	const [size, setSize] = useState('');
	const [sizeError, setSizeError] = useState('');
	const [primaryFunction, setPrimaryFunction] = useState('');
	const [primaryFunctionError, setPrimaryFunctionError] = useState('');
	const [visibleTo, setVisibleTo] = useState([]);
	const [file, setFile] = useState(null);

	const primaryFunctionOptions = ['Kontor', 'Undervisning', 'Kantine', 'Mødelokale', 'Lager', 'Køkken'];

	useEffect(() => {
		async function fetchData() {
			const user = await getUser();

			setVisibleTo([user.org.uuid]);

			const orgData = await getUserOrgs();

			if (orgData) {
				setOrgs(orgData);
				setLoading(false);
			}
		}

		fetchData();
	}, []);

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

			let added = true;

			let result = await addBuilding(data);

			if (!result) {
				added = false;

				setAlertFail(true);
			} else {
				if (visibleTo.length) {
					await setBuildingPermissions(result.uuid, visibleTo);
				}

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
			setFile(file[0]);
		}
	}

	const handleVisibleToChange = (event) => {
		setVisibleTo(event.target.value);
	}

	return (
		!loading ? (
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
								<Grid item xs={12} style={{ marginTop: 20 }}>
									<FormControl className={classes.formControl}>
										<InputLabel id="visibleTo-select-label">Synlig for</InputLabel>
										<Select
											labelId="visibleTo-select-label"
											id="visibleTo"
											multiple
											value={visibleTo}
											onChange={handleVisibleToChange}
											input={<Input id="select-multiple-chip" />}
											renderValue={(selected) => (
												<div>
													{selected.map((value) => {
														let result = orgs.filter(obj => {
  															return obj.uuid === value;
														})
														return <Chip key={value} label={result[0].name} />
													})}
												</div>
											)}
											MenuProps={MenuProps}
										>
											{orgs.map((org) => (
												<MenuItem key={org.uuid} value={org.uuid}>
													{org.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
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
		) : (
			<CircularLoader fill />
		)
	);
}

export default AdminBuildingsAdd;
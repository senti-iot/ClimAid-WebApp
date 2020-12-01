import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, TextField, ButtonGroup, Button, Snackbar, Grid, Paper, MenuItem, FormControl, InputLabel, Input, Select, Chip } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { DropzoneArea } from 'material-ui-dropzone';

import adminStyles from 'Styles/adminStyles';
import { updateBuilding, setBuildingPermissions, getBuilding, getBuildingImage, addBuildingImage, getBuildingPermissions, getRoomsInBuilding, updateRoom } from 'data/climaid';
import { addressLookup } from 'data/data';
import { getUserOrgs } from 'data/users';
import AdminMenu from './AdminMenu';
import AdminBuildingMap from './AdminBuildingMap';
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

const AdminBuildingsEdit = (props) => {
	const classes = adminStyles();
	const [alertSuccess, setAlertSuccess] = useState(false);
	const [alertFail, setAlertFail] = useState(false);
	const { uuid } = useParams();

	const [loading, setLoading] = useState(true);
	const [orgs, setOrgs] = useState([]);
	const [building, setBuilding] = useState(null);
	const [rooms, setRooms] = useState(null);
	const [roomLocations, setRoomLocations] = useState({});

	const [name, setName] = useState('');
	const [nameError, setNameError] = useState('');
	const [address, setAddress] = useState('');
	const [addressError, setAddressError] = useState('');
	const [latlong, setLatLong] = useState('');
	const [latlongError, setLatLongError] = useState('');
	const [size, setSize] = useState('');
	const [sizeError, setSizeError] = useState('');
	const [primaryFunction, setPrimaryFunction] = useState('');
	const [primaryFunctionError, setPrimaryFunctionError] = useState('');
	const [visibleTo, setVisibleTo] = useState([]);
	const [file, setFile] = useState(null);
	const [image, setImage] = useState(null);

	const primaryFunctionOptions = ['Kontor', 'Undervisning', 'Kantine', 'Mødelokale', 'Lager', 'Køkken'];

	useEffect(() => {
		async function fetchData() {

			const buildingData = await getBuilding(uuid);

			setBuilding(buildingData);
			setName(buildingData.name);
			setAddress(buildingData.address ? buildingData.address : '');
			setLatLong(buildingData.latlong);
			setSize(buildingData.size ? buildingData.size : '');
			setPrimaryFunction(buildingData.primaryFunction ? buildingData.primaryFunction : '');

			const roomsData = await getRoomsInBuilding(uuid);
			setRooms(roomsData);

			const imageData = await getBuildingImage(uuid);
			if (imageData) {
				setImage(imageData);
			}

			const permissions = await getBuildingPermissions(uuid);
			if (permissions) {
				setVisibleTo(permissions);
			}

			const orgData = await getUserOrgs();

			if (orgData) {
				setOrgs(orgData);
			}

			setLoading(false);
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
	}

	const handleCancel = () => {
		props.history.push('/administration/buildings/list');
	}

	const handleSave = async () => {
		let isOK = true;

		setNameError('');
		setAddressError('');
		setLatLongError('');
		setSizeError('');
		setPrimaryFunctionError('');

		if (!name.length) {
			setNameError('Du skal indtaste et navn på bygningen');
			isOK = false;
		} else if (!address.length) {
			setAddressError('Du skal indtaste en adresse på bygningen');
			isOK = false;
		} else if (!latlong.length) {
			setLatLongError('Du skal indtaste en lokation på bygningen');
			isOK = false;
		} else if (!size.length) {
			setSizeError('Du skal indtaste en størrelse på bygningen');
			isOK = false;
		} else if (!primaryFunction.length) {
			setPrimaryFunctionError('Du skal vælge en primær funktion på bygningen');
			isOK = false;
		}

		if (isOK) {
			building.name = name;
			building.address = address;
			building.latlong = latlong;
			building.size = size;
			building.primaryFunction = primaryFunction;

			let updated = true;

			let result = await updateBuilding(building);

			if (!result) {
				updated = false;

				setAlertFail(true);
			} else {
				if (visibleTo.length) {
					await setBuildingPermissions(result.uuid, visibleTo);
				}

				if (file) {
					let imageData = { filename: file[0].name, filedata: await toBase64(file[0]) }
					let imageResultStatus = await addBuildingImage(result.uuid, imageData);

					if (imageResultStatus !== 200) {
						updated = false;
					}
				}

				//update room locations
				rooms.map(async room => {
					if (roomLocations[room.uuid]) {
						room.bounds = JSON.parse(roomLocations[room.uuid]);
						await updateRoom(room);
					}
				});

				if (!updated) {
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
			setFile(file);
		}
	}

	const handleVisibleToChange = (event) => {
		setVisibleTo(event.target.value);
	}

	const saveLocations = (locations) => {
		setRoomLocations(locations);
	}

	const findLatLong = async (value) => {
		setLatLongError('');
		if (!latlong.length && value.length) {
			const addresLookupResult = await addressLookup(value);
			if (!addresLookupResult.length) {
				setLatLongError('Kunne ikke finde adressens lokation, indtast lokation manuelt eller ret adressen');
			} else {
				setLatLong(addresLookupResult[0]['adgangsadresse']['adgangspunkt']['koordinater'][1] + ', ' + addresLookupResult[0]['adgangsadresse']['adgangspunkt']['koordinater'][0]);
			}
		}
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
						<div className={classes.adminHeader}>Opdater bygning</div>

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
										onBlur={e => findLatLong(e.target.value)}
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
										label='Bygning lokation'
										value={latlong}
										onChange={(e) => setLatLong(e.target.value)}
										margin='normal'
										variant='outlined'
										color='primary'
										error={latlongError.length ? true : false}
										helperText={latlongError}
										className={classes.textField}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id={'size'}
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
									{file ? <Typography variant="body1" style={{ marginTop: 10 }}>Valgt fil:  {file[0].name}</Typography> : ""}
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

							{image ?
								<Grid item xs={12} style={{ marginTop: 20 }}>
									<InputLabel id="visibleTo-select-label">Placer zoner</InputLabel>
									<AdminBuildingMap building={building} rooms={rooms} saveLocations={saveLocations} />
								</Grid>
								: ""}

							<Grid item xs={12} style={{ marginTop: 40 }}>
								<ButtonGroup variant="contained" color="primary">
									<Button onClick={handleCancel}>Annuller</Button>
									<Button onClick={handleSave}>Gem</Button>
								</ButtonGroup>
							</Grid>
						</Grid>
						<Snackbar open={alertSuccess} autoHideDuration={3000} onClose={handleAlertSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
							<Alert onClose={handleAlertSuccessClose} severity="success" elevation={6} variant="filled">Bygning opdateret!</Alert>
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

export default AdminBuildingsEdit;
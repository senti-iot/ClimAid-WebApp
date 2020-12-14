import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper, TextField, Button, ButtonGroup, MenuItem, Snackbar, Typography, InputLabel } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { DropzoneArea } from 'material-ui-dropzone';

import { getRoom, updateRoomDevice, updateRoom, addRoomImage } from 'data/climaid';
import adminStyles from 'Styles/adminStyles';
import CircularLoader from 'Components/Loaders/CircularLoader';
import AdminZoneMap from './AdminZoneMap';

const AdminZonesEdit = props => {
	const [alertSuccess, setAlertSuccess] = useState(false);
	const [alertFail, setAlertFail] = useState(false);
	const { uuid } = useParams();
	const classes = adminStyles();

	const [loading, setLoading] = useState(true);
	const [deviceLocations, setDeviceLocations] = useState({});
	const [devices, setDevices] = useState(null);
	const [zone, setZone] = useState(null);
	const [building, setBuilding] = useState('');
	const [name, setName] = useState('');
	const [nameError, setNameError] = useState('');
	const [address, setAddress] = useState('');
	const [addressError, setAddressError] = useState('');
	const [size, setSize] = useState('');
	const [sizeError, setSizeError] = useState('');
	const [primaryFunction, setPrimaryFunction] = useState('');
	const [primaryFunctionError, setPrimaryFunctionError] = useState('');
	const [file, setFile] = useState(null);
	const [image, setImage] = useState(null);

	const primaryFunctionOptions = ['Kontor', 'Undervisning', 'Kantine', 'Mødelokale', 'Lager', 'Køkken'];

	useEffect(() => {
		async function fetchData() {
			const zoneData = await getRoom(uuid);

			if (zoneData) {
				setZone(zoneData);
				setBuilding(zoneData.building);
				setName(zoneData.name);
				setSize(zoneData.size);
				setImage(zoneData.image);
				setAddress(zoneData.building.address);
				setPrimaryFunction(zoneData.primaryFunction);
				setDevices(zoneData.devices);
			}

			setLoading(false);
		}

		fetchData();
	}, [uuid]);

	const handleBuildingChange = event => {
		setBuilding(event.target.value);
	};

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

	const handleCancel = () => {
		props.history.goBack();
	};

	const handleLevelsEdit = () => {

	}

	const handleSave = async () => {
		let isOK = true;

		setNameError('');
		setAddressError('');
		setSizeError('');
		setPrimaryFunctionError('');

		if (!name.length) {
			setNameError('Du skal indtaste et navn på zonen');
			isOK = false;
		} else if (!address.length) {
			setAddressError('Du skal indtaste en adresse på zonen');
			isOK = false;
		} else if (!size.length) {
			setSizeError('Du skal indtaste en størrelse på zonen');
			isOK = false;
		} else if (!primaryFunction.length) {
			setPrimaryFunctionError('Du skal vælge zone type');
			isOK = false;
		}

		if (isOK) {
			let data = { ...zone };
			data.name = name;
			data.address = address;
			data.size = size;
			data.primaryFunction = primaryFunction;

			const result = await updateRoom(data);

			if (!result) {
				setAlertFail(true);
			} else {
				if (file) {
					let imageData = { filename: file[0].name, filedata: await toBase64(file[0]) }
					console.log(await addRoomImage(result.uuid, imageData));
				}

				//update room locations
				devices.map(async device => {
					if (deviceLocations[device.uuid]) {
						console.log(deviceLocations[device.uuid]);
						device.position = JSON.parse(deviceLocations[device.uuid]);
						console.log(await updateRoomDevice(zone.uuid, device));
					}
				});

				setAlertSuccess(true);

				setTimeout(function () {
					props.history.push('/administration/zones/' + building.uuid + '/list');
				}, 500);
			}
		}
	};

	const saveLocations = (locations) => {
		setDeviceLocations(locations);
	}

	return (
		!loading ? (
			<Paper elevation={3} className={classes.adminPaperContainer}>
				<div className={classes.adminHeader}>Zone redigering</div>

				<Grid container justify={'flex-start'} spacing={0}>
					<form>
						<Grid item xs={12} style={{ marginTop: 20 }}>
							<TextField
								id="select-building"
								label="Tilknyttet bygning"
								value={building.name}
								onChange={handleBuildingChange}
								className={classes.textField}
								variant='outlined'
								inputProps={{ readOnly: true }}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id={'name'}
								label='Navn'
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
								label='Adresse'
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								margin='normal'
								variant='outlined'
								error={addressError.length ? true : false}
								helperText={addressError}
								className={classes.textField}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id={'size'}
								label='Størrelse'
								value={size}
								onChange={(e) => setSize(e.target.value)}
								margin='normal'
								variant='outlined'
								error={sizeError.length ? true : false}
								helperText={sizeError}
								className={classes.textField}
							/>
						</Grid>
						<Grid item xs={12} style={{ marginTop: 15 }}>
							<TextField
								id="primaryfunction"
								select
								label="Zone type"
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
								dropzoneText="Upload zone billede"
							/>
							{file ? <Typography variant="body1" style={{ marginTop: 10 }}>Valgt fil:  {file[0].name}</Typography> : ""}
						</Grid>
					</form>

					{image ?
						<Grid item xs={12} style={{ marginTop: 20 }}>
							<InputLabel id="visibleTo-select-label">Placer sensorer</InputLabel>
							<AdminZoneMap zone={zone} devices={devices} saveLocations={saveLocations} />
						</Grid>
						: ""}

					<Grid item xs={12} style={{ marginTop: 40 }}>
						<Grid container>
							<Grid container item xs={12} justify="flex-end">
								<ButtonGroup variant="contained" color="primary">
									<Button onClick={handleCancel}>Annuller</Button>
									<Button onClick={handleLevelsEdit}>Grænseværdier</Button>
									<Button onClick={handleSave}>Gem</Button>
								</ButtonGroup>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Snackbar open={alertSuccess} autoHideDuration={3000} onClose={handleAlertSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
					<Alert onClose={handleAlertSuccessClose} severity="success" elevation={6} variant="filled">Zone opdateret!</Alert>
				</Snackbar>
				<Snackbar open={alertFail} autoHideDuration={3000} onClose={handleAlertFailClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
					<Alert onClose={handleAlertFailClose} severity="error" elevation={6} variant="filled">Der opstod en fejl!</Alert>
				</Snackbar>
			</Paper>
		) : (
			<CircularLoader fill />
		)
	);
}

export default AdminZonesEdit;
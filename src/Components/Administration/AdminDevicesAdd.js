import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper, TextField, Button, ButtonGroup, MenuItem, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { getRooms, getRoom, addRoomDevice, getSentiDevices } from 'data/climaid';
import adminStyles from 'Styles/adminStyles';
import CircularLoader from 'Components/Loaders/CircularLoader';

const AdminDevicesAdd = props => {
	const { uuid } = useParams();
	const classes = adminStyles();
	const [alertSuccess, setAlertSuccess] = useState(false);
	const [alertFail, setAlertFail] = useState(false);

	const [loading, setLoading] = useState(true);
	const [rooms, setRooms] = useState(null);
	const [room, setRoom] = useState('');
	const [roomError, setRoomError] = useState('');
	const [devices, setDevices] = useState(null);
	const [deviceId, setDeviceId] = useState('');
	const [deviceUuid, setDeviceUuid] = useState('');
	const [qualitativeDevice, setQualitativeDevice] = useState('');
	const [qualitativeDeviceUuid, setQualitativeDeviceUuid] = useState('');
	const [gauges, setGauges] = useState('');
	const [datafields, setDatafields] = useState('');

	useEffect(() => {
		async function fetchData() {

			const roomsData = await getRooms();

			if (roomsData) {
				setRooms(roomsData);
			}

			if (uuid !== 'undefined') {
				const roomData = await getRoom(uuid);
				if (roomData) {
					setRoom(roomData.uuid);
				}
			}

			const devicesData = await getSentiDevices();

			if (devicesData) {
				setDevices(devicesData);
			}

			setLoading(false);
		}

		fetchData();
	}, [uuid]);

	const handleRoomChange = event => {
		setRoom(event.target.value);
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
	};

	const handleCancel = () => {
		props.history.goBack();
	};

	const handleSave = async () => {
		let isOK = true;

		setRoomError('');

		if (!room.length) {
			setRoomError('Du skal vælge en tilknyttet zone');
			isOK = false;
		}

		if (isOK) {
			let data = {};
			data.roomUuid = room;
			data.device = deviceId;
			data.deviceUuid = deviceUuid;
			data.qualitativeDevice = qualitativeDevice;
			data.qualitativeDeviceUuid = qualitativeDeviceUuid;
			data.position = [];
			data.gauges = gauges ? JSON.parse(gauges) : [];
			if (datafields.length) {
				data.datafields = JSON.parse(datafields);
			}

			let added = await addRoomDevice(uuid, data);

			if (!added) {
				setAlertFail(true);
			} else {
				setAlertSuccess(true);

				setTimeout(function () {
					props.history.push('/administration/devices/' + uuid + '/list');
				}, 500);
			}
		}
	};

	return (
		!loading ? (
			<Paper elevation={3} className={classes.adminPaperContainer}>
				<div className={classes.adminHeader}>Zone oprettelse</div>

				<Grid container justify={'flex-start'} spacing={0}>
					<form>
						<Grid item xs={12} style={{ marginTop: 20 }}>
							<TextField
								select
								id="select-building"
								label="Tilknyt zone"
								value={room}
								onChange={handleRoomChange}
								className={classes.selectField}
								error={roomError.length ? true : false}
								helperText={roomError}
							>
								{rooms.map(r => {
									return <MenuItem key={r.uuid} value={r.uuid}>{r.name}</MenuItem>;
								})}
							</TextField>
						</Grid>
						<Grid item xs={12}>
							<Autocomplete
								id="device-search"
								key="device"
								freeSolo
								options={devices}
								getOptionLabel={(option) =>
									typeof option === 'string' ? option : option.name
								}
								onChange={(event, option) => {
									if (option) {
										setDeviceId(option.id);
										setDeviceUuid(option.uuid);
									}
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Sensor"
										margin="normal"
										variant="outlined"
										InputProps={{ ...params.InputProps, className: classes.searchInput }}
										classes={{ root: classes.searchInputRoot }}

									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Autocomplete
								id="qualitativeDevice-search"
								key="qualitativeDevice"
								freeSolo
								options={devices}
								getOptionLabel={(option) =>
									typeof option === 'string' ? option : option.name
								}
								onChange={(event, option) => {
									if (option) {
										setQualitativeDevice(option.id);
										setQualitativeDeviceUuid(option.uuid);
									}
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Kvalitativ sensor"
										margin="normal"
										variant="outlined"
										InputProps={{ ...params.InputProps, className: classes.searchInput }}
										classes={{ root: classes.searchInputRoot }}

									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								multiline={true}
								id={'gauges'}
								label='Målere'
								value={gauges}
								onChange={(e) => setGauges(e.target.value)}
								margin='normal'
								variant='outlined'
								className={classes.textField}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								multiline={true}
								id={'datafields'}
								label='Datafelter'
								value={datafields}
								onChange={(e) => setDatafields(e.target.value)}
								margin='normal'
								variant='outlined'
								className={classes.textField}
							/>
						</Grid>
					</form>
					<Grid item xs={12} style={{ marginTop: 40 }}>
						<Grid container>
							<Grid container item xs={12} justify="flex-end">
								<ButtonGroup variant="contained" color="primary">
									<Button onClick={handleCancel}>Annuller</Button>
									<Button onClick={handleSave}>Gem</Button>
								</ButtonGroup>
							</Grid>
						</Grid>

					</Grid>
				</Grid>
				<Snackbar open={alertSuccess} autoHideDuration={3000} onClose={handleAlertSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
					<Alert onClose={handleAlertSuccessClose} severity="success" elevation={6} variant="filled">Sensor tilknyttet!</Alert>
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

export default AdminDevicesAdd;
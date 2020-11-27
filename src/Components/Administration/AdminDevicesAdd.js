import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper, TextField, Button, ButtonGroup, MenuItem, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { getRooms, getRoom, addRoomDevice } from 'data/climaid';
import adminStyles from 'Styles/adminStyles';
import AdminMenu from './AdminMenu';
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
	const [device, setDevice] = useState('');
	const [deviceError, setDeviceError] = useState('');
	const [deviceUuid, setDeviceUuid] = useState('');
	const [deviceUuidError, setDeviceUuidError] = useState('');
	const [qualitativeDevice, setQualitativeDevice] = useState('');
	const [qualitativeDeviceUuid, setQualitativeDeviceUuid] = useState('');

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
		setDeviceError('');
		setDeviceUuidError('');

		if (!room.length) {
			setRoomError('Du skal vælge en tilknyttet zone');
			isOK = false;
		} else if (!device.length) {
			setDeviceError('Du skal indtaste sensor id');
			isOK = false;
		} else if (!deviceUuid.length) {
			setDeviceUuidError('Du skal indtaste sensor uuid');
			isOK = false;
		}

		if (isOK) {
			const data = { roomUuid: room, device: device, deviceUuid: deviceUuid, qualitativeDevice: qualitativeDevice, qualitativeDeviceUuid: qualitativeDeviceUuid };

			let added = await addRoomDevice(uuid, data);
			console.log(added);
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
			<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={3}>
				<Grid container item xs={3}>
					<Paper elevation={3} className={classes.adminPaperContainer}>
						<AdminMenu />
					</Paper>
				</Grid>
				<Grid container item xs={6}>
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
									<TextField
										id={'device'}
										label='Sensor ID'
										value={device}
										onChange={(e) => setDevice(e.target.value)}
										margin='normal'
										variant='outlined'
										error={deviceError.length ? true : false}
										helperText={deviceError}
										className={classes.textField}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id={'deviceUuid'}
										label='Sensor UUID'
										value={deviceUuid}
										onChange={(e) => setDeviceUuid(e.target.value)}
										margin='normal'
										variant='outlined'
										error={deviceUuidError.length ? true : false}
										helperText={deviceUuidError}
										className={classes.textField}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id={'qualitativeDevice'}
										label='Kvalitativ sensor ID'
										value={qualitativeDevice}
										onChange={(e) => setQualitativeDevice(e.target.value)}
										margin='normal'
										variant='outlined'
										className={classes.textField}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id={'qualitativeDeviceUuid'}
										label='Kvalitativ sensor UUID'
										value={qualitativeDeviceUuid}
										onChange={(e) => setQualitativeDeviceUuid(e.target.value)}
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

export default AdminDevicesAdd;
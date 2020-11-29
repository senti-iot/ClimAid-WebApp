import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper, TextField, Button, ButtonGroup, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { getDevice, updateRoomDevice } from 'data/climaid';
import adminStyles from 'Styles/adminStyles';
import AdminMenu from './AdminMenu';
import CircularLoader from 'Components/Loaders/CircularLoader';

const AdminDevicesEdit = props => {
	const { uuid } = useParams();
	const classes = adminStyles();
	const [alertSuccess, setAlertSuccess] = useState(false);
	const [alertFail, setAlertFail] = useState(false);

	const [loading, setLoading] = useState(true);
	const [room, setRoom] = useState(null);
	const [device, setDevice] = useState(null);
	const [deviceId, setDeviceId] = useState('');
	const [deviceIdError, setDeviceIdError] = useState('');
	const [deviceUuid, setDeviceUuid] = useState('');
	const [deviceUuidError, setDeviceUuidError] = useState('');
	const [qualitativeDevice, setQualitativeDevice] = useState('');
	const [qualitativeDeviceUuid, setQualitativeDeviceUuid] = useState('');
	const [gauges, setGauges] = useState('');

	useEffect(() => {
		async function fetchData() {
			const deviceData = await getDevice(uuid);

			if (deviceData) {
				setDevice(deviceData);
				setDeviceId(deviceData.device);
				setDeviceUuid(deviceData.deviceUuid);
				setQualitativeDevice(deviceData.qualitativeDevice);
				setQualitativeDeviceUuid(deviceData.qualitativeDeviceUuid);
				setGauges(deviceData.gauges);
				setRoom(deviceData.room);

				setLoading(false);
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

	const handleCancel = () => {
		props.history.goBack();
	};

	const handleSave = async () => {
		let isOK = true;

		setDeviceIdError('');
		setDeviceUuidError('');

		if (!deviceId.length) {
			setDeviceIdError('Du skal indtaste sensor id');
			isOK = false;
		} else if (!deviceUuid.length) {
			setDeviceUuidError('Du skal indtaste sensor uuid');
			isOK = false;
		}

		if (isOK) {
			const data = { ...device };
			data.device = device;
			data.deviceUuid = deviceUuid;
			data.qualitativeDevice = qualitativeDevice;
			data.qualitativeDeviceUuid = qualitativeDeviceUuid;
			data.gauges = JSON.parse(gauges);
			console.log(JSON.stringify(data.gauges));
			console.log(data);
			let updated = await updateRoomDevice(room.uuid, data);

			if (!updated) {
				setAlertFail(true);
			} else {
				setAlertSuccess(true);

				setTimeout(function () {
				//	props.history.push('/administration/devices/' + room.uuid + '/list');
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
						<div className={classes.adminHeader}>Zone redigering</div>

						<Grid container justify={'flex-start'} spacing={0}>
							<form>
								<Grid item xs={12} style={{ marginTop: 20 }}>
									<TextField
										id="select-building"
										label="Tilknyttet zone"
										value={room.name}
										margin='normal'
										variant='outlined'
										className={classes.textField}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id={'deviceId'}
										label='Sensor ID'
										value={deviceId}
										onChange={(e) => setDeviceId(e.target.value)}
										margin='normal'
										variant='outlined'
										error={deviceIdError.length ? true : false}
										helperText={deviceIdError}
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
							<Alert onClose={handleAlertSuccessClose} severity="success" elevation={6} variant="filled">Sensor opdateret!</Alert>
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

export default AdminDevicesEdit;
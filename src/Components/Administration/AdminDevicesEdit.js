import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper, TextField, Button, ButtonGroup, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { getDevice, updateRoomDevice, getSentiDevices } from 'data/climaid';
import adminStyles from 'Styles/adminStyles';
import CircularLoader from 'Components/Loaders/CircularLoader';

const AdminDevicesEdit = props => {
	const { uuid } = useParams();
	const classes = adminStyles();
	const [alertSuccess, setAlertSuccess] = useState(false);
	const [alertFail, setAlertFail] = useState(false);

	const [loading, setLoading] = useState(true);
	const [room, setRoom] = useState(null);
	const [devices, setDevices] = useState(null);
	const [sentiDevice, setSentiDevice] = useState(null);
	const [sentiQualitativeDevice, setSentiQualitativeDevice] = useState(null);
	const [device, setDevice] = useState(null);
	const [deviceId, setDeviceId] = useState('');
	const [deviceUuid, setDeviceUuid] = useState('');
	const [qualitativeDevice, setQualitativeDevice] = useState('');
	const [qualitativeDeviceUuid, setQualitativeDeviceUuid] = useState('');
	const [gauges, setGauges] = useState('');
	const [datafields, setDatafields] = useState('');

	useEffect(() => {
		async function fetchData() {
			const deviceData = await getDevice(uuid);

			if (deviceData) {
				setDevice(deviceData);
				setDeviceId(deviceData.device);
				setDeviceUuid(deviceData.deviceUuid);
				setQualitativeDevice(deviceData.qualitativeDevice);
				setQualitativeDeviceUuid(deviceData.qualitativeDeviceUuid);
				if (deviceData.gauges.length) {
					setGauges(JSON.stringify(deviceData.gauges));
				}
				if (deviceData.gauges.length) {
					setDatafields(JSON.stringify(deviceData.datafields));
				}
				setRoom(deviceData.room);

				const devicesData = await getSentiDevices();

				if (devicesData) {
					setDevices(devicesData);

					if (deviceData.device) {
						let result = devicesData.filter(obj => {
							return obj.id === deviceData.device
						});
						if (result && result.length) {
							setSentiDevice(result[0]);
						}
					}
					if (deviceData.qualitativeDevice) {
						let result = devicesData.filter(obj => {
							return obj.id === deviceData.qualitativeDevice
						});
						if (result && result.length) {
							setSentiQualitativeDevice(result[0]);
						}
					}
				}

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
		let data = { ...device };
		data.device = deviceId;
		data.deviceUuid = deviceUuid;
		data.qualitativeDevice = qualitativeDevice;
		data.qualitativeDeviceUuid = qualitativeDeviceUuid;
		data.gauges = gauges ? JSON.parse(gauges) : '';
		data.datafields = datafields ? JSON.parse(datafields) : '';

		let updated = await updateRoomDevice(room.uuid, data);

		if (!updated) {
			setAlertFail(true);
		} else {
			setAlertSuccess(true);

			setTimeout(function () {
				props.history.push('/administration/devices/' + room.uuid + '/list');
			}, 500);
		}
	};

	return (
		!loading ? (
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
							<Autocomplete
								id="device-search"
								key="device"
								freeSolo
								options={devices}
								value={sentiDevice}
								getOptionLabel={(option) =>
									typeof option === 'string' ? option : option.name
								}
								onChange={(event, option) => {
									if (option) {
										setSentiDevice(option);
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
								value={sentiQualitativeDevice}
								getOptionLabel={(option) =>
									typeof option === 'string' ? option : option.name
								}
								onChange={(event, option) => {
									if (option) {
										setSentiQualitativeDevice(option);
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
					<Alert onClose={handleAlertSuccessClose} severity="success" elevation={6} variant="filled">Sensor opdateret!</Alert>
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

export default AdminDevicesEdit;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper, TextField, IconButton, Button, ButtonGroup, Snackbar, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { getDevice, updateRoomDevice, getSentiDevices } from 'data/climaid';
import adminStyles from 'Styles/adminStyles';
import CircularLoader from 'Components/Loaders/CircularLoader';
import AdminDeviceGaugeDialog from './AdminDeviceGaugeDialog';
import ConfirmDialog from 'Components/Dialogs/ConfirmDialog';

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
	const [gauges, setGauges] = useState(null);
	const [selectedGauge, setSelectedGauge] = useState(null);
	const [datafields, setDatafields] = useState('');
	const [showAddGaugeDialog, setShowAddGaugeDialog] = useState(false);
	const [showEditGaugeDialog, setShowEditGaugeDialog] = useState(false);
	const [showDeleteGaugeDialog, setShowDeleteGaugeDialog] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const deviceData = await getDevice(uuid);

			if (deviceData) {
				setDevice(deviceData);
				setDeviceId(deviceData.device);
				setDeviceUuid(deviceData.deviceUuid);
				setQualitativeDevice(deviceData.qualitativeDevice);
				setQualitativeDeviceUuid(deviceData.qualitativeDeviceUuid);
				if (deviceData.gauges && deviceData.gauges.length) {
					setGauges(deviceData.gauges);
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
		data.gauges = gauges ? gauges : '';
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

	const handleAddGauge = () => {
		setShowAddGaugeDialog(true);
	}

	const addGauge = (gauge) => {
		let newGauges = [];
		if (gauges && gauges.length) {
			newGauges = [...gauges];
		}
		newGauges.push(gauge);

		setGauges(newGauges);

		setShowAddGaugeDialog(false);
	}

	const handleEditGauge = (g) => {
		setSelectedGauge(g);
		setShowEditGaugeDialog(true);
	}

	const editGaugeSave = (g) => {
		let newGauges = [...gauges];

		const foundIndex = newGauges.findIndex(x => x.uuid === g.uuid);
		if (foundIndex) {
			newGauges[foundIndex] = g;
		}

		setGauges(newGauges);

		setShowEditGaugeDialog(false);
	}

	const handleDeleteGauge = (g) => {
		setSelectedGauge(g);
		setShowDeleteGaugeDialog(true);
	}

	const doDeleteGauge = () => {
		let newGauges = gauges.filter(function (item) {
			return item.uuid !== selectedGauge.uuid;
		});

		setGauges(newGauges);

		handleHideDeleteGauge();
	}

	const handleHideDeleteGauge = () => {
		setShowDeleteGaugeDialog(false);
		setSelectedGauge(null);
	}

	const handleDialogCancel = () => {
		setShowAddGaugeDialog(false);
		setShowEditGaugeDialog(false);
		setShowDeleteGaugeDialog(false);
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
								clearText='Ryd felt'
								getOptionLabel={(option) =>
									typeof option === 'string' ? option : option.name
								}
								onChange={(event, option) => {
									if (!option) {
										setSentiDevice('');
										setDeviceId(null);
										setDeviceUuid('');
									} else {
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
								clearText='Ryd felt'
								getOptionLabel={(option) =>
									typeof option === 'string' ? option : option.name
								}
								onChange={(event, option) => {
									if (!option) {
										setSentiQualitativeDevice(null);
										setQualitativeDevice(null);
										setQualitativeDeviceUuid('');
									} else {
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
								id={'datafields'}
								label='Datafelter'
								value={datafields}
								onChange={(e) => setDatafields(e.target.value)}
								margin='normal'
								variant='outlined'
								className={classes.textField}
							/>
						</Grid>

						<Grid item xs={12}>
							<Typography variant="h5">Målere</Typography>

							<Button variant="contained" color="primary" onClick={() => handleAddGauge()} style={{ marginTop: 10, marginBottom: 20 }}>Tilføj måler</Button>

							{gauges ? (
								<Table stickyHeader className={classes.table} aria-label="gauges table">
									<TableHead>
										<TableRow className={classes.tableRow}>
											<TableCell>Type</TableCell>
											<TableCell>Periode</TableCell>
											<TableCell>Funktion</TableCell>
											<TableCell>Max værdi</TableCell>
											<TableCell>Min. værdi</TableCell>
											<TableCell>Segmenter</TableCell>
											<TableCell>Tekst</TableCell>
											<TableCell>Enhed</TableCell>
											<TableCell></TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{gauges.map(gauge => {
											return <TableRow hover key={gauge.uuid} className={classes.tableRow}>
												<TableCell>{gauge.type}</TableCell>
												<TableCell>{gauge.period}</TableCell>
												<TableCell>{gauge.function}</TableCell>
												<TableCell>{gauge.maxValue}</TableCell>
												<TableCell>{gauge.minValue}</TableCell>
												<TableCell>{gauge.segments}</TableCell>
												<TableCell>{gauge.topLabel}</TableCell>
												<TableCell>{gauge.unitLabel}</TableCell>
												<TableCell>
													<IconButton onClick={() => handleEditGauge(gauge)}>
														<EditIcon />
													</IconButton>
													<IconButton onClick={() => handleDeleteGauge(gauge)}>
														<DeleteIcon />
													</IconButton>

												</TableCell>
											</TableRow>
										})}
									</TableBody>
								</Table>
							) : ""}
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

				<ConfirmDialog visible={showDeleteGaugeDialog} title="Dette vil slette måleren" message="Er du sikker?" handleCancel={handleHideDeleteGauge} handleOk={doDeleteGauge} />

				<AdminDeviceGaugeDialog showAddGaugeDialog={showAddGaugeDialog} save={addGauge} handleDialogCancel={handleDialogCancel} />
				<AdminDeviceGaugeDialog data={selectedGauge} showAddGaugeDialog={showEditGaugeDialog} save={editGaugeSave} handleDialogCancel={handleDialogCancel} />
			</Paper>
		) : (
			<CircularLoader fill />
		)
	);
}

export default AdminDevicesEdit;
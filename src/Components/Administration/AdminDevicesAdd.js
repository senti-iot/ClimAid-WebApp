import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper, TextField, IconButton, Button, ButtonGroup, MenuItem, Snackbar, Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { getRooms, getRoom, addRoomDevice, getSentiDevices } from 'data/climaid';
import adminStyles from 'Styles/adminStyles';
import CircularLoader from 'Components/Loaders/CircularLoader';
import AdminDeviceGaugeDialog from './AdminDeviceGaugeDialog';
import ConfirmDialog from 'Components/Dialogs/ConfirmDialog';

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
	const [gauges, setGauges] = useState(null);
	const [selectedGauge, setSelectedGauge] = useState(null);
	const [datafields, setDatafields] = useState('');
	const [showAddGaugeDialog, setShowAddGaugeDialog] = useState(false);
	const [showEditGaugeDialog, setShowEditGaugeDialog] = useState(false);
	const [showDeleteGaugeDialog, setShowDeleteGaugeDialog] = useState(false);

	useEffect(() => {
		async function fetchData() {

			const roomsData = await getRooms();

			if (roomsData) {
				setRooms(roomsData);
			}

			if (typeof uuid !== 'undefined') {
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
			data.gauges = gauges;
			if (datafields.length) {
				data.datafields = JSON.parse(datafields);
			}

			let added = await addRoomDevice(uuid, data);

			if (!added) {
				setAlertFail(true);
			} else {
				setAlertSuccess(true);

				setTimeout(function () {
					props.history.push('/administration/devices/' + room + '/list');
				}, 500);
			}
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
				<div className={classes.adminHeader}>Tilknyt sensor til zone</div>

				<Grid container justify={'flex-start'} spacing={0}>
					<form>
						<Grid item xs={12} style={{ marginTop: 20 }}>
							<TextField
								select
								id="select-room"
								label="Tilknyttet zone"
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
								clearText='Ryd felt'
								getOptionLabel={(option) =>
									typeof option === 'string' ? option : option.name
								}
								onChange={(event, option) => {
									if (!option) {
										setDeviceId(null);
										setDeviceUuid('');
									} else {
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
								clearText='Ryd felt'
								getOptionLabel={(option) =>
									typeof option === 'string' ? option : option.name
								}
								onChange={(event, option) => {
									if (!option) {
										setQualitativeDevice(null);
										setQualitativeDeviceUuid('');
									} else {
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

				<ConfirmDialog visible={showDeleteGaugeDialog} title="Dette vil slette måleren" message="Er du sikker?" handleCancel={handleHideDeleteGauge} handleOk={doDeleteGauge} />

				<AdminDeviceGaugeDialog showAddGaugeDialog={showAddGaugeDialog} save={addGauge} handleDialogCancel={handleDialogCancel} />
				<AdminDeviceGaugeDialog data={selectedGauge} showAddGaugeDialog={showEditGaugeDialog} save={editGaugeSave} handleDialogCancel={handleDialogCancel} />

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
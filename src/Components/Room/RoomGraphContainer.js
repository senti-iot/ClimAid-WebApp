import React, { useState, useEffect } from 'react';
//, List, ListItem, ListItemText
import { Grid } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Button from '@material-ui/core/Button';
// import Popover from '@material-ui/core/Popover';
import * as d3 from 'd3';
import { saveAs } from 'file-saver';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import cookie from 'react-cookies';

import roomStyles from 'Styles/roomStyles';
// import CurrentTemperatureBar from 'Components/Room/CurrentTemperatureBar';
// import CurrentCo2Bar from 'Components/Room/CurrentCo2Bar';
// import BatteryBar from 'Components/Room/BatteryBar';
import RoomGraph from 'Components/Room/RoomGraph';
// import Weather from 'Components/Room/Weather';
import ClimateDropdown from 'Components/Room/ClimateDropdown';
import ClimateOutDropdown from 'Components/Room/ClimateOutDropdown';
import UserExperienceDropdown from 'Components/Room/UserExperienceDropdown';
import AnalyticsDropdown from 'Components/Room/AnalyticsDropdown';
import ExportDropdown from 'Components/Room/ExportDropdown';
import EnergyDropdown from 'Components/Room/EnergyDropdown';
import { getRoomsInBuilding, getCsvExport } from 'data/climaid';
import { CircularLoader } from 'Components';

const fileDownload = require('js-file-download');

const RoomGraphContainer = (props) => {
	const classes = roomStyles();
	const [loading, setLoading] = useState(false);
	const [loadingOverlayOpen, setLoadingOverlayOpen] = useState(false);
	// const [roomValues, setRoomValues] = useState(null);
	// const [batteryLevel, setBatteryLevel] = useState(null);
	const [checkboxStates, setCheckboxStates] = useState({ temphistory: true, temphistoryrooms: [], climateout: [], userexperience: [], analytics: [], co2historyrooms: [], humidityhistoryrooms: [], batteryhistoryrooms: [] });
	// const [anchorEl, setAnchorEl] = useState(null);
	const [room, setRoom] = useState(null);
	const [rooms, setRooms] = useState([]);
	const [alertClipboardSuccess, setAlertClipboardSuccess] = useState(false);
	const [alertClipboardFail, setAlertClipboardFail] = useState(false);
	const [alertImageSaveSuccess, setAlertImageSaveSuccess] = useState(false);

	useEffect(() => {
		setRoom(props.room);

		async function fetchData() {
			setLoading(true);
			// let values = {};
			// await Promise.all(
			// 	props.room.devices.map(async device => {
			// 		return await Promise.all(
			// 			device.gauges.map(async (gauge) => {
			// 				let value = await getMeassurement(device.device, gauge);
			// 				values[gauge.type] = value;
			// 			})
			// 		)
			// 	})
			// )

			// setRoomValues(values);

			// if (props.room.devices.length) {
			// 	let device = props.room.devices[0];
			// 	let state = await getBatteryStatus(device.device);
			// 	setBatteryLevel(Math.round(state));
			// }

			let roomsData = await getRoomsInBuilding(props.room.building.uuid);

			if (roomsData) {
				setRooms(roomsData);
			}

			setLoading(false);
		}

		fetchData();
	}, [props.room]);

	// const changeRoomOpen = event => {
	// 	setAnchorEl(event.currentTarget);
	// }

	// const changeRoomClose = () => {
	// 	setAnchorEl(null);
	// }

	const handleCheckboxChange = (e) => {
		let newStates = { ...checkboxStates };
		newStates[e.target.value] = (newStates[e.target.value]) ? false : true;
		setCheckboxStates(newStates);
	}

	const handleOutCheckboxChange = (e) => {
		let newStates = { ...checkboxStates };
		if (newStates['climateout'][e.target.value]) {
			delete newStates['climateout'][e.target.value];
		} else {
			newStates['climateout'][e.target.value] = true;
		}
		setCheckboxStates(newStates);
	}

	const handleTemperatureRoomChange = (e) => {
		let newStates = { ...checkboxStates };

		if (newStates['temphistoryrooms'][e.target.value]) {
			delete newStates['temphistoryrooms'][e.target.value];
		} else {
			newStates['temphistoryrooms'][e.target.value] = true;
		}
		setCheckboxStates(newStates);
	}

	const handleCo2RoomChange = (e) => {
		let newStates = { ...checkboxStates };

		if (newStates['co2historyrooms'][e.target.value]) {
			delete newStates['co2historyrooms'][e.target.value];
		} else {
			newStates['co2historyrooms'][e.target.value] = true;
		}
		setCheckboxStates(newStates);
	}

	const handleHumidityRoomChange = (e) => {
		let newStates = { ...checkboxStates };

		if (newStates['humidityhistoryrooms'][e.target.value]) {
			delete newStates['humidityhistoryrooms'][e.target.value];
		} else {
			newStates['humidityhistoryrooms'][e.target.value] = true;
		}
		setCheckboxStates(newStates);
	}

	const handleBatteryRoomChange = (e) => {
		let newStates = { ...checkboxStates };

		if (newStates['batteryhistoryrooms'][e.target.value]) {
			delete newStates['batteryhistoryrooms'][e.target.value];
		} else {
			newStates['batteryhistoryrooms'][e.target.value] = true;
		}
		setCheckboxStates(newStates);
	}

	const handleuserExperienceChange = (e) => {
		let newStates = { ...checkboxStates };
		if (newStates['userexperience'][e.target.value]) {
			delete newStates['userexperience'][e.target.value];
		} else {
			newStates['userexperience'][e.target.value] = true;
		}
		setCheckboxStates(newStates);
	}

	const handleAnalyticsChange = (e) => {
		let newStates = { ...checkboxStates };
		if (newStates['analytics'][e.target.value]) {
			delete newStates['analytics'][e.target.value];
		} else {
			newStates['analytics'][e.target.value] = true;
		}
		setCheckboxStates(newStates);
	}

	// const _changeRoom = (r) => {
	// 	changeRoomClose();
	// 	props.changeRoom(r);
	// }

	const handleAlertClipboardSuccessClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlertClipboardSuccess(false);
	};

	const handleAlertClipboardFailClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlertClipboardFail(false);
	};

	const handleAlertImageSaveSuccessClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlertImageSaveSuccess(false);
	};

	const saveGraph = (type) => {
		setLoadingOverlayOpen(true);

		const source = (new XMLSerializer()).serializeToString(d3.select('#graph').node());
		const evcEncoded = 'data:image/svg+xml;base64,' + new Buffer(source).toString('base64');

		let savecanvas = document.createElement('canvas');
		savecanvas.width = document.getElementById('graphContainer').offsetWidth;
		savecanvas.height = document.getElementById('graphContainer').offsetHeight;

		let img = document.createElement('img');
		img.onload = function () {
			savecanvas.getContext('2d').drawImage(img, 0, 0);
		}
		img.src = evcEncoded;

		if (type  === 1) { //clipboard
			try {
				setTimeout(function () {
					savecanvas.toBlob(function (blob) {
						navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
							if (result.state === 'granted') {
								// eslint-disable-next-line no-undef
								navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).then(function () {
									setAlertClipboardSuccess(true);
								}, function (error) {
									console.error("unable to write to clipboard. Error: ", error);
									setAlertClipboardFail(true);
								});
							} else {
								console.log("clipboard-permissoin not granted: " + result);
								setAlertClipboardFail(true);
							}

							setLoadingOverlayOpen(false);
						});
					});
				}, 1000);
			} catch (error) {
				console.error(error);
				setLoadingOverlayOpen(false);
			}
		} else if (type === 2) { // png
			setTimeout(function () {
				setLoadingOverlayOpen(false);

				savecanvas.toBlob(function (blob) {
					saveAs(blob, "test.png");
					setAlertImageSaveSuccess(true);
				}, 'image/png');
			}, 1000);
		}
	};

	const exportCsv = async () => {
		setLoadingOverlayOpen(true);

		let cookiePeriod = cookie.load('graph_period');

		let csvData = await getCsvExport(room.uuid, cookiePeriod);

		fileDownload(csvData, 'export.csv');

		setLoadingOverlayOpen(false);
	}

	// const roompopoverOpen = Boolean(anchorEl);
	// const roompopoverId = roompopoverOpen ? 'simple-popover' : undefined;

	return (
		<>
			{room && !loading ?
				<>
					<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={2} style={{ marginTop: 30 }}>
						<Grid item xs={3} lg={2} xl={2}>
							<ClimateDropdown
								onChange={handleCheckboxChange}
								onTemperatureRoomChange={handleTemperatureRoomChange}
								onCo2RoomChange={handleCo2RoomChange}
								onHumidityRoomChange={handleHumidityRoomChange}
								onBatteryRoomChange={handleBatteryRoomChange}
								checkboxStates={checkboxStates}
								rooms={rooms}
							/>
						</Grid>
						<Grid item xs={3} lg={2} xl={2}>
							<ClimateOutDropdown
								onChange={handleOutCheckboxChange}
								checkboxStates={checkboxStates}
								rooms={rooms}
							/>
						</Grid>
						<Grid item xs={3} lg={3} xl={2}>
							{rooms ? <UserExperienceDropdown onChange={handleuserExperienceChange} checkboxStates={checkboxStates} rooms={rooms} /> : ""}
						</Grid>
						<Grid item xs={3} lg={2} xl={2}>
							{rooms ? <AnalyticsDropdown onChange={handleAnalyticsChange} checkboxStates={checkboxStates} rooms={rooms} /> : ""}
						</Grid>
						<Grid item xs={3} lg={2} xl={2}>
							<EnergyDropdown />
						</Grid>
						<Grid item xs={3} lg={2} xl={2}>
							<ExportDropdown saveGraph={saveGraph} exportCsv={exportCsv} />
						</Grid>

						<Grid item xs={12}>
							<div id="graphContainer" className={classes.graphContainer}>
								<RoomGraph loading={loading} checkboxStates={checkboxStates} room={room} />
							</div>
						</Grid>
						{/* <Grid item xs={3}>
							{rooms.length ?
								<div className={classes.currentRoomContainer}>
									<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={0}>
										<Grid item xs={7}>
											<div className={classes.currentRoomName}>{room.name}</div>
										</Grid>
										<Grid item xs={5}>
											<Button variant="contained" onClick={changeRoomOpen}>Skift placering</Button>
										</Grid>
									</Grid>
								</div>
								: ""}

							<div className={classes.currentReadingsContainer}>
								<Grid item xs={8}>
									<div className={classes.currentReadingsHeader}>Aktuel status</div>
								</Grid>
								<Grid item xs={4}>
								</Grid>
								
								<Grid item xs={12}>
									<div className={classes.comfortLevelText}>Komfort niveau</div> <div className={classes.comfortSquare}>&nbsp;</div>
								</Grid>

								{roomValues && typeof roomValues['temperature'] !== 'undefined' &&
									<Grid item xs={12}>
										<br />
										<div className={classes.barGraphContainer}>
											<p className={classes.graphLabel}>TEMPERATUR</p>
											<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={0}>
												<Grid item xs={10}>
													{roomValues && <CurrentTemperatureBar roomValues={roomValues} />}
												</Grid>
												<Grid item xs={2} align="center">
													<span className={classes.barGraphCurrectReading}>{roomValues['temperature'].toFixed(1)} °C</span>
												</Grid>
											</Grid>
										</div>
									</Grid>
								}

								{roomValues && typeof roomValues['co2'] !== 'undefined' &&
									<Grid item xs={12}>
										<br />
										<div className={classes.barGraphContainer}>
											<p className={classes.graphLabel}>LUFTKVALITET (CO2)</p>
											<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={0}>
												<Grid item xs={10}>
													{roomValues && <CurrentCo2Bar roomValues={roomValues} />}
												</Grid>
												<Grid item xs={2} align="center">
													<span className={classes.barGraphCurrectReading}>{Math.round(roomValues['co2'])} ppm</span>
												</Grid>
											</Grid>
										</div>
									</Grid>
								}
								<br />
							</div>

							{batteryLevel ? 
								<div className={classes.batteryBarContainer}>
									<p className={classes.batteryLabel}>BATTERI</p>
									<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={0}>
										<Grid item xs={10}>
											<BatteryBar batteryLevel={batteryLevel} />
										</Grid>
										<Grid item xs={2} align="center">
											<span className={classes.barGraphCurrectBatteryReading}>{batteryLevel}%</span>
										</Grid>
									</Grid>
								</div>
								: ""}

							<Grid item xs={12}>
								<Weather room={room} />
							</Grid> */}
						{/* </Grid> */}
					</Grid>
					{/* <Popover
						id={roompopoverId}
						open={roompopoverOpen}
						anchorEl={anchorEl}
						onClose={changeRoomClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}
						PaperProps={{
							style: {
								width: 310,
							},
						}}
					>
						<List dense className={classes.root}>
							{rooms.map(r => {
								return <ListItem key={r.uuid} style={{ cursor: 'pointer' }}>
									<ListItemText primary={r.name} onClick={() => _changeRoom(r)} />
								</ListItem>
							})}
						</List>
					</Popover> */}

					<Snackbar open={alertClipboardSuccess} autoHideDuration={3000} onClose={handleAlertClipboardSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
						<Alert onClose={handleAlertClipboardSuccessClose} severity="success" elevation={6} variant="filled">Billede er gemt i udklipsholderen!</Alert>
					</Snackbar>
					<Snackbar open={alertClipboardFail} autoHideDuration={3000} onClose={handleAlertClipboardFailClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
						<Alert onClose={handleAlertClipboardFailClose} severity="error" elevation={6} variant="filled">Der opstod en fejl med at gemme billede i udklipsholderen!</Alert>
					</Snackbar>

					<Snackbar open={alertImageSaveSuccess} autoHideDuration={3000} onClose={handleAlertImageSaveSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
						<Alert onClose={handleAlertImageSaveSuccessClose} severity="success" elevation={6} variant="filled">Billede er gemt!</Alert>
					</Snackbar>

					<Backdrop open={loadingOverlayOpen} style={{ zIndex: 10000 }}>
						<CircularProgress color="inherit" />
					</Backdrop>
				</>
				: <CircularLoader fill />}
		</>
	)
}

export default RoomGraphContainer;
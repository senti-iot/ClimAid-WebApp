import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import roomStyles from 'Styles/roomStyles';
import CurrentTemperatureBar from 'Components/Room/CurrentTemperatureBar';
import CurrentCo2Bar from 'Components/Room/CurrentCo2Bar';
import BatteryBar from 'Components/Room/BatteryBar';
import RoomGraph from 'Components/Room/RoomGraph';
import Weather from 'Components/Room/Weather';
import ClimateDropdown from 'Components/Room/ClimateDropdown';
import { getMeassurement, getBatteryStatus } from 'data/climaid';

const RoomGraphContainer = (props) => {
	const classes = roomStyles();
	const [roomValues, setRoomValues] = useState(null);
	const [batteryLevel, setBatteryLevel] = useState(null);
	const [checkboxStates, setCheckboxStates] = useState({ 'temphistory': true });
	const room = props.room;

	useEffect(() => {
		async function fetchData() {
			let values = {};
			await Promise.all(
				room.devices.map(async device => {
					return await Promise.all(
						device.gauges.map(async (gauge) => {
							let value = await getMeassurement(device.deviceId, gauge);
							values[gauge.type] = value;
						})
					)
				})
			)

			setRoomValues(values);

			if (room.devices.length) {
				let device = room.devices[0];
				let state = await getBatteryStatus(device.deviceId);
				setBatteryLevel(Math.round(state));
			}
		}

		fetchData();
	}, [room]);

	const changeRoom = () => {

	}

	const handleCheckboxChange = (e) => {
		let newStates = { ...checkboxStates };
		newStates[e.target.value] = (newStates[e.target.value]) ? false : true;
		setCheckboxStates(newStates);
	}

	return (
		<>
			<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={2} style={{ marginTop: 30 }}>
				<Grid item xs={2}>
					<ClimateDropdown onChange={handleCheckboxChange} checkboxStates={checkboxStates} />
				</Grid>
				<Grid item xs={10}>
				</Grid>

				<Grid item xs={9}>
					<div className={classes.graphContainer}>
						<RoomGraph checkboxStates={checkboxStates} />
					</div>
				</Grid>
				<Grid item xs={3}>
					<div className={classes.currentRoomContainer}>
						<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={0}>
							<Grid item xs={7}>
								<div className={classes.currentRoomName}>{room.name}</div>
							</Grid>
							<Grid item xs={5}>
								<Button variant="contained" onClick={changeRoom}>Skift placering</Button>
							</Grid>
						</Grid>
					</div>

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

					{batteryLevel && 
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
					}

					<Grid item xs={12}>
						<Weather room={room} />
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

export default RoomGraphContainer;
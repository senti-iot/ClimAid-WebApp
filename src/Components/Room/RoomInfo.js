import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import moment from 'moment';

import roomStyles from 'Styles/roomStyles';
import { ItemG } from 'Components';
import GradientGauge from "Components/Graphs/GradientGauge/GradientGauge";
import { getMeassurement, getRoomActivityLevel } from 'data/climaid';
import CircularLoader from 'Components/Loaders/CircularLoader';

const RoomInfo = (props) => {
	const classes = roomStyles();
	let room = props.room;
	const [roomValues, setRoomValues] = useState(null);
	const [activityLevel, setActivityLevel] = useState(null);

	useEffect(() => {
		async function fetchData() {
			let values = {};
			let dataDevice = null;
			await Promise.all(
				room.devices.map(async device => {
					dataDevice = device.device;

					if (device.gauges && device.gauges.length) {
						return await Promise.all(
							device.gauges.map(async (gauge) => {
								let datafield = (device.datafields && device.datafields[gauge.type]) ? device.datafields[gauge.type] : gauge.type;
								let value = await getMeassurement(device.device, gauge, datafield);
								values[gauge.uuid] = value;
							})
						)
					}
				})
			)

			if (dataDevice) {
				let activityLevelData = await getRoomActivityLevel(dataDevice);
				if (activityLevelData) {
					setActivityLevel(Math.round(activityLevelData.motion));
				}
			}

			setRoomValues(values);
		}

		fetchData();
	}, [room]);

	return (
		<Paper elevation={3} className={classes.roomInfoContainer}>
			<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={0}>
				<Grid container item xs={12} style={{ marginBottom: 20 }}>
					<ItemG xs={8}>
						<div className={classes.roomName}>{room.name}</div>
						<div className={classes.dayName}>
							{moment().format('dddd')}
						</div>
						<div className={classes.date}>
							{moment().format('D. MMMM YYYY')}
						</div>
					</ItemG>
					<ItemG xs={4}>
						{activityLevel ?
							<Grid container justify={'space-between'} alignItems={'flex-start'} style={{ marginLeft: 20, marginTop: 4 }}>
								<ItemG xs={4}>
									<img src='/images/anvendelse.svg' alt='' style={{ width: '100%' }} />
								</ItemG>
								<ItemG xs={8} style={{ textAlign: 'center' }} className={classes.usagePercent}>{activityLevel}%</ItemG>
								<ItemG xs={12}>
									<div className={classes.usageGraphBg}>
										<div className={classes.usageGraph} style={{ width: activityLevel + '%' }} />
									</div>
								</ItemG>
								<ItemG xs={12} className={classes.usageDesc}>Anvendelse fra 7-17 i hverdagen</ItemG>
							</Grid>
							: ""}
					</ItemG>
				</Grid>

				<Grid container item xs={12}>
					<div style={{ width: '100%', height: 770, overflow: 'auto' }}>
						{roomValues ?
							// eslint-disable-next-line array-callback-return
							room.devices.map(device => {
								if (device.gauges && device.gauges.length) {
									return device.gauges.map((gauge, index) => {
										let value = roomValues[gauge.uuid];
										//align={index % 2 ? "right" : "left" }
										return (
											<ItemG xs={12} key={index} align="center">
												{value ? <GradientGauge
													type={gauge.type}
													ringWidth={7}
													maxSegmentLabels={gauge.segments}
													segments={1}
													minValue={gauge.minValue}
													maxValue={gauge.maxValue}
													value={parseFloat(value)}
													valueTextFontSize="35"
													width={250}
													height={240}
													topLabel={gauge.topLabel}
													unitLabel={gauge.unitLabel}
													colorConfig={{
														temperature: {
															"ben1": 19,
															"ben2": 20,
															"ben3": 21,
															"ben4": 23,
															"ben5": 24.5,
															"ben6": 26,
														},
														co2: {
															"ben1": 800,
															"ben2": 1000,
															"ben3": 1200,
														},
														humidity: {
															"ben1": 15,
															"ben2": 25,
															"ben3": 30,
															"ben4": 65,
															"ben5": 75,
															"ben6": 85,
														}
													}
													}
												/> : ""}
											</ItemG>
										)})
								}
							})
							: <CircularLoader fill />}
					</div>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default RoomInfo;
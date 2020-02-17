import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import moment from 'moment';

import roomStyles from 'Styles/roomStyles';
import { ItemG } from 'Components';
import GradientGauge from "Components/Graphs/GradientGauge/GradientGauge";
import { getMeassurement } from 'data/climaid';
import CircularLoader from 'Components/Loaders/CircularLoader';

const RoomInfo = (props) => {
	const classes = roomStyles();
	let room = props.room;
	const [roomValues, setRoomValues] = useState(null);

	useEffect(() => {
		async function fetchData() {
			let values = {};
			await Promise.all(
				room.devices.map(async device => {
					return await Promise.all(
						device.gauges.map(async (gauge) => {
							let value = await getMeassurement(device.deviceId, gauge);
							values[gauge.uuid] = value;
						})
					)
				})
			)

			setRoomValues(values);
		}

		fetchData();
	}, [room]);

	return (
		<Paper elevation={3} className={classes.roomInfoContainer}>
			<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={0}>
				<Grid container item xs={12}>
					<ItemG xs={9}>
						<div className={classes.roomName}>{room.name}</div>
						<div className={classes.dayName}>
							{moment().format('dddd')}
						</div>
						<div className={classes.date}>
							{moment().format('D. MMMM YYYY')}
						</div>
						<br />
					</ItemG>

					{roomValues ?
						room.devices.map(device => {
							return device.gauges.map((gauge, index) => {
								let value = roomValues[gauge.uuid];

								return (
									<ItemG xs={12} key={index} align={index % 2 ? "right" : "left" }>
										<GradientGauge
											ringWidth={7}
											maxSegmentLabels={gauge.segments}
											segments={1}
											minValue={gauge.minValue}
											maxValue={gauge.maxValue}
											value={value}
											valueTextFontSize="35"
											width={250}
											height={240}
											topLabel={gauge.topLabel}
											unitLabel={gauge.unitLabel}
										/>
									</ItemG>
								)})
						})
						: <CircularLoader fill />}
				</Grid>
			</Grid>
		</Paper>
	)
}

export default RoomInfo;
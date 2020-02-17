import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import moment from 'moment';

import buildingStyles from 'Styles/buildingStyles';
import { ItemG } from 'Components';
import BuildingInfoRooms from 'Components/Building/BuildingInfoRooms';
import BuildingInfoUsage from 'Components/Building/BuildingInfoUsage';

const BuildingInfo = (props) => {
	const classes = buildingStyles();
	const history = props.history;

	const handleRoomClick = (room) => {
		history.push('/building/' + props.building.uuid + '/room/' + room.uuid);
	}

	return (
		<Paper elevation={3} className={classes.buildInfoContainer}>
			<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={0}>
				<Grid container item xs={12}>
					<ItemG xs={9}>
						<div className={classes.buildingName}>{props.building.name}</div>
						<div className={classes.dayName}>
							{moment().format('dddd')}
						</div>
						<div className={classes.date}>
							{moment().format('D. MMMM YYYY')}
						</div>
					</ItemG>
					<ItemG xs={3}>
						<div></div>
					</ItemG>
				</Grid>
				<Grid container item xs={12}>
					<ItemG xs={12}>
						<BuildingInfoUsage building={props.building} />
					</ItemG>
				</Grid>
				<Grid container item xs={12}>
					<ItemG xs={12}>
						<BuildingInfoRooms handleRoomClick={handleRoomClick} building={props.building} rooms={props.rooms} />
					</ItemG>
				</Grid>
				<Grid container item xs={12}>
					<ItemG xs={4}>
					</ItemG>
					<ItemG xs={4}>
					</ItemG>
					<ItemG xs={4}>
					</ItemG>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default BuildingInfo;
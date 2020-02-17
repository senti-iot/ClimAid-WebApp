import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import otherStyles from 'Styles/otherStyles';
import BuildingInfoRoom from 'Components/Building/BuildingInfoRooms';
import BuildingInfoUsage from 'Components/Building/BuildingInfoUsage';
import { getRoomsInBuilding } from 'data/climaid';

const MapPopupBuilding = (props) => {
	const classes = otherStyles();
	const building = props.building;
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const data = await getRoomsInBuilding(props.building.uuid);

			if (data) {
				setRooms(data);
			}
		}

		fetchData();
	}, [props]);

	const handleBuildingClick = (room) => {
		props.history.push('/building/' + props.building.uuid);
	}

	const handleRoomClick = (room) => {
		props.history.push('/building/' + props.building.uuid + '/room/' + room.uuid);
	}

	return (
		<div className={classes.mapPopupContainer}>
			<Grid container justify={'flex-start'} alignItems={'center'} spacing={0}>
				<Grid container item xs={10}>
					<h1>{building.name}</h1>
				</Grid>
				<Grid container item xs={2} align="right">
					<IconButton onClick={handleBuildingClick}><img src="/images/door.svg" alt="" /></IconButton>
				</Grid>
			</Grid>
			
			<BuildingInfoUsage building={building} />

			{rooms && <BuildingInfoRoom handleRoomClick={handleRoomClick} building={building} rooms={rooms} />}
		</div>
	)
}

export default MapPopupBuilding;
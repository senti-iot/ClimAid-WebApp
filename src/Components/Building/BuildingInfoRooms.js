import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@material-ui/core';

import buildingStyles from 'Styles/buildingStyles';
import { ItemG } from 'Components';
import { getRoomsInBuilding } from 'data/climaid';

const BuildingInfoRooms = (props) => {
	const classes = buildingStyles();
	const [rooms, setRooms] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const data = await getRoomsInBuilding();
			if (data) {
				setRooms(data);
			}
		}

		fetchData();
	}, []);

	return (
		<div>
			<p><b>Lokale</b></p>
			{rooms ?
				<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={0}>
					{rooms.map(function (room, index) {
						return (
							<ItemG xs={12}>
								<Grid container item xs={12}>
									<ItemG xs={3}>{room.name}</ItemG>
								</Grid>
							</ItemG>
						)
					})}
				</Grid>
				: ""}
		</div>
	);
}

export default BuildingInfoRooms;
import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import buildingStyles from 'Styles/buildingStyles';
import { getRoomsInBuilding } from 'data/climaid';
import { Notifications } from 'variables/icons';

const BuildingInfoRooms = (props) => {
	const classes = buildingStyles();
	const [rooms, setRooms] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const data = await getRoomsInBuilding(props.building.uuid);
			if (data) {
				setRooms(data);
			}
		}

		fetchData();
	}, [props]);

	return (
		<div>
			<p><b>Lokale</b></p>
			{rooms ?
				<Table className={classes.table} aria-label="Lokale tabel">
					<TableHead>
						<TableRow>
							<TableCell>On/Off</TableCell>
							<TableCell></TableCell>
							<TableCell>Indeklima tilstand</TableCell>
							<TableCell>Betteriniveau</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rooms.map((room, index) => {
							return (
								<TableRow key={room.uuid} style={{ height: 40 }} hover onClick={event => props.handleRoomClick(room)}>
									<TableCell></TableCell>
									<TableCell>{room.name}</TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell><Notifications style={{ color: '#ccc' }} /></TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
				: ""}
		</div>
	);
}

export default BuildingInfoRooms;
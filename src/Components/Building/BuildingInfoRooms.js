import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import buildingStyles from 'Styles/buildingStyles';
import { getBatteryStatus } from 'data/climaid';
import { Notifications } from 'variables/icons';
import BatteryStatus from 'Components/BatteryStatus';

const BuildingInfoRooms = (props) => {
	const classes = buildingStyles();
	const [batteryStates, setBatteryStates] = useState({});

	useEffect(() => {
		async function fetchData() {
			if (props.rooms.length) {
				let batteryStateData = {};

				await Promise.all(
					props.rooms.map(async (room) => {
						if (room.devices.length) {
							let device = room.devices[0];
							let state = await getBatteryStatus(device.deviceId);
							batteryStateData[room.uuid] = Math.round(state);
						}
					})
				);

				setBatteryStates(batteryStateData);
			}
		}

		fetchData();
	}, [props]);

	return (
		<>
			{props.rooms.length ?
				<>
					<p><b>Lokale</b></p>
					<Table className={classes.table} aria-label="Lokale tabel">
						<TableHead>
							<TableRow>
								<TableCell>On/Off</TableCell>
								<TableCell></TableCell>
								<TableCell>Indeklima</TableCell>
								<TableCell>Batteriniveau</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{props.rooms.map((room) => {
								return (
									<TableRow key={room.uuid} style={{ height: 40 }} hover onClick={() => props.handleRoomClick(room)}>
										<TableCell></TableCell>
										<TableCell>{room.name}</TableCell>
										<TableCell></TableCell>
										<TableCell align="center">{batteryStates[room.uuid] ? <BatteryStatus charge={batteryStates[room.uuid]} /> : ''}</TableCell>
										<TableCell><Notifications style={{ color: '#ccc' }} /></TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</>
				: ""}
		</>
	);
}

export default BuildingInfoRooms;
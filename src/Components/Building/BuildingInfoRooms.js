import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import buildingStyles from 'Styles/buildingStyles';
import { getBatteryStatus, getDeviceOnlineStatus, getRoomColorData } from 'data/climaid';
import BatteryStatus from 'Components/BatteryStatus';
import BuildingInfoRoomDot from 'Components/Building/BuildingInfoRoomDot';

const BuildingInfoRooms = (props) => {
	const classes = buildingStyles();
	const [batteryStates, setBatteryStates] = useState({});
	const [onlineStates, setOnlineStates] = useState({});
	const [colorStates, setColorStates] = useState({});

	useEffect(() => {
		async function fetchData() {
			if (props.rooms.length) {
				let batteryStateData = {};
				let onlineStatesData = {};
				let colorData = {};

				await Promise.all(
					props.rooms.map(async (room) => {
						if (room.devices.length) {
							let device = room.devices[0];
							let state = await getBatteryStatus(device.device);
							batteryStateData[room.uuid] = Math.round(state);

							let onlineState = await getDeviceOnlineStatus(device.device);
							onlineStatesData[room.uuid] = onlineState;

							let roomColorData = await getRoomColorData([device.device]);

							if (roomColorData) {
								colorData[room.uuid] = roomColorData.color;
							}
						}
					})
				);

				setBatteryStates(batteryStateData);
				setOnlineStates(onlineStatesData);
				setColorStates(colorData);
			}
		}

		fetchData();
	}, [props.rooms]);

	const getOnlineColorState = (uuid) => {
		let color = '#b2b3c1';
		if (Object.keys(onlineStates).length && onlineStates[uuid]) {
			color = '#74d3c9';
		}
		return <FiberManualRecordIcon style={{ color: color }} />;
	}

	return (
		<>
			{props.rooms.length ?
				<>
					<p><b>Lokale</b></p>
					<TableContainer style={{ maxHeight: 400 }}>
						<Table stickyHeader className={classes.table} aria-label="Lokale tabel">
							<TableHead>
								<TableRow>
									<TableCell align="center">On/Off</TableCell>
									<TableCell></TableCell>
									<TableCell align="center">Indeklima</TableCell>
									<TableCell align="center">Batteriniveau</TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{props.rooms.map((room) => {
									return (
										<TableRow key={room.uuid} style={{ height: 40, cursor: 'pointer' }} hover onClick={() => props.handleRoomClick(room)}>
											<TableCell align="center">{getOnlineColorState(room.uuid)}</TableCell>
											<TableCell>{room.name}</TableCell>
											<TableCell align="center">{colorStates[room.uuid] ? <BuildingInfoRoomDot color={colorStates[room.uuid]} /> : ''}</TableCell>
											<TableCell align="center">{batteryStates[room.uuid] ? <BatteryStatus charge={batteryStates[room.uuid]} /> : ''}</TableCell>
											<TableCell>{/* <Notifications style={{ color: '#ccc' }} /> */}</TableCell>
										</TableRow>
									)
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</>
				: ""}
		</>
	);
}

export default BuildingInfoRooms;
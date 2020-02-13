import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from "react-router-dom";

import { ItemG, GridContainer } from 'Components';
import RoomInfo from 'Components/Room/RoomInfo';
import RoomMap from 'Components/Room/RoomMap';
import { getRoom, getMeassurement } from 'data/climaid';

const Room = () => {
	const { roomUuid } = useParams();
	const [room, setRoom] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const room = await getRoom(roomUuid);

			if (room) {
				let values = {};
				await Promise.all(
					room.devices.map(async device => {
						return await Promise.all(
							device.gauges.map(async (gauge, index) => {
								let value = await getMeassurement(device.deviceId, gauge);
								values[gauge.uuid] = value;
							})
						)
					})
				)

				room.values = values;

				setRoom(room);
			}
		}

		fetchData();
	}, [roomUuid]);

	return (
		<Fragment>
			{room ?
				<GridContainer spacing={2}>
					<ItemG xs={3}>
						<RoomInfo room={room} />
					</ItemG>
					<ItemG xs={9}>
						<RoomMap room={room} />
					</ItemG>
				</GridContainer>
				: ""}
		</Fragment>
	);
}

export default Room;
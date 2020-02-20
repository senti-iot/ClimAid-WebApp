import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { ItemG, GridContainer } from 'Components';
import RoomInfo from 'Components/Room/RoomInfo';
import RoomMap from 'Components/Room/RoomMap';
import RoomGraphContainer from 'Components/Room/RoomGraphContainer';
import { getRoom } from 'data/climaid';

const Room = () => {
	const { roomUuid } = useParams();
	const [room, setRoom] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const room = await getRoom(roomUuid);

			if (room) {
				setRoom(room);
			}
		}

		fetchData();
	}, [roomUuid]);

	return (
		<>
			{room ?
				<GridContainer spacing={2}>
					<ItemG xs={3}>
						<RoomInfo room={room} />
					</ItemG>
					<ItemG xs={9}>
						<RoomMap room={room} />
					</ItemG>
					<ItemG xs={12}>
						<RoomGraphContainer room={room} />
					</ItemG>
				</GridContainer>
				: ""}
		</>
	);
}

export default Room;
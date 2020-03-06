import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { ItemG, GridContainer } from 'Components';
import RoomInfo from 'Components/Room/RoomInfo';
import RoomMap from 'Components/Room/RoomMap';
import RoomGraphContainer from 'Components/Room/RoomGraphContainer';
import { getRoom } from 'data/climaid';

const Room = (props) => {
	const { roomUuid } = useParams();
	const [room, setRoom] = useState(null);
	const history = props.history;

	useEffect(() => {
		async function fetchData() {
			const room = await getRoom(roomUuid);

			if (room) {
				setRoom(room);
			}
		}

		fetchData();
	}, [roomUuid]);

	const changeRoom = (r) => {
	//setRoom(r);
		history.push('/building/' + r.building.uuid + '/room/' + r.uuid);
	}

	return (
		<>
			{room ?
				<GridContainer spacing={2}>
					<ItemG xs={3} xl={2}>
						<RoomInfo room={room} />
					</ItemG>
					<ItemG xs={9} xl={10}>
						<RoomMap room={room} />
					</ItemG>
					<ItemG xs={12}>
						<RoomGraphContainer room={room} changeRoom={changeRoom} />
					</ItemG>
				</GridContainer>
				: ""}
		</>
	);
}

export default Room;
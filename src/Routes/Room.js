import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router';

import { ItemG, GridContainer } from 'Components';
import RoomInfo from 'Components/Room/RoomInfo';
import RoomMap from 'Components/Room/RoomMap';
import RoomGraphContainer from 'Components/Room/RoomGraphContainer';
import { getRoom } from 'data/climaid';
import usePrevious from 'Hooks/usePrevious/usePrevious';

const Room = () => {
	const { roomUuid } = useParams();
	const prevRoomUuid = usePrevious(roomUuid);
	const [room, setRoom] = useState(null);
	const history = useHistory();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);

			const room = await getRoom(roomUuid);

			if (room) {
				setRoom(room);
			}

			setLoading(false);
		}

		if (prevRoomUuid !== roomUuid) {
			fetchData();
		}
	}, [roomUuid, prevRoomUuid]);

	const changeRoom = (r) => {
		history.push('/building/' + r.building.uuid + '/room/' + r.uuid);
	}

	return (
		<>
			{!loading && room ?
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
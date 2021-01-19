import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router';
import { Paper } from '@material-ui/core';

import { ItemG, GridContainer } from 'Components';
import RoomInfo from 'Components/Room/RoomInfo';
// import RoomMap from 'Components/Room/RoomMap';
import RoomComfortGraph from 'Components/Room/RoomComfortGraph';
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
	// 
	return (
		<>
			{!loading && room ?
				<GridContainer spacing={2}>
					<ItemG xs={4} xl={3}>
						<RoomInfo room={room} />
					</ItemG>
					<ItemG xs={8} xl={9}>
						<Paper elevation={0} style={{ backgroundColor: '#f5f5f5' }}>
							<RoomComfortGraph room={room} />
						</Paper>
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
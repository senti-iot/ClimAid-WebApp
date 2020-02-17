import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import { ItemG, GridContainer } from 'Components';
import BuildingInfo from 'Components/Building/BuildingInfo';
import BuildingMap from 'Components/Building/BuildingMap';
import { getBuilding, getRoomsInBuilding } from 'data/climaid';

const Building = (props) => {
	const { uuid } = useParams();
	const [building, setBuilding] = useState(null);
	const [rooms, setRooms] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const data = await getBuilding(uuid);

			if (data) {
				const rooms = await getRoomsInBuilding(uuid);

				if (rooms) {
					setRooms(rooms);
				}

				setBuilding(data);
			}
		}

		fetchData();
	}, [uuid]);

	return (
		<>
			{building ?
				<GridContainer spacing={2}>
					<ItemG xs={3}>
						<BuildingInfo history={props.history} building={building} rooms={rooms} />
					</ItemG>
					<ItemG xs={9}>
						<BuildingMap building={building} rooms={rooms} />
					</ItemG>
				</GridContainer>
				: ""}
		</>
	);
}

export default Building;
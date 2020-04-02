import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import { ItemG, GridContainer } from 'Components';
import BuildingInfo from 'Components/Building/BuildingInfo';
import BuildingMap from 'Components/Building/BuildingMap';
import { getBuilding, getRoomsInBuilding } from 'data/climaid';
import usePrevious from 'Hooks/usePrevious/usePrevious';

const Building = () => {
	const { uuid } = useParams();
	const prevUuid = usePrevious(uuid);
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

		if (prevUuid !== uuid) {
			fetchData();
		}
	}, [uuid, prevUuid]);
console.log(building);
	return (
		<>
			{(building && rooms) ?
				<GridContainer spacing={2}>
					<ItemG xs={4} xl={3}>
						<BuildingInfo building={building} rooms={rooms} />
					</ItemG>
					<ItemG xs={8} xl={9}>
						<BuildingMap building={building} rooms={rooms} />
					</ItemG>
				</GridContainer>
				: ""}
		</>
	);
}
//Building.whyDidYouRender = true

export default Building;
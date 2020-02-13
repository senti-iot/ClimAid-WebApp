import React, { useEffect, useState, Fragment } from 'react'
import { useParams } from "react-router-dom";
// import { useHistory } from 'react-router';

import { ItemG, GridContainer } from 'Components';
import BuildingInfo from 'Components/Building/BuildingInfo';
import BuildingMap from 'Components/Building/BuildingMap';
import { getBuilding } from 'data/climaid';

const Building = (props) => {
	const { uuid } = useParams();
	const [building, setBuilding] = useState(null);
	// const history = useHistory();

	useEffect(() => {
		async function fetchData() {
			const data = await getBuilding(uuid);

			if (data) {
				setBuilding(data);
			}
		}

		fetchData();
	}, [uuid]);

	return (
		<Fragment>
			{building ?
				<GridContainer spacing={2}>
					<ItemG xs={3}>
						<BuildingInfo history={props.history} building={building} />
					</ItemG>
					<ItemG xs={9}>
						<BuildingMap building={building} />
					</ItemG>
				</GridContainer>
				: ""}
		</Fragment>
	);
}

export default Building;
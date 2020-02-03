import React from 'react'
import { ItemG, GridContainer } from 'Components';

import BuildingInfo from 'Components/Building/BuildingInfo';
import BuildingMap from 'Components/Building/BuildingMap';

const Building = () => {

	return (
		<GridContainer spacing={2}>
			<ItemG xs={3}>
				<BuildingInfo />
			</ItemG>
			<ItemG xs={9}>
				<BuildingMap />
			</ItemG>
		</GridContainer>
	);
}

export default Building;
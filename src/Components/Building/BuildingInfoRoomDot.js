import React from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const BuildingInfoRooms = (props) => {
	const colors = ['#3fbfad', '#e28117', '#d1463d', '#e56363'];

	return (
		<FiberManualRecordIcon style={{ color: colors[props.color - 1] }} />
	);
};

export default BuildingInfoRooms;
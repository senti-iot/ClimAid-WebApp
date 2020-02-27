import React from 'react';

import LineGraph from 'Components/Room/LineGraph';

const RoomGraph = (props) => {
	return (
		<LineGraph id="temperature" room={props.room} checkboxStates={props.checkboxStates} />
	);
}

export default RoomGraph;
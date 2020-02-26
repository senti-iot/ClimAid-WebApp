import React from 'react';

import LineGraph from 'Components/Room/LineGraph';

const RoomGraph = (props) => {
	return (
		<LineGraph id="temperature" checkboxStates={props.checkboxStates} />
	);
}

export default RoomGraph;
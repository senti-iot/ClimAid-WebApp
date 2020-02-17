import React from 'react';

import roomStyles from 'Styles/roomStyles';

const BatteryBar = (props) => {
	const classes = roomStyles();

	return (
		<div className={classes.currentReadingBarContainer}>
			<div style={{ width: props.batteryLevel + '%' }} className={classes.batteryBar}></div>
		</div>
	)
}

export default BatteryBar;
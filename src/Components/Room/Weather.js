import React from 'react';

import roomStyles from 'Styles/roomStyles';

const Weather = (props) => {
	const classes = roomStyles();

	return (
		<div className={classes.weatherContainer}>
			<div style={{ width: props.batteryLevel + '%' }} className={classes.batteryBar}></div>
		</div>
	)
}

export default Weather;
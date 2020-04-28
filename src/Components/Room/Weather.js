import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Grid } from '@material-ui/core';

import roomStyles from 'Styles/roomStyles';
import { getWeather } from 'data/climaid';

const Weather = (props) => {
	const classes = roomStyles();
	const room = props.room;
	const [weather, setWeather] = useState(0);

	useEffect(() => {
		async function fetchData() {
			let position = room.building.latlong.split(',');
			let data = await getWeather(moment().format(), position[0], position[1]);

			if (data) {
				setWeather(data);
			}
		}

		fetchData();
	}, [room]);

	return (
		<>
			{weather &&
				<div className={classes.weatherContainer}>
					<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={1}>
						<Grid item xs={9}><div className={classes.currentReadingsHeader}>Vejret</div></Grid>
						<Grid item xs={3}><img src="/images/weather.svg" alt="" /></Grid>

						<Grid item xs={6}>Temperatur: {Math.round(weather.currently.temperature)} °C</Grid>
						<Grid item xs={6}>Vejr: {weather.currently.summary}</Grid>

						<Grid item xs={6}>Vindhastighed: {Math.round(weather.currently.windSpeed)} m/s</Grid>
						<Grid item xs={7}>Fugtighed: {Math.round(weather.currently.humidity * 100)}%</Grid>
					</Grid>
				</div>
			}
		</>
	)
}

export default Weather;
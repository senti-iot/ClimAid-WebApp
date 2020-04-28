import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Grid } from '@material-ui/core';

import roomStyles from 'Styles/roomStyles';
import { getWeather } from 'data/climaid';

const WeatherOnMap = (props) => {
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
			{weather ? 
				<div className={classes.weatherOnMapContainer}>
					<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={0}>
						<Grid item xs={9}><div className={classes.currentReadingsHeader}>Vejret</div></Grid>
						<Grid item xs={3} align="right"><img src="/images/weather.svg" width="60" alt="" /></Grid>

						<Grid item xs={5}>Temperatur: {Math.round(weather.currently.temperature)} c</Grid>
						<Grid item xs={7}>Vejr: {weather.currently.summary}</Grid>

						<Grid item xs={5}>Vindhastighed: {Math.round(weather.currently.windSpeed)} m/s</Grid>
						<Grid item xs={7}>Fugtighed: {Math.round(weather.currently.humidity * 100)}%</Grid>
					</Grid>
				</div>
				: '' }
		</>
	)
}

export default WeatherOnMap;
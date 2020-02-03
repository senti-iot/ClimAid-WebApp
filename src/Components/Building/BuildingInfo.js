import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import moment from 'moment';

import buildingStyles from 'Styles/buildingStyles';
import { ItemG } from 'Components';

const BuildingInfo = () => {
	const classes = buildingStyles();

	return (
		<Paper elevation={3} className={classes.buildInfoContainer}>
			<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={0}>
				<Grid container item xs={12}>
					<ItemG xs={9}>
						<div className={classes.buildingName}>Bygning xxx</div>
						<div className={classes.dayName}>
							{moment().format('dddd')}
						</div>
						<div className={classes.date}>
							{moment().format('D. MMMM YYYY')}
						</div>
					</ItemG>
					<ItemG xs={3}>
						<div></div>
					</ItemG>
				</Grid>
				<Grid container item xs={12} className={classes.weatherContainer}>
					<ItemG xs={10}>
						<Grid container item xs={12}>
							<ItemG xs={12}>
								<div className={classes.weatherHeader}>Vejret</div>
							</ItemG>
							<ItemG xs={6} className={classes.weatherInfo}>
								Vejr: Let skyet
							</ItemG>
							<ItemG xs={6} className={classes.weatherInfo}>
								Fugtighed: 92%
							</ItemG>
							<ItemG xs={6} className={classes.weatherInfo}>
								Temperatur: 15c
							</ItemG>
							<ItemG xs={6} className={classes.weatherInfo}>
								Tryk: 1024 HPa
							</ItemG>
							<ItemG xs={6} className={classes.weatherInfo}>
								Vindhastighed: 1m/s
							</ItemG>
							<ItemG xs={6} className={classes.weatherInfo}>
							</ItemG>
						</Grid>
					</ItemG>
					<ItemG xs={2}>
						<img src={require('../../assets/imgs/letskyet.png')} alt="" className={classes.weatherImage} />
					</ItemG>
					<Grid container item xs={12}>
						<ItemG xs={4}>
						</ItemG>
						<ItemG xs={4}>
						</ItemG>
						<ItemG xs={4}>
						</ItemG>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default BuildingInfo;
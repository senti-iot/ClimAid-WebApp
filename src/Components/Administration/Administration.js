import React from 'react';
import { Grid, Paper } from '@material-ui/core';

import AdminMenu from './AdminMenu';
import adminStyles from 'Styles/adminStyles';

const Administration = () => {
	const classes = adminStyles();

	return (
		<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={3}>
			<Grid container item xs={3}>
				<Paper elevation={3} className={classes.adminPaperContainer}>
					<AdminMenu />
				</Paper>
			</Grid>
			<Grid container item xs={6}>
				<Paper elevation={3} className={classes.adminPaperContainer}>
				</Paper>
			</Grid>
			<Grid container item xs={3}>
				<Paper elevation={3} className={classes.adminPaperContainer}>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default Administration;

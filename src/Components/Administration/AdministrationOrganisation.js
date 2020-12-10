import React from 'react';
import { Paper } from '@material-ui/core';

import adminStyles from 'Styles/adminStyles';

const AdministrationOrganisation = () => {
	const classes = adminStyles();

	return (
		<Paper elevation={3} className={classes.adminPaperContainer}>
		</Paper>
	);
}

export default AdministrationOrganisation;

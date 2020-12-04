
import React from 'react'
import { Paper } from '@material-ui/core';

import adminStyles from 'Styles/adminStyles';

const AdminUsersList = props => {
	const classes = adminStyles();

	return (
		<Paper elevation={3} className={classes.adminPaperContainer}>
			<div className={classes.adminHeader}>Tilføj bruger</div>
		</Paper>
	)
}

export default AdminUsersList;

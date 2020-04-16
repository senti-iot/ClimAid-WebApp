import React from 'react';
import { Grid, Paper } from '@material-ui/core';

const UserManual = () => {
	return (
		<Paper elevation={3} style={{ margin: 30, padding: '0px 30px 30px 30px' }}>
			<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={0}>
				<Grid container item xs={12}>
					<h1>BRUGSANVISNING</h1>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default UserManual;
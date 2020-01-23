import { Grid } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const gridStyles = makeStyles(theme => ({
	grid: {

		// [theme.breakpoints.down('md')]: {
		// 	padding: '10px 10px 30px 10px',
		// },
		// [theme.breakpoints.down('sm')]: {
		// 	padding: '8px 8px 30px 8px'
		// },
		// padding: '16px 30px 16px 8px',
		padding: 30,
		width: 'auto',
		margin: 0
	}
}))

function GridContainer({ ...props }) {
	const { children, className, ...rest } = props;
	const classes = gridStyles()
	return (
		<Grid container {...rest} className={classes.grid + ' ' + className}>
			{children}
		</Grid>
	);
}


export default GridContainer;

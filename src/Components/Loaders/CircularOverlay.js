import React from 'react'
import { Grid, CircularProgress, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import cx from 'classnames'
const clStyles = makeStyles((theme) => ({
	container: {
		transition: 'background 300ms ease'
	},
	overlay: {
		position: 'absolute',
		width: '100%',
		height: 'calc(100% - 64px)',
		background: theme.boxBackground,
		zIndex: 99999
	},
	grid: {
		minHeight: 'calc(100vh - 300px)'
	},
	fill: {
		height: '100%',
		width: '100%'
	},
	hidden: {
		opacity: 0,
		height: 0,
		width: 0,
		// display: 'none'
	},
	circular: {
		height: 40,
		width: 40,
		opacity: 1,
		transition: 'all 300ms ease'
	}
}))


const CircularOverlay = (props) => {
	const { className, overlay } = props
	const classes = clStyles()
	const gridClasses = cx({
		[classes.container]: true,
		[classes.overlay]: overlay,
		[classes.hidden]: !overlay,
		// [classes.grid]: notCentered,
		// [classes.fill]: fill,
		[className]: className ? true : false
	})
	const circularClasses = cx({
		[classes.circular]: true,
		[classes.hidden]: !overlay,
	})
	return (
		<Grid container justify={'center'} alignItems='center' className={gridClasses} style={props.style}>
			<Fade in={overlay}>
				<CircularProgress className={circularClasses} />
			</Fade>
		</Grid>
	)

}

export default CircularOverlay
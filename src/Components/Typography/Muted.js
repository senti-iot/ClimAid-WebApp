import React from 'react';
import typographyStyle from 'Styles/typographyStyle';
// import { withStyles } from '@material-ui/core';
// import { makeStyles } from '@material-ui/styles'
// import typographyStyle from 'assets/jss/material-dashboard-react/typographyStyle.js';


function Muted({ ...props }) {
	const { children, className } = props;
	const classes = typographyStyle();
	return (
		<div title={props.title} className={classes.defaultFontStyle + ' ' + classes.mutedText + ' ' + className}>
			{children}
		</div>
	);
}

export default Muted;

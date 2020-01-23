import React from 'react';
import { Typography } from '@material-ui/core';


function Caption({ ...props }) {
	const { children } = props;

	return (
		<Typography noWrap={props.noWrap ? true : false} variant={'caption'} className={props.className ? props.className : ''}>
			{children}
		</Typography>
	);
}

export default Caption;

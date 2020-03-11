import React from 'react';
import typographyStyle from 'Styles/typographyStyle';

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

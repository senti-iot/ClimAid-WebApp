import React from 'react';
import { useLocalization } from 'Hooks';
import footerStyles from 'Styles/footerStyle';

const Footer = () => {
	const t = useLocalization();
	const classes = footerStyles();

	return (
		<div className={classes.container}>Footer</div>
	);
}

export default Footer;

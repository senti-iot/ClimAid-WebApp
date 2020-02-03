import React from 'react';
// import { useLocalization } from 'Hooks';
import footerStyles from 'Styles/footerStyle';
import { Grid } from '@material-ui/core';
import { ItemG } from 'Components';

const Footer = () => {
	// const t = useLocalization();
	const classes = footerStyles();

	return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<Grid container direction="row" justify={'center'} alignItems={'flex-start'} spacing={5}>
					<ItemG xs={4}>
						<b>OM CLIMAID</b>
						<br />
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pellentesque turpis quis nibh eleifend accumsan. Sed vel urna quis justo pellentesque eleifend sed vitae risus. Mauris suscipit placerat sem eget condimentum. Aenean eu libero sit amet diam euismod auctor. Fusce vel arcu enim. Pellentesque augue neque, hendrerit nec ante sit amet, rhoncus ullamcorper augue. Morbi nec libero felis. Aenean tristique mi at libero vulputate blandit. Etiam congue, tellus in dignissim semper, sem nulla tristique orci, vitae sodales diam magna id velit.
					</ItemG>
					<ItemG xs={4}>
						<b>SENESTE INDLÆG</b>
						<br />
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pellentesque turpis quis nibh eleifend accumsan. Sed vel urna quis justo pellentesque eleifend sed vitae risus. Mauris suscipit placerat sem eget condimentum. Aenean eu libero sit amet diam euismod auctor. Fusce vel arcu enim. Pellentesque augue neque, hendrerit nec ante sit amet, rhoncus ullamcorper augue. Morbi nec libero felis. Aenean tristique mi at libero vulputate blandit. Etiam congue, tellus in dignissim semper, sem nulla tristique orci, vitae sodales diam magna id velit.
					</ItemG>
					<ItemG xs={4}>
						<b>KONTAKT</b>
						<br />
						Telefon: +45 31 53 71 45
						<br />
						E-mail: s.andersen@climaid.dk
						<br />
						Adresse: Erik Husfeldts vej 7, 2630 Taastrup
					</ItemG>
				</Grid>
			</div>
		</div>
	);
}

export default Footer;

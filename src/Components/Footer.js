import React from 'react';
import footerStyles from 'Styles/footerStyle';
import { Grid } from '@material-ui/core';
import { ItemG } from 'Components';
import { ReactComponent as PoweredByIcon } from "assets/icons/poweredby.svg";

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
						CLIMAID er stiftet af en flok indeklimanørder, men selv om vi elsker tal og excel ark så ser vi det som vores vigtigste opgave at formidler indeklima data på en intuitiv måde der er nem at reagere på.
					</ItemG>
					<ItemG xs={4}>
						<b>SENESTE INDLÆG</b>
						<p>Til Barcelona uden speed-o-meter!</p>
						<p>Hvad koster dit sygefravær?</p>
						<p>5 tips til arbejdet med jeres indeklima</p>
						<p>Hvad kan jeres virksomhed vinde ved godt indeklima?</p>
						<p>Hvordan ændrer man bedst andres adfærd?</p>
					</ItemG>
					<ItemG xs={4}>
						<b>KONTAKT</b>
						<p>Telefon: +45 31 53 71 45</p>
						<p>Email: s.andersen@climaid.dk</p>
						<p>Adresse: Hørskætten 6D, 2630 Taastrup</p>
					</ItemG>
				</Grid>
			</div>

			<div style={{ float: 'right', marginRight: 30 }}>
				<a href="https://senti.io/" target="_new"><PoweredByIcon /></a>
			</div>
		</div>
	);
}

export default Footer;

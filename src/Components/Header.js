import React from 'react';
import { AppBar, Toolbar, ButtonBase, Grid } from '@material-ui/core';
import HeaderLinks from './HeaderLinks';
import headerStyles from 'Styles/headerStyle';
import logo from 'assets/logo.png'
import { useHistory } from 'react-router'
import { useLocalization } from 'Hooks';
import { ItemG } from 'Components';

function Header({ ...props }) {
	const classes = headerStyles()
	const history = useHistory()
	const t = useLocalization()

	const goHome = () => history.push('/')

	var brand = (
		<ButtonBase
			focusRipple
			className={classes.image}
			focusVisibleClassName={classes.focusVisible}
			style={{ width: '200px' }}
			onClick={goHome}
		>
			<span
				className={classes.imageSrc}
				style={{ backgroundImage: `url(${logo})` }}
			/>
		</ButtonBase>
	);

	return (
		<AppBar className={classes.appBar}>
			<Toolbar className={classes.container}>
				<Grid container justify={'center'} alignItems={'center'} spacing={1}>
					<ItemG xs={3}>
						<div className={classes.logoContainer}>
							{brand}
							<div className={classes.logotext}>INSIGHT</div>
						</div>
					</ItemG>
					<ItemG xs={9}>
						<HeaderLinks t={t} history={history} />
					</ItemG>
				</Grid>
			</Toolbar>
		</AppBar>
	);
}

export default Header

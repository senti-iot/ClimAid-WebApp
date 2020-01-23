import React from 'react';
import { AppBar, Toolbar, ButtonBase } from '@material-ui/core';
import HeaderLinks from './HeaderLinks';
import headerStyles from 'Styles/headerStyle';
import logo from 'assets/logo.png'
import { useHistory } from 'react-router'
import { useLocalization } from 'Hooks';

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
			style={{
				width: '200px'
			}}
			onClick={goHome}
		// onClick={() => props.history.push(defaultRoute ? defaultRoute : '/')}
		>
			<span
				className={classes.imageSrc}
				style={{
					backgroundImage: `url(${logo})`
				}}
			/>
		</ButtonBase>
	);

	return (
		<AppBar className={classes.appBar}>
			<Toolbar className={classes.container}>
				<div className={classes.logoContainer}>
					{brand}
				</div>
				<HeaderLinks t={t} history={history} />
			</Toolbar>
		</AppBar>
	);
}

export default Header

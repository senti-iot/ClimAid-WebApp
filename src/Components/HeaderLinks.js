import { Grid, Menu, MenuItem, Divider, Tooltip, Button } from '@material-ui/core';
import { PowerSettingsNew, SettingsRounded, MenuIcon, Business, Apartment, Dashboard } from 'variables/icons';
import React, { useState } from 'react';
import cookie from 'react-cookies';
import Gravatar from 'react-gravatar'
import { logOut } from 'data/login';
import { T, Muted, ItemG } from 'Components';
import { GoogleLogout } from 'react-google-login';
import headerLinksStyle from 'Styles/headerLinksStyle';
import { useDispatch, useSelector } from 'Hooks';


function HeaderLinks(props) {

	const [anchorProfile, setAnchorProfile] = useState(null)
	const history = props.history
	const dispatch = useDispatch()
	const redux = {
		resetRedux: () => dispatch({ type: 'RESET_APP' })
	}
	const user = useSelector(state => state.settings.user)

	const handleProfileOpen = e => {
		setAnchorProfile(e.currentTarget)
	}
	const handleProfileClose = () => {
		setAnchorProfile(null)
		if (props.onClose)
			props.onClose()
	}

	const classes = headerLinksStyle()

	const handleLogOut = async () => {
		try {
			await logOut().then(() => {
				cookie.remove('SESSION', { path: '/' })
				redux.resetRedux()
			})
		}
		catch (e) {
		}
		if (!cookie.load('SESSION')) {
			history.push('/login')
		}
		setAnchorProfile(null)
	}
	const handleSettingsOpen = () => {
		handleProfileClose()
		history.push(`/settings`)
	}

	const renderUserMenu = () => {
		const { t } = props;
		const openProfile = Boolean(anchorProfile)

		return <div>
			<Tooltip title={t('menus.user.profile')}>
				<Button
					aria-owns={openProfile ? 'menu-appbar' : null}
					aria-haspopup='true'
					onClick={handleProfileOpen}
				>
					{user ? user.img ? <img src={user.img} alt='UserProfile' className={classes.img} /> : <Gravatar default='mp' email={user.email} className={classes.img} size={75} /> : <Gravatar default='mp' email={null} className={classes.img} size={75} />}
				</Button>
			</Tooltip>
			<Menu
				style={{ marginTop: 80 }}
				id='menu-appbar'
				anchorEl={anchorProfile}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={openProfile}
				onClose={handleProfileClose}
				disableAutoFocusItem
			>
				{user ?
					<MenuItem disableRipple component={'div'} className={classes.nameAndEmail}>
						<T style={{ fontSize: '1rem' }}>{`${user.firstName} ${user.lastName}`}</T>
						<Muted style={{ fontSize: '0.875rem' }}>{user.email}</Muted>
					</MenuItem>
					: null}
				<Divider />
				<MenuItem onClick={handleSettingsOpen}>
					<SettingsRounded className={classes.leftIcon} />{t('sidebar.settings')}
				</MenuItem>
				<GoogleLogout
					// onLogoutSuccess={() => logOut()}
					clientId="1038408973194-qcb30o8t7opc83k158irkdiar20l3t2a.apps.googleusercontent.com"
					render={renderProps => (<MenuItem onClick={() => { renderProps.onClick(); handleLogOut() }}>
						<PowerSettingsNew className={classes.leftIcon} />{t('menus.user.signout')}
					</MenuItem>)}
				/>
			</Menu>
		</div>
	}

	const { t } = props;

	return (
		<Grid container direction="row" justify={'space-around'} alignItems={'center'}>
			<ItemG>
				{renderUserMenu()}
			</ItemG>
			<ItemG>
				<Button onClick={() => { history.push(`/area`) }}>
					<Grid container justify={'center'} alignItems={'center'} spacing={1}>
						<ItemG>
							<Business className={classes.headerItemIcon} />
						</ItemG>
						<ItemG><T className={classes.headerItemText}>{t('climaid.area')}</T></ItemG>
					</Grid>
				</Button>
			</ItemG>
			<ItemG>
				<Button onClick={() => { history.push(`/building`) }}>
					<Grid container justify={'center'} alignItems={'center'} spacing={1}>
						<ItemG>
							<Apartment className={classes.headerItemIcon} />
						</ItemG>
						<ItemG><T className={classes.headerItemText}>{t('climaid.building')}</T></ItemG>
					</Grid>
				</Button>
			</ItemG>
			<ItemG>
				<Button onClick={() => { history.push(`/room`) }}>
					<Grid container justify={'center'} alignItems={'center'} spacing={1}>
						<ItemG>
							<Dashboard className={classes.headerItemIcon} />
						</ItemG>
						<ItemG><T className={classes.headerItemText}>{t('climaid.room')}</T></ItemG>
					</Grid>
				</Button>
			</ItemG>
			<ItemG className={classes.burgerMenuIconWrapper}>
				<MenuIcon className={classes.burgerMenuIcon} />
			</ItemG>
		</Grid>
	);
}

// const mapStateToProps = (state) => ({
// 	user: state.settings.user,
// 	globalSearch: state.settings.globalSearch
// })

// const mapDispatchToProps = dispatch => ({
// 	resetRedux: () => dispatch({ type: "RESET_APP" })
// })

export default HeaderLinks

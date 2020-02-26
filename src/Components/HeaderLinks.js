import React, { useEffect, useState } from 'react';
import { Grid, Menu, MenuItem, Divider, Tooltip, Button } from '@material-ui/core';
import cookie from 'react-cookies';
import Gravatar from 'react-gravatar'
import { GoogleLogout } from 'react-google-login';
import { useDispatch, useSelector } from 'Hooks';

import { T, Muted, ItemG } from 'Components';
import headerLinksStyle from 'Styles/headerLinksStyle';
import { logOut } from 'data/login';
import { PowerSettingsNew, SettingsRounded, MenuIcon, Business, Apartment, Dashboard, Add } from 'variables/icons';
import { getBuildings, getRooms } from 'data/climaid';

function HeaderLinks(props) {
	const [anchorBuildingEl, setAnchorBuildingEl] = React.useState(null);
	const [anchorRoomsEl, setAnchorRoomsEl] = React.useState(null);
	const [anchorProfile, setAnchorProfile] = useState(null);
	const [buildings, setBuildings] = useState(null);
	const [rooms, setRooms] = useState(null);
	const history = props.history
	const dispatch = useDispatch()
	const redux = {
		resetRedux: () => dispatch({ type: 'RESET_APP' })
	}
	const user = useSelector(state => state.settings.user)

	useEffect(() => {
		async function fetchData() {
			const data = await getBuildings();
			if (data) {
				setBuildings(data);
			}

			const roomData = await getRooms();
			if (roomData) {
				setRooms(roomData);
			}
		}

		fetchData();
	}, []);

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
				{/* <MenuItem onClick={handleSettingsOpen}>
					<SettingsRounded className={classes.leftIcon} />{t('sidebar.settings')}
				</MenuItem> */}
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

	const handleBuildingMenuOpen = event => {
		setAnchorBuildingEl(event.currentTarget);
	};

	const handleBuildingMenuClose = () => {
		setAnchorBuildingEl(null);
	};

	const handleRoomsMenuOpen = event => {
		setAnchorRoomsEl(event.currentTarget);
	};

	const handleRoomsMenuClose = () => {
		setAnchorRoomsEl(null);
	};

	const goToBuilding = (building) => {
		history.push('/building/' + building.uuid);

		handleBuildingMenuClose();
	}

	const goToRoom = (room) => {
		history.push('/building/' + room.building.uuid + '/room/' + room.uuid);

		handleRoomsMenuClose();
	}

	const { t } = props;

	return (
		<div>
			<Grid container direction="row" justify={'space-around'} alignItems={'center'}>
				<ItemG xs={1}>
					{renderUserMenu()}
				</ItemG>
				<ItemG>
					<Button onClick={() => { history.push(`/map`) }}>
						<Grid container justify={'center'} alignItems={'center'} spacing={1}>
							<ItemG>
								<Business className={classes.headerItemIcon} />
							</ItemG>
							<ItemG><T className={classes.headerItemText}>{t('climaid.map')}</T></ItemG>
						</Grid>
					</Button>
				</ItemG>
				<ItemG>
					<Button aria-controls="building-menu" aria-haspopup="true" onClick={handleBuildingMenuOpen}>
						<Grid container justify={'center'} alignItems={'center'} spacing={1}>
							<ItemG>
								<Apartment className={classes.headerItemIcon} />
							</ItemG>
							<ItemG><T className={classes.headerItemText}>{t('climaid.building')}</T></ItemG>
							<ItemG><Add className={classes.headerItemIconAdd} /></ItemG>
						</Grid>
					</Button>
				</ItemG>
				<ItemG>
					<Button aria-controls="rooms-menu" aria-haspopup="true" onClick={handleRoomsMenuOpen}>
						<Grid container justify={'center'} alignItems={'center'} spacing={1}>
							<ItemG>
								<Dashboard className={classes.headerItemIcon} />
							</ItemG>
							<ItemG><T className={classes.headerItemText}>{t('climaid.room')}</T></ItemG>
							<ItemG><Add className={classes.headerItemIconAdd} /></ItemG>
						</Grid>
					</Button>
				</ItemG>
				<ItemG xs={1} className={classes.burgerMenuIconWrapper}>
					<MenuIcon className={classes.burgerMenuIcon} />
				</ItemG>
			</Grid>
			<Menu
				style={{ marginTop: 45 }}
				PaperProps={{
					style: {
						maxHeight: 800,
						width: 300,
						backgroundColor: '#ffffff',
						color: '#000000'
					},
				}}
				id="building-menu"
				anchorEl={anchorBuildingEl}
				keepMounted
				open={Boolean(anchorBuildingEl)}
				onClose={handleBuildingMenuClose}
			>
				{buildings ?
					<span>
						{buildings.map(function (building) {
							return (<MenuItem key={building.uuid} onClick={() => goToBuilding(building)}>{building.name}</MenuItem>)
						})}
					</span>
					: ""}
			</Menu>
			<Menu
				style={{ marginTop: 45 }}
				PaperProps={{
					style: {
						maxHeight: 800,
						width: 200,
						backgroundColor: '#ffffff',
						color: '#000000'
					},
				}}
				id="rooms-menu"
				anchorEl={anchorRoomsEl}
				keepMounted
				open={Boolean(anchorRoomsEl)}
				onClose={handleRoomsMenuClose}
			>
				{rooms ?
					<span>
						{rooms.map(function (room) {
							return (<MenuItem key={room.uuid} onClick={() => goToRoom(room)}>{room.name}</MenuItem>)
						})}
					</span>
					: ""}
			</Menu>
		</div>
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

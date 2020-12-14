import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

import adminStyles from 'Styles/adminStyles';
import { ReactComponent as AlarmIconActive } from 'assets/icons/admin/menu_alarm_on.svg';
import { ReactComponent as AlarmIconInactive } from 'assets/icons/admin/menu_alarm_off.svg';
import { ReactComponent as BuildingIconActive } from 'assets/icons/admin/menu_building_on.svg';
import { ReactComponent as BuildingIconInactive } from 'assets/icons/admin/menu_building_off.svg';
import { ReactComponent as DeviceIconActive } from 'assets/icons/admin/menu_device_on.svg';
import { ReactComponent as DeviceIconInactive } from 'assets/icons/admin/menu_device_off.svg';
import { ReactComponent as OrgIconActive } from 'assets/icons/admin/menu_org_on.svg';
import { ReactComponent as OrgIconInactive } from 'assets/icons/admin/menu_org_off.svg';
import { ReactComponent as UserIconActive } from 'assets/icons/admin/menu_user_on.svg';
import { ReactComponent as UserIconInactive } from 'assets/icons/admin/menu_user_off.svg';
import { ReactComponent as ZoneIconActive } from 'assets/icons/admin/menu_zone_on.svg';
import { ReactComponent as ZoneIconInactive } from 'assets/icons/admin/menu_zone_off.svg';

const AdminMenu = () => {
	const classes = adminStyles();
	const history = useHistory();
	const location = useLocation();

	const [activeMenuItem, setActiveMenuItem] = useState('');

	useEffect(() => {
		setActiveMenuItem(location.pathname.split('/')[2]);
	}, [location]);

	const goToPage = (page) => {
		history.push(page);
	}

	return (
		<List>
			<ListItem className={activeMenuItem === 'organisation' ? classes.adminMenuItemActive : classes.adminMenuItem} onClick={() => goToPage('/administration/organisation')}>
				<ListItemIcon style={{ minWidth: 45 }}>
					{activeMenuItem === 'organisation' ? <OrgIconActive className={classes.adminMenuItemIcon} /> : <OrgIconInactive className={classes.adminMenuItemIcon} />}
				</ListItemIcon>
				<ListItemText primary="Organisation" classes={{ primary: activeMenuItem === 'organisation' ? classes.adminMenuItemLabelActive : classes.adminMenuItemLabel }} />
			</ListItem>

			<ListItem className={activeMenuItem === 'users' ? classes.adminMenuItemActive : classes.adminMenuItem} onClick={() => goToPage('/administration/users/list')}>
				<ListItemIcon style={{ minWidth: 45 }}>
					{activeMenuItem === 'users' ? <UserIconActive className={classes.adminMenuItemIcon} /> : <UserIconInactive className={classes.adminMenuItemIcon} />}
				</ListItemIcon>
				<ListItemText primary="Bruger" classes={{ primary: activeMenuItem === 'users' ? classes.adminMenuItemLabelActive : classes.adminMenuItemLabel }} />
			</ListItem>

			<ListItem className={activeMenuItem === 'devices' ? classes.adminMenuItemActive : classes.adminMenuItem} onClick={() => goToPage('/administration/devices/list')}>
				<ListItemIcon style={{ minWidth: 45 }}>
					{activeMenuItem === 'devices' ? <DeviceIconActive className={classes.adminMenuItemIcon} /> : <DeviceIconInactive className={classes.adminMenuItemIcon} />}
				</ListItemIcon>
				<ListItemText primary="Sensor" classes={{ primary: activeMenuItem === 'devices' ? classes.adminMenuItemLabelActive : classes.adminMenuItemLabel }} />
			</ListItem>

			<ListItem className={activeMenuItem === 'zones' ? classes.adminMenuItemActive : classes.adminMenuItem} onClick={() => goToPage('/administration/zones/list')}>
				<ListItemIcon style={{ minWidth: 45 }}>
					{activeMenuItem === 'zones' ? <ZoneIconActive className={classes.adminMenuItemIcon} /> : <ZoneIconInactive className={classes.adminMenuItemIcon} />}
				</ListItemIcon>
				<ListItemText primary="Zone" classes={{ primary: activeMenuItem === 'zones' ? classes.adminMenuItemLabelActive : classes.adminMenuItemLabel }} />
			</ListItem>

			<ListItem className={activeMenuItem === 'buildings' ? classes.adminMenuItemActive : classes.adminMenuItem} onClick={() => goToPage('/administration/buildings/list')}>
				<ListItemIcon style={{ minWidth: 45 }}>
					{activeMenuItem === 'buildings' ? <BuildingIconActive className={classes.adminMenuItemIcon} /> : <BuildingIconInactive className={classes.adminMenuItemIcon} />}
				</ListItemIcon>
				<ListItemText primary="Bygning" classes={{ primary: activeMenuItem === 'buildings' ? classes.adminMenuItemLabelActive : classes.adminMenuItemLabel }} />
			</ListItem>

			<ListItem className={activeMenuItem === 'alarms' ? classes.adminMenuItemActive : classes.adminMenuItem} onClick={() => goToPage('/administration/alarms/list')}>
				<ListItemIcon style={{ minWidth: 45 }}>
					{activeMenuItem === 'alarms' ? <AlarmIconActive className={classes.adminMenuItemIcon} /> : <AlarmIconInactive className={classes.adminMenuItemIcon} />}
				</ListItemIcon>
				<ListItemText primary="Alarm" classes={{ primary: activeMenuItem === 'alarms' ? classes.adminMenuItemLabelActive : classes.adminMenuItemLabel }} />
			</ListItem>
		</List>
	)
}

export default AdminMenu;
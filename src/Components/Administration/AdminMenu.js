import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import { useHistory } from 'react-router';

import adminStyles from 'Styles/adminStyles';

const AdminMenu = () => {
	const classes = adminStyles();
	const history = useHistory();

	const [activeMenuItem, setActiveMenuItem] = useState('');

	const goToPage = (page) => {
		setActiveMenuItem(page);
		history.push(page);
	}

	return (
		<List>
			<ListItem className={classes.adminMenuItem}>
				<ListItemIcon>
					<FolderIcon className={activeMenuItem === '/administration/organisation' ? classes.adminMenuItemIconActive : classes.adminMenuItemIcon} />
				</ListItemIcon>
				<ListItemText primary="Organisation" classes={{ primary: activeMenuItem === '/administration/organisation' ? classes.adminMenuItemLabelActive : classes.adminMenuItemLabel }} />
			</ListItem>
			<ListItem className={classes.adminMenuItem} onClick={() => goToPage('/administration/users/list')}>
				<ListItemIcon>
					<FolderIcon className={activeMenuItem === '/administration/users/list' ? classes.adminMenuItemIconActive : classes.adminMenuItemIcon} />
				</ListItemIcon>
				<ListItemText primary="Bruger" classes={{ primary: activeMenuItem === '/administration/users/list' ? classes.adminMenuItemLabelActive : classes.adminMenuItemLabel }} />
			</ListItem>
			<ListItem className={classes.adminMenuItem} onClick={() => goToPage('/administration/devices/list')}>
				<ListItemIcon>
					<FolderIcon className={activeMenuItem === '/administration/devices/list' ? classes.adminMenuItemIconActive : classes.adminMenuItemIcon} />
				</ListItemIcon>
				<ListItemText primary="Sensor" classes={{ primary: activeMenuItem === '/administration/devices/list' ? classes.adminMenuItemLabelActive : classes.adminMenuItemLabel }} />
			</ListItem>
			<ListItem className={classes.adminMenuItem} onClick={() => goToPage('/administration/zones/list')}>
				<ListItemIcon>
					<FolderIcon className={activeMenuItem === '/administration/zones/list' ? classes.adminMenuItemIconActive : classes.adminMenuItemIcon} />
				</ListItemIcon>
				<ListItemText primary="Zone" classes={{ primary: activeMenuItem === '/administration/zones/list' ? classes.adminMenuItemLabelActive : classes.adminMenuItemLabel }} />
			</ListItem>
			<ListItem className={classes.adminMenuItem} onClick={() => goToPage('/administration/buildings/list')}>
				<ListItemIcon>
					<FolderIcon className={activeMenuItem === '/administration/buildings/list' ? classes.adminMenuItemIconActive : classes.adminMenuItemIcon} />
				</ListItemIcon>
				<ListItemText primary="Bygning" classes={{ primary: activeMenuItem === '/administration/buildings/list' ? classes.adminMenuItemLabelActive : classes.adminMenuItemLabel }} />
			</ListItem>
			<ListItem className={classes.adminMenuItem}>
				<ListItemIcon>
					<FolderIcon className={activeMenuItem === '/administration/alarms/list' ? classes.adminMenuItemIconActive : classes.adminMenuItemIcon} />
				</ListItemIcon>
				<ListItemText primary="Alarm" classes={{ primary: activeMenuItem === '/administration/alarms/list' ? classes.adminMenuItemLabelActive : classes.adminMenuItemLabel }} />
			</ListItem>
		</List>
	)
}

export default AdminMenu;
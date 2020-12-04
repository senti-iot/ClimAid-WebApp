import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import { useHistory } from 'react-router';

import adminStyles from 'Styles/adminStyles';

const AdminMenu = (props) => {
	const classes = adminStyles();
	const history = useHistory();

	const goToPage = (page) => {
		history.push(page);
	}

	return (
		<List>
			<ListItem className={classes.adminMenuItem}>
				<ListItemIcon>
					<FolderIcon />
				</ListItemIcon>
				<ListItemText primary="Organisation" classes={{ primary: classes.adminMenuItemLabel }} />
			</ListItem>
			<ListItem className={classes.adminMenuItem} onClick={() => goToPage('/administration/users/list')}>
				<ListItemIcon>
					<FolderIcon />
				</ListItemIcon>
				<ListItemText primary="Bruger" classes={{ primary: classes.adminMenuItemLabel }} />
			</ListItem>
			<ListItem className={classes.adminMenuItem} onClick={() => goToPage('/administration/devices/list')}>
				<ListItemIcon>
					<FolderIcon />
				</ListItemIcon>
				<ListItemText primary="Sensor" classes={{ primary: classes.adminMenuItemLabel }} />
			</ListItem>
			<ListItem className={classes.adminMenuItem} onClick={() => goToPage('/administration/zones/list')}>
				<ListItemIcon>
					<FolderIcon />
				</ListItemIcon>
				<ListItemText primary="Zone" classes={{ primary: classes.adminMenuItemLabel }} />
			</ListItem>
			<ListItem className={classes.adminMenuItem} onClick={() => goToPage('/administration/buildings/list')}>
				<ListItemIcon>
					<FolderIcon />
				</ListItemIcon>
				<ListItemText primary="Bygning" classes={{ primary: classes.adminMenuItemLabel }} />
			</ListItem>
			<ListItem className={classes.adminMenuItem}>
				<ListItemIcon>
					<FolderIcon />
				</ListItemIcon>
				<ListItemText primary="Alarm" classes={{ primary: classes.adminMenuItemLabel }} />
			</ListItem>
		</List>
	)
}

export default AdminMenu;
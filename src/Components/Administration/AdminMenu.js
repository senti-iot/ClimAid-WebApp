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
				<ListItemText primary="Organisation" />
			</ListItem>
			<ListItem className={classes.adminMenuItem}>
				<ListItemIcon>
					<FolderIcon />
				</ListItemIcon>
				<ListItemText primary="Bruger oprettelse" />
			</ListItem>
			<ListItem className={classes.adminMenuItem}>
				<ListItemIcon>
					<FolderIcon />
				</ListItemIcon>
				<ListItemText primary="Sensor oprettelse" />
			</ListItem>
			<ListItem className={classes.adminMenuItem} onClick={() => goToPage('/administration/rooms/list')}>
				<ListItemIcon>
					<FolderIcon />
				</ListItemIcon>
				<ListItemText primary="Lokaler" />
			</ListItem>
			<ListItem className={classes.adminMenuItem} onClick={() => goToPage('/administration/buildings/list')}>
				<ListItemIcon>
					<FolderIcon />
				</ListItemIcon>
				<ListItemText primary="Bygninger" />
			</ListItem>
			<ListItem className={classes.adminMenuItem}>
				<ListItemIcon>
					<FolderIcon />
				</ListItemIcon>
				<ListItemText primary="Alarmer" />
			</ListItem>
		</List>
	)
}

export default AdminMenu;
import React, { useState } from 'react';
import { Popover, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

import roomStyles from 'Styles/roomStyles';
import {  } from 'data/climaid';

const ExportDropdown = (props) => {
	const classes = roomStyles();
	const [popoverWidth, setPopoverWidth] = useState(310);
	const [anchorExportEl, setAnchorExportEl] = React.useState(null);

	const handleExportMenuOpen = event => {
		setPopoverWidth(event.currentTarget.offsetWidth);
		setAnchorExportEl(event.currentTarget);
	};

	const handleExportMenuClose = () => {
		setAnchorExportEl(null);
	};

	const _saveGraph = (type) => {
		handleExportMenuClose();
		props.saveGraph(type);
	};

	const _exportCsv = async () => {
		handleExportMenuClose();
		props.exportCsv();		
	}

	return (
		<>
			<List dense onClick={handleExportMenuOpen}>
				<ListItem key={0} button className={classes.topDropdown}>
					<Button aria-controls="climate-menu" aria-haspopup="true" fullWidth={true} className={classes.topDropdownButton}>
						Eksporter
					</Button>
					<ListItemSecondaryAction>
						<AddIcon style={{ fontSize: 28, marginTop: 5, cursor: 'pointer' }} />
					</ListItemSecondaryAction>
				</ListItem>
			</List>

			<Popover
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				PaperProps={{
					style: {
						width: popoverWidth,
					},
				}}
				id="climate-menu"
				anchorEl={anchorExportEl}
				keepMounted
				open={Boolean(anchorExportEl)}
				onClose={handleExportMenuClose}
			>
				<>
					<List dense className={classes.root}>
						<ListItem key={0} button onClick={() => _saveGraph(1)}>
							<ListItemText id={0} primary="Kopier graf til udklipsholder" />
							<ListItemSecondaryAction>
								<IconButton edge="end">
									<SaveAltIcon />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<ListItem key={1} button onClick={() => _saveGraph(2)}>
							<ListItemText id={1} primary="Eksporter til PNG" />
							<ListItemSecondaryAction>
								<IconButton edge="end">
									<SaveAltIcon />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<ListItem key={2} button onClick={async () => _exportCsv()}>
							<ListItemText id={2} primary="Download data til csv" />
							<ListItemSecondaryAction>
								<IconButton edge="end">
									<SaveAltIcon />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
				</>
			</Popover>
		</>
	)
}

export default ExportDropdown;
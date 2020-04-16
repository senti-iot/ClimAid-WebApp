import React, { useState } from 'react';
import { Popover, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import roomStyles from 'Styles/roomStyles';

const EnergyDropdown = () => {
	const classes = roomStyles();
	const [popoverWidth, setPopoverWidth] = useState(310);
	const [anchorAnalyticsEl, setAnchorAnalyticsEl] = React.useState(null);

	const handleAnalyticsMenuOpen = event => {
		setPopoverWidth(event.currentTarget.offsetWidth);
		setAnchorAnalyticsEl(event.currentTarget);
	};

	const handleAnalyticsMenuClose = () => {
		setAnchorAnalyticsEl(null);
	}

	return (
		<>
			<List dense onClick={handleAnalyticsMenuOpen}>
				<ListItem key={0} button className={classes.topDropdown}>
					<Button aria-controls="climate-menu" aria-haspopup="true" fullWidth={true} className={classes.topDropdownButton}>
						Energi
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
				id="climate-analytics-menu"
				anchorEl={anchorAnalyticsEl}
				keepMounted
				open={Boolean(anchorAnalyticsEl)}
				onClose={handleAnalyticsMenuClose}
			>
				<>
					<List dense className={classes.root}>
						<ListItem key={0}>
							<ListItemText id={0} primary="Varmeforbrug" secondary="Tilgængeligt 2021" />
						</ListItem>
						<ListItem key={1}>
							<ListItemText id={1} primary="Fremløbstemperatur" secondary="Tilgængeligt 2021" />
						</ListItem>
						<ListItem key={2}>
							<ListItemText id={2} primary="Vandforbrug" secondary="Tilgængeligt 2021" />
						</ListItem>
						<ListItem key={3}>
							<ListItemText id={3} primary="Elforbrug" secondary="Tilgængeligt 2021" />
						</ListItem>
						<ListItem key={4}>
							<ListItemText id={4} primary="Elproduktion" secondary="Tilgængeligt 2021" />
						</ListItem>
					</List>
				</>
			</Popover>
		</>
	);
};

export default EnergyDropdown;
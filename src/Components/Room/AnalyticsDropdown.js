import React, { useState, useEffect } from 'react';
import { Popover, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider, Collapse, Checkbox } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import roomStyles from 'Styles/roomStyles';

const AnalyticsDropdown = (props) => {
	const classes = roomStyles();
	const [popoverWidth, setPopoverWidth] = useState(310);
	const [anchorAnalyticsEl, setAnchorAnalyticsEl] = React.useState(null);
	const [activityLevelOpen, setActivityLevelOpen] = useState(false);
	const [usageOpen, setUsageOpen] = useState(false);
	const checkboxStates = props.checkboxStates;
	const rooms = props.rooms;

	useEffect(() => {
		if (checkboxStates['analytics']['activitylevel']) {
			setActivityLevelOpen(true);
		}
	}, [checkboxStates]);

	const handleAnalyticsMenuOpen = event => {
		setPopoverWidth(event.currentTarget.offsetWidth);
		setAnchorAnalyticsEl(event.currentTarget);
	};

	const handleAnalyticsMenuClose = () => {
		setAnchorAnalyticsEl(null);
	}

	const toggleActivityLevelOpen = () => {
		setActivityLevelOpen(activityLevelOpen ? false : true);
	}

	const toggleUsageOpen = () => {
		setUsageOpen(usageOpen ? false : true);
	}

	return (
		<>
			<List dense onClick={handleAnalyticsMenuOpen}>
				<ListItem key={0} button className={classes.topDropdown}>
					<Button aria-controls="climate-menu" aria-haspopup="true" fullWidth={true} className={classes.topDropdownButton}>
						Analyse
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
						<ListItem key={0} button style={{ backgroundColor: '#eee' }} >
							<ListItemText id={0} primary="Aktivitets niveau" onClick={toggleActivityLevelOpen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toggleActivityLevelOpen}>
									{activityLevelOpen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={activityLevelOpen} timeout="auto" unmountOnExit>
							<ListItem key={1} button>
								<ListItemText id={1} primary="Total for bygningen" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="activitylevel"
										onChange={props.onChange}
										checked={checkboxStates['analytics']['activitylevel'] ? true : false}
										inputProps={{ 'aria-labelledby': 1 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>

							{rooms.map(room => {
								return (<ListItem key={room.uuid} button>
									<ListItemText id={room.uuid} primary={room.name} />
									<ListItemSecondaryAction>
										<Checkbox
											edge="end"
											value={"activitylevel_" + room.uuid}
											onChange={props.onChange}
											checked={checkboxStates['analytics']['activitylevel_' + room.uuid] ? true : false}
											inputProps={{ 'aria-labelledby': 1 }}
										/>
									</ListItemSecondaryAction>
								</ListItem>);
							})}
						</Collapse>


						<ListItem key={10} button style={{ backgroundColor: '#eee' }} >
							<ListItemText id={10} primary="Brugstid" onClick={toggleUsageOpen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toggleUsageOpen}>
									{usageOpen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={usageOpen} timeout="auto" unmountOnExit>
							<ListItem key={11} button>
								<ListItemText id={1} primary="Total for bygningen" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="activitylevel"
										onChange={props.onChange}
										checked={checkboxStates['analytics']['usage'] ? true : false}
										inputProps={{ 'aria-labelledby': 11 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>

							{rooms.map(room => {
								return (<ListItem key={room.uuid} button>
									<ListItemText id={room.uuid} primary={room.name} />
									<ListItemSecondaryAction>
										<Checkbox
											edge="end"
											value={"usage_" + room.uuid}
											onChange={props.onChange}
											checked={checkboxStates['analytics']['usage_' + room.uuid] ? true : false}
											inputProps={{ 'aria-labelledby': room.uuid }}
										/>
									</ListItemSecondaryAction>
								</ListItem>);
							})}
						</Collapse>
					</List>
				</>
			</Popover>
		</>
	);
};

export default AnalyticsDropdown;
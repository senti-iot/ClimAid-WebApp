import React, { useState } from 'react';
import { Popover, Checkbox, List, ListItem, ListItemText, ListItemSecondaryAction, Collapse } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import roomStyles from 'Styles/roomStyles';

const ClimateDropdown = () => {
	const classes = roomStyles();
	const [anchorClimateEl, setAnchorClimateEl] = React.useState(null);
	const [temperatureOpen, setTemperatureOpen] = useState(true);
	const [co2open, setCo2open] = useState(false);

	const handleClimateMenuOpen = event => {
		setAnchorClimateEl(event.currentTarget);
	};

	const handleClimateMenuClose = () => {
		setAnchorClimateEl(null);
	};

	// const climateCheckboxCheck = (e) => {
	// 	console.log(e);
	// }

	const toogleTemperatureOpen = () => {
		setTemperatureOpen(temperatureOpen ? false : true);
	}

	const toogleCo2open = () => {
		setCo2open(co2open ? false : true);
	}

	return (
		<>
			<Button aria-controls="climate-menu" aria-haspopup="true" className={classes.topDropdown} onClick={handleClimateMenuOpen}>
				Indeklima
			</Button>

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
						width: 310,
					},
				}}
				id="climate-menu"
				anchorEl={anchorClimateEl}
				keepMounted
				open={Boolean(anchorClimateEl)}
				onClose={handleClimateMenuClose}
			>
				<>
					<List dense className={classes.root}>
						<ListItem key={0} button>
							<ListItemText id={0} primary="Temperatur" onClick={toogleTemperatureOpen} />
						</ListItem>

						<Collapse in={temperatureOpen} timeout="auto" unmountOnExit>
							<ListItem key={1} button>
								<ListItemText id={1} primary="Test" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										// onChange={handleToggle(value)}
										// checked={checked.indexOf(value) !== -1}
										inputProps={{ 'aria-labelledby': 1 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
							<ListItem key={2} button>
								<ListItemText id={2} primary="Test" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										// onChange={handleToggle(value)}
										// checked={checked.indexOf(value) !== -1}
										inputProps={{ 'aria-labelledby': 2 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
							<ListItem key={3} button>
								<ListItemText id={3} primary="Test" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										// onChange={handleToggle(value)}
										// checked={checked.indexOf(value) !== -1}
										inputProps={{ 'aria-labelledby': 3 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
						</Collapse>

						<ListItem key={20} button>
							<ListItemText id={10} primary="Co2 koncentration" onClick={toogleCo2open} />
						</ListItem>

						<Collapse in={co2open} timeout="auto" unmountOnExit>
							<ListItem key={11} button>
								<ListItemText id={11} primary="Test 123" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										// onChange={handleToggle(value)}
										// checked={checked.indexOf(value) !== -1}
										inputProps={{ 'aria-labelledby': 1 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
						</Collapse>
					</List>
				</>
			</Popover>
		</>
	)
}

export default ClimateDropdown;
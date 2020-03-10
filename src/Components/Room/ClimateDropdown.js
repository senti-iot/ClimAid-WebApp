import React, { useState, useEffect } from 'react';
import { Popover, Checkbox, List, ListItem, ListItemText, ListItemSecondaryAction, Collapse, Divider, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import roomStyles from 'Styles/roomStyles';

const ClimateDropdown = (props) => {
	const classes = roomStyles();
	const [anchorClimateEl, setAnchorClimateEl] = React.useState(null);
	const [temperatureOpen, setTemperatureOpen] = useState(false);
	const [co2open, setCo2open] = useState(false);
	const [humidityopen, setHumidityopen] = useState(false);
	const [popoverWidth, setPopoverWidth] = useState(310);
	const checkboxStates = props.checkboxStates;

	useEffect(() => {
		if (checkboxStates['temphistory'] || checkboxStates['tempanbmin'] || checkboxStates['tempanbmax']) {
			setTemperatureOpen(true);
		}
		if (checkboxStates['co2history'] || checkboxStates['co2anbmin'] || checkboxStates['co2anbmax']) {
			setCo2open(true);
		}
		if (checkboxStates['humidityhistory'] || checkboxStates['humidityanbmin'] || checkboxStates['humidityanbmax']) {
			setHumidityopen(true);
		}
	}, [checkboxStates]);

	const handleClimateMenuOpen = event => {
		setPopoverWidth(event.currentTarget.offsetWidth);
		setAnchorClimateEl(event.currentTarget);
	};

	const handleClimateMenuClose = () => {
		setAnchorClimateEl(null);
	};

	const toogleTemperatureOpen = () => {
		setTemperatureOpen(temperatureOpen ? false : true);
	}

	const toogleCo2open = () => {
		setCo2open(co2open ? false : true);
	}

	const toogleHumidityopen = () => {
		setHumidityopen(humidityopen ? false : true);
	}

	return (
		<>
			<List dense onClick={handleClimateMenuOpen}>
				<ListItem key={0} button className={classes.topDropdown}>
					<Button aria-controls="climate-menu" aria-haspopup="true" fullWidth={true} className={classes.topDropdownButton}>
						Indeklima
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
				anchorEl={anchorClimateEl}
				keepMounted
				open={Boolean(anchorClimateEl)}
				onClose={handleClimateMenuClose}
			>
				<>
					<List dense className={classes.root}>
						<ListItem key={0} button style={{ backgroundColor: '#eee' }} >
							<ListItemText id={0} primary="Temperatur" onClick={toogleTemperatureOpen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toogleTemperatureOpen}>
									{temperatureOpen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={temperatureOpen} timeout="auto" unmountOnExit>
							<ListItem key={1} button>
								<ListItemText id={1} primary="Historik" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="temphistory"
										onChange={props.onChange}
										checked={checkboxStates['temphistory'] ? true : false }
										inputProps={{ 'aria-labelledby': 1 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
							<ListItem key={3} button>
								<ListItemText id={3} primary="Anbefalet min." />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="tempanbmin"
										onChange={props.onChange}
										checked={checkboxStates['tempanbmin'] ? true : false}
										inputProps={{ 'aria-labelledby': 3 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
							<ListItem key={2} button>
								<ListItemText id={2} primary="Anbefalet maks" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="tempanbmax"
										onChange={props.onChange}
										checked={checkboxStates['tempanbmax'] ? true : false}
										inputProps={{ 'aria-labelledby': 2 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
							<ListItem key={4} button>
								<ListItemText id={4} primary="Gennemsnit for bygningen" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="tempavgbuilding"
										onChange={props.onChange}
										checked={checkboxStates['tempavgbuilding'] ? true : false}
										inputProps={{ 'aria-labelledby': 4 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
						</Collapse>

						<ListItem key={20} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={10} primary="Co2 koncentration" onClick={toogleCo2open} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toogleCo2open}>
									{co2open ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={co2open} timeout="auto" unmountOnExit>
							<ListItem key={11} button>
								<ListItemText id={11} primary="Historik" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="co2history"
										onChange={props.onChange}
										checked={checkboxStates['co2history'] ? true : false}
										inputProps={{ 'aria-labelledby': 11 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
							<ListItem key={12} button>
								<ListItemText id={12} primary="Anbefalet min." />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="co2anbmin"
										onChange={props.onChange}
										checked={checkboxStates['co2anbmin'] ? true : false}
										inputProps={{ 'aria-labelledby': 12 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
							<ListItem key={13} button>
								<ListItemText id={13} primary="Anbefalet maks" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="co2anbmax"
										onChange={props.onChange}
										checked={checkboxStates['co2anbmax'] ? true : false}
										inputProps={{ 'aria-labelledby': 13 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
							<ListItem key={14} button>
								<ListItemText id={14} primary="Gennemsnit for bygningen" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="co2avgbuilding"
										onChange={props.onChange}
										checked={checkboxStates['co2avgbuilding'] ? true : false}
										inputProps={{ 'aria-labelledby': 14 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
						</Collapse>

						<ListItem key={30} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={31} primary="Luftfugtighed" onClick={toogleHumidityopen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toogleHumidityopen}>
									{humidityopen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={humidityopen} timeout="auto" unmountOnExit>
							<ListItem key={32} button>
								<ListItemText id={32} primary="Historik" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="humidityhistory"
										onChange={props.onChange}
										checked={checkboxStates['humidityhistory'] ? true : false}
										inputProps={{ 'aria-labelledby': 32 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
							<ListItem key={33} button>
								<ListItemText id={33} primary="Gennemsnit for bygningen" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="humidityavgbuilding"
										onChange={props.onChange}
										checked={checkboxStates['humidityavgbuilding'] ? true : false}
										inputProps={{ 'aria-labelledby': 33 }}
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
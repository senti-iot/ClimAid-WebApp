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
	const [batteryopen, setBatteryopen] = useState(false);
	const [noisePeakopen, setNoisePeakopen] = useState(false);
	const [popoverWidth, setPopoverWidth] = useState(310);
	const checkboxStates = props.checkboxStates;
	const rooms = props.rooms;

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
		if (checkboxStates['batteryhistory']) {
			setBatteryopen(true);
		}
		if (checkboxStates['noisePeakhistory']) {
			setBatteryopen(true);
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

	const toogleBatteryopen = () => {
		setBatteryopen(batteryopen ? false : true);
	}

	const toogleNoisePeakopen = () => {
		setNoisePeakopen(noisePeakopen ? false : true);
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
						maxHeight: 600
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

							{rooms.map(room => {
								return (<ListItem key={room.uuid} button>
									<ListItemText id={room.uuid} primary={room.name} />
									<ListItemSecondaryAction>
										<Checkbox
											edge="end"
											value={room.uuid}
											onChange={props.onTemperatureRoomChange}
											checked={checkboxStates['temphistoryrooms'][room.uuid] ? true : false}
											inputProps={{ 'aria-labelledby': 1 }}
										/>
									</ListItemSecondaryAction>
								</ListItem>);
							})}
						</Collapse>

						<ListItem key={20} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={10} primary="CO2 koncentration" onClick={toogleCo2open} />
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

							{rooms.map(room => {
								return (<ListItem key={room.uuid} button>
									<ListItemText id={room.uuid} primary={room.name} />
									<ListItemSecondaryAction>
										<Checkbox
											edge="end"
											value={room.uuid}
											onChange={props.onCo2RoomChange}
											checked={checkboxStates['co2historyrooms'][room.uuid] ? true : false}
											inputProps={{ 'aria-labelledby': 1 }}
										/>
									</ListItemSecondaryAction>
								</ListItem>);
							})}
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

							{rooms.map(room => {
								return (<ListItem key={room.uuid} button>
									<ListItemText id={room.uuid} primary={room.name} />
									<ListItemSecondaryAction>
										<Checkbox
											edge="end"
											value={room.uuid}
											onChange={props.onHumidityRoomChange}
											checked={checkboxStates['humidityhistoryrooms'][room.uuid] ? true : false}
											inputProps={{ 'aria-labelledby': 1 }}
										/>
									</ListItemSecondaryAction>
								</ListItem>);
							})}
						</Collapse>

						<ListItem key={40} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={41} primary="Batteri" onClick={toogleBatteryopen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toogleBatteryopen}>
									{batteryopen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={batteryopen} timeout="auto" unmountOnExit>
							<ListItem key={42} button>
								<ListItemText id={42} primary="Historik" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="batteryhistory"
										onChange={props.onChange}
										checked={checkboxStates['batteryhistory'] ? true : false}
										inputProps={{ 'aria-labelledby': 42 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
							<ListItem key={43} button>
								<ListItemText id={43} primary="Gennemsnit for bygningen" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="batteryavgbuilding"
										onChange={props.onChange}
										checked={checkboxStates['batteryavgbuilding'] ? true : false}
										inputProps={{ 'aria-labelledby': 43 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>

							{rooms.map(room => {
								return (<ListItem key={room.uuid} button>
									<ListItemText id={room.uuid} primary={room.name} />
									<ListItemSecondaryAction>
										<Checkbox
											edge="end"
											value={room.uuid}
											onChange={props.onBatteryRoomChange}
											checked={checkboxStates['batteryhistoryrooms'][room.uuid] ? true : false}
											inputProps={{ 'aria-labelledby': 1 }}
										/>
									</ListItemSecondaryAction>
								</ListItem>);
							})}
						</Collapse>

						<ListItem key={50} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={51} primary="Lydmåling" onClick={toogleNoisePeakopen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toogleNoisePeakopen}>
									{noisePeakopen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={noisePeakopen} timeout="auto" unmountOnExit>
							<ListItem key={52} button>
								<ListItemText id={42} primary="Historik" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="noisepeakhistory"
										onChange={props.onChange}
										checked={checkboxStates['noisepeakhistory'] ? true : false}
										inputProps={{ 'aria-labelledby': 52 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
							<ListItem key={53} button>
								<ListItemText id={53} primary="Gennemsnit for bygningen" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="noisepeakavgbuilding"
										onChange={props.onChange}
										checked={checkboxStates['noisepeakavgbuilding'] ? true : false}
										inputProps={{ 'aria-labelledby': 53 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>

							{rooms.map(room => {
								return (<ListItem key={room.uuid} button>
									<ListItemText id={room.uuid} primary={room.name} />
									<ListItemSecondaryAction>
										<Checkbox
											edge="end"
											value={room.uuid}
											onChange={props.onNoisePeakRoomChange}
											checked={checkboxStates['noisepeakhistoryrooms'][room.uuid] ? true : false}
											inputProps={{ 'aria-labelledby': 1 }}
										/>
									</ListItemSecondaryAction>
								</ListItem>);
							})}
						</Collapse>

					</List>
				</>
			</Popover>
		</>
	)
}

export default ClimateDropdown;
import React, { useState, useEffect } from 'react';
import { Popover, Checkbox, List, ListItem, ListItemText, ListItemSecondaryAction, Collapse, Divider, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import roomStyles from 'Styles/roomStyles';

const ClimateOutDropdown = (props) => {
	const classes = roomStyles();
	const [anchorClimateEl, setAnchorClimateEl] = React.useState(null);
	const [temperatureOpen, setTemperatureOpen] = useState(false);
	const [airpressureOpen, setAirpressureOpen] = useState(false);
	const [humidityopen, setHumidityopen] = useState(false);
	const [batteryopen, setBatteryopen] = useState(false);
	const [luxopen, setLuxopen] = useState(false);
	const [mP1open, setmP1open] = useState(false);
	const [mP2open, setmP2open] = useState(false);
	const [mP4open, setmP4open] = useState(false);
	const [mPXopen, setmPXopen] = useState(false);
	const [nP0open, setnP0open] = useState(false);
	const [nP1open, setnP1open] = useState(false);
	const [nP2open, setnP2open] = useState(false);
	const [nP4open, setnP4open] = useState(false);
	const [nPXopen, setnPXopen] = useState(false);
	const [aPSopen, setaPSopen] = useState(false);
	const [popoverWidth, setPopoverWidth] = useState(310);
	const checkboxStates = props.checkboxStates;
	// const rooms = props.rooms;

	useEffect(() => {
		if (checkboxStates['temphistory'] || checkboxStates['tempanbmin'] || checkboxStates['tempanbmax']) {
			setTemperatureOpen(true);
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

	const toogleAirpressureOpen = () => {
		setAirpressureOpen(airpressureOpen ? false : true);
	}

	const toogleHumidityOpen = () => {
		setHumidityopen(humidityopen ? false : true);
	}

	const toogleBatteryopen = () => {
		setBatteryopen(batteryopen ? false : true);
	}

	const toogleLuxOpen = () => {
		setLuxopen(luxopen ? false : true);
	}

	const tooglemP1Open = () => {
		setmP1open(mP1open ? false : true);
	}

	const tooglemP2Open = () => {
		setmP2open(mP2open ? false : true);
	}

	const tooglemP4Open = () => {
		setmP4open(mP4open ? false : true);
	}

	const tooglemPXOpen = () => {
		setmPXopen(mPXopen ? false : true);
	}

	const tooglenP0Open = () => {
		setnP0open(nP0open ? false : true);
	}

	const tooglenP1Open = () => {
		setnP1open(nP1open ? false : true);
	}

	const tooglenP2Open = () => {
		setnP2open(nP2open ? false : true);
	}

	const tooglenP4Open = () => {
		setnP4open(nP4open ? false : true);
	}

	const tooglenPXOpen = () => {
		setnPXopen(nPXopen ? false : true);
	}

	const toogleaPSOpen = () => {
		setaPSopen(aPSopen ? false : true);
	}

	return (
		<>
			<List dense onClick={handleClimateMenuOpen}>
				<ListItem key={0} button className={classes.topDropdown}>
					<Button aria-controls="climate-out-menu" aria-haspopup="true" fullWidth={true} className={classes.topDropdownButton}>
						Udeklima
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
				id="climate-out-menu"
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
										value="temperature"
										onChange={props.onChange}
										checked={checkboxStates['climateout']['temperature'] ? true : false }
										inputProps={{ 'aria-labelledby': 1 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>


						</Collapse>

						<ListItem key={20} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={10} primary="Lufttryk" onClick={toogleAirpressureOpen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toogleAirpressureOpen}>
									{airpressureOpen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={airpressureOpen} timeout="auto" unmountOnExit>
							<ListItem key={11} button>
								<ListItemText id={11} primary="Historik" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="airpressure"
										onChange={props.onChange}
										checked={checkboxStates['climateout']['airpressure'] ? true : false}
										inputProps={{ 'aria-labelledby': 11 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>

						</Collapse>

						<ListItem key={230} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={231} primary="Luftfugtighed" onClick={toogleHumidityOpen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toogleHumidityOpen}>
									{humidityopen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={humidityopen} timeout="auto" unmountOnExit>
							<ListItem key={232} button>
								<ListItemText id={232} primary="Historik" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="humidity"
										onChange={props.onChange}
										checked={checkboxStates['climateout']['humidity'] ? true : false}
										inputProps={{ 'aria-labelledby': 232 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>

						</Collapse>

						<ListItem key={30} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={31} primary="Lysniveau" onClick={toogleLuxOpen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toogleLuxOpen}>
									{luxopen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={luxopen} timeout="auto" unmountOnExit>
							<ListItem key={32} button>
								<ListItemText id={32} primary="Historik" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="lux"
										onChange={props.onChange}
										checked={checkboxStates['climateout']['lux'] ? true : false}
										inputProps={{ 'aria-labelledby': 32 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>

						</Collapse>

						<ListItem key={40} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={41} primary="Batteriniveau" onClick={toogleBatteryopen} />
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
										value="battery"
										onChange={props.onChange}
										checked={checkboxStates['climateout']['battery'] ? true : false}
										inputProps={{ 'aria-labelledby': 42 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>


						</Collapse>

						<ListItem key={50} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={51} primary="PM1 Massekoncentration" onClick={tooglemP1Open} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={tooglemP1Open}>
									{mP1open ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={mP1open} timeout="auto" unmountOnExit>
							<ListItem key={52} button>
								<ListItemText id={52} primary="Historik" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="mP1"
										onChange={props.onChange}
										checked={checkboxStates['climateout']['mP1'] ? true : false}
										inputProps={{ 'aria-labelledby': 52 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
						</Collapse>

						<ListItem key={60} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={61} primary="PM2.5 Massekoncentration" onClick={tooglemP2Open} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={tooglemP2Open}>
									{mP2open ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={mP2open} timeout="auto" unmountOnExit>
							<ListItem key={62} button>
								<ListItemText id={62} primary="Historik" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="mP2"
										onChange={props.onChange}
										checked={checkboxStates['climateout']['mP2'] ? true : false}
										inputProps={{ 'aria-labelledby': 62 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
						</Collapse>

						<ListItem key={70} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={71} primary="PM4 Massekoncentration" onClick={tooglemP4Open} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={tooglemP4Open}>
									{mP4open ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={mP4open} timeout="auto" unmountOnExit>
							<ListItem key={72} button>
								<ListItemText id={72} primary="Historik" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="mP4"
										onChange={props.onChange}
										checked={checkboxStates['climateout']['mP4'] ? true : false}
										inputProps={{ 'aria-labelledby': 72 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
						</Collapse>

						<ListItem key={80} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={81} primary="PM10 Massekoncentration" onClick={tooglemPXOpen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={tooglemPXOpen}>
									{mPXopen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={mPXopen} timeout="auto" unmountOnExit>
							<ListItem key={82} button>
								<ListItemText id={82} primary="Historik" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="mPX"
										onChange={props.onChange}
										checked={checkboxStates['climateout']['mPX'] ? true : false}
										inputProps={{ 'aria-labelledby': 82 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
						</Collapse>

						<ListItem key={90} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={91} primary="PM0.5 Antal" onClick={tooglenP0Open} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={tooglenP0Open}>
									{nP1open ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={nP1open} timeout="auto" unmountOnExit>
							<ListItem key={92} button>
								<ListItemText id={92} primary="Historik" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="nP0"
										onChange={props.onChange}
										checked={checkboxStates['climateout']['nP0'] ? true : false}
										inputProps={{ 'aria-labelledby': 92 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
						</Collapse>

						<ListItem key={100} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={101} primary="PM1 Antal" onClick={tooglenP1Open} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={tooglenP1Open}>
									{nP1open ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={nP1open} timeout="auto" unmountOnExit>
							<ListItem key={102} button>
								<ListItemText id={102} primary="Historik" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="nP1"
										onChange={props.onChange}
										checked={checkboxStates['climateout']['nP1'] ? true : false}
										inputProps={{ 'aria-labelledby': 102 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
						</Collapse>

						<ListItem key={110} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={111} primary="PM2.5 Antal" onClick={tooglenP2Open} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={tooglenP2Open}>
									{nP2open ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={nP2open} timeout="auto" unmountOnExit>
							<ListItem key={112} button>
								<ListItemText id={112} primary="Historik" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="nP2"
										onChange={props.onChange}
										checked={checkboxStates['climateout']['nP2'] ? true : false}
										inputProps={{ 'aria-labelledby': 112 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
						</Collapse>

						<ListItem key={120} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={121} primary="PM4 Antal" onClick={tooglenP4Open} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={tooglenP4Open}>
									{nP4open ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={nP4open} timeout="auto" unmountOnExit>
							<ListItem key={122} button>
								<ListItemText id={122} primary="Historik" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="nP4"
										onChange={props.onChange}
										checked={checkboxStates['climateout']['nP4'] ? true : false}
										inputProps={{ 'aria-labelledby': 122 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
						</Collapse>

						<ListItem key={140} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={141} primary="PM1 Antal" onClick={tooglenPXOpen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={tooglenPXOpen}>
									{nPXopen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={nPXopen} timeout="auto" unmountOnExit>
							<ListItem key={142} button>
								<ListItemText id={142} primary="Historik" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="nPX"
										onChange={props.onChange}
										checked={checkboxStates['climateout']['nPX'] ? true : false}
										inputProps={{ 'aria-labelledby': 142 }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
						</Collapse>

						<ListItem key={150} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={151} primary="Gennemsnits partikelstørrelse" onClick={toogleaPSOpen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toogleaPSOpen}>
									{aPSopen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={aPSopen} timeout="auto" unmountOnExit>
							<ListItem key={152} button>
								<ListItemText id={152} primary="Historik" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="aPS"
										onChange={props.onChange}
										checked={checkboxStates['climateout']['aPS'] ? true : false}
										inputProps={{ 'aria-labelledby': 152 }}
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

export default ClimateOutDropdown;
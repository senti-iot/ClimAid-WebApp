import React, { useState, useEffect } from 'react';
import { Popover, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider, Collapse, Checkbox } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import roomStyles from 'Styles/roomStyles';

const UserExperienceDropdown = (props) => {
	const classes = roomStyles();
	const [popoverWidth, setPopoverWidth] = useState(310);
	const [anchorUserExperienceEl, setAnchorUserExperienceEl] = React.useState(null);
	const [tooColdOpen, setTooColdOpen] = useState(false);
	const [tooWarmOpen, setTooWarmOpen] = useState(false);
	const [windyOpen, setWindyOpen] = useState(false);
	const [heavyAirOpen, setHeavyAirOpen] = useState(false);
	const [concentrationOpen, setConcentrationOpen] = useState(false);
	const [tiredOpen, setTiredOpen] = useState(false);
	const [itchyEyesOpen, setItchyEyesOpen] = useState(false);
	const [lightingOpen, setLightingOpen] = useState(false);
	const [blindedOpen, setBlindedOpen] = useState(false);
	const [noisyOpen, setNoisyOpen] = useState(false);
	const checkboxStates = props.checkboxStates;
	const rooms = props.rooms;

	useEffect(() => {
		if (checkboxStates['userexperience']['warm']) {
			setTooWarmOpen(true);
		}
		if (checkboxStates['userexperience']['cold']) {
			setTooColdOpen(true);
		}
		if (checkboxStates['userexperience']['windy']) {
			setWindyOpen(true);
		}
		if (checkboxStates['userexperience']['heavyair']) {
			setHeavyAirOpen(true);
		}
		if (checkboxStates['userexperience']['concentration']) {
			setConcentrationOpen(true);
		}
		if (checkboxStates['userexperience']['tired']) {
			setTiredOpen(true);
		}
		if (checkboxStates['userexperience']['itchyeyes']) {
			setItchyEyesOpen(true);
		}
		if (checkboxStates['userexperience']['lighting']) {
			setLightingOpen(true);
		}
		if (checkboxStates['userexperience']['blinded']) {
			setBlindedOpen(true);
		}
		if (checkboxStates['userexperience']['noisy']) {
			setNoisyOpen(true);
		}
	}, [checkboxStates]);

	const handleUserExperienceMenuOpen = event => {
		setPopoverWidth(event.currentTarget.offsetWidth);
		setAnchorUserExperienceEl(event.currentTarget);
	};

	const handleUserExperienceMenuClose = () => {
		setAnchorUserExperienceEl(null);
	};

	const toogleTooColdOpen = () => {
		setTooColdOpen(tooColdOpen ? false : true);
	};

	const toogleTooWarmOpen = () => {
		setTooWarmOpen(tooWarmOpen ? false : true);
	};

	const toogleWindyOpen = () => {
		setWindyOpen(windyOpen ? false : true);
	};

	const toogleHeavyAirOpen = () => {
		setHeavyAirOpen(heavyAirOpen ? false : true);
	};

	const toogleConcentrationOpen = () => {
		setConcentrationOpen(concentrationOpen ? false : true);
	};

	const toogleTiredOpen = () => {
		setTiredOpen(tiredOpen ? false : true);
	};

	const toogleItchyEyesOpen = () => {
		setItchyEyesOpen(itchyEyesOpen ? false : true);
	};

	const toogleLightingOpen = () => {
		setLightingOpen(lightingOpen ? false : true);
	};

	const toogleBlindedOpen = () => {
		setBlindedOpen(blindedOpen ? false : true);
	};

	const toogleNoisyOpen = () => {
		setNoisyOpen(noisyOpen ? false : true);
	};

	return (
		<>
			<List dense onClick={handleUserExperienceMenuOpen}>
				<ListItem key={0} button className={classes.topDropdown}>
					<Button aria-controls="climate-menu" aria-haspopup="true" fullWidth={true} className={classes.topDropdownButton}>
						Brugeroplevelse
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
				anchorEl={anchorUserExperienceEl}
				keepMounted
				open={Boolean(anchorUserExperienceEl)}
				onClose={handleUserExperienceMenuClose}
			>
				<>
					<List dense className={classes.root}>
						<ListItem key={0} button style={{ backgroundColor: '#eee' }} >
							<ListItemText id={0} primary="For varmt" onClick={toogleTooWarmOpen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toogleTooWarmOpen}>
									{tooWarmOpen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={tooWarmOpen} timeout="auto" unmountOnExit>
							<ListItem key={1} button>
								<ListItemText id={1} primary="Total for bygningen" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="warm"
										onChange={props.onChange}
										checked={checkboxStates['userexperience']['warm'] ? true : false}
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
											value={"warm_" + room.uuid}
											onChange={props.onChange}
											checked={checkboxStates['userexperience']['warm_' + room.uuid] ? true : false}
											inputProps={{ 'aria-labelledby': 1 }}
										/>
									</ListItemSecondaryAction>
								</ListItem>);
							})}
						</Collapse>

						<ListItem key={110} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={10} primary="For koldt" onClick={toogleTooColdOpen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toogleTooColdOpen}>
									{tooColdOpen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={tooColdOpen} timeout="auto" unmountOnExit>
							<ListItem key={11} button>
								<ListItemText id={11} primary="Total for bygningen" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="cold"
										onChange={props.onChange}
										checked={checkboxStates['userexperience']['cold'] ? true : false}
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
											value={"cold_" + room.uuid}
											onChange={props.onChange}
											//checked={checkboxStates['temphistory'] ? true : false}
											inputProps={{ 'aria-labelledby': 1 }}
										/>
									</ListItemSecondaryAction>
								</ListItem>);
							})}
						</Collapse>


						<ListItem key={30} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={10} primary="Træk" onClick={toogleWindyOpen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toogleWindyOpen}>
									{windyOpen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={windyOpen} timeout="auto" unmountOnExit>
							<ListItem key={11} button>
								<ListItemText id={11} primary="Total for bygningen" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="windy"
										onChange={props.onChange}
										checked={checkboxStates['userexperience']['windy'] ? true : false}
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
											value={"windy_" + room.uuid}
											onChange={props.onChange}
											//checked={checkboxStates['temphistory'] ? true : false}
											inputProps={{ 'aria-labelledby': 1 }}
										/>
									</ListItemSecondaryAction>
								</ListItem>);
							})}
						</Collapse>

						<ListItem key={40} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={10} primary="Tung luft" onClick={toogleHeavyAirOpen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toogleHeavyAirOpen}>
									{heavyAirOpen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={heavyAirOpen} timeout="auto" unmountOnExit>
							<ListItem key={11} button>
								<ListItemText id={11} primary="Total for bygningen" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="heavyair"
										onChange={props.onChange}
										checked={checkboxStates['userexperience']['heavyair'] ? true : false}
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
											value={"heavyair_" + room.uuid}
											onChange={props.onChange}
											//checked={checkboxStates['temphistory'] ? true : false}
											inputProps={{ 'aria-labelledby': 1 }}
										/>
									</ListItemSecondaryAction>
								</ListItem>);
							})}
						</Collapse>

						<ListItem key={50} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={10} primary="Koncentrationsbesvær" onClick={toogleConcentrationOpen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toogleConcentrationOpen}>
									{concentrationOpen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={concentrationOpen} timeout="auto" unmountOnExit>
							<ListItem key={11} button>
								<ListItemText id={11} primary="Total for bygningen" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="concentration"
										onChange={props.onChange}
										checked={checkboxStates['userexperience']['concentration'] ? true : false}
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
											value={"concentration_" + room.uuid}
											onChange={props.onChange}
											//checked={checkboxStates['temphistory'] ? true : false}
											inputProps={{ 'aria-labelledby': 1 }}
										/>
									</ListItemSecondaryAction>
								</ListItem>);
							})}
						</Collapse>

						<ListItem key={60} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={10} primary="Træthed" onClick={toogleTiredOpen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toogleTiredOpen}>
									{tiredOpen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={tiredOpen} timeout="auto" unmountOnExit>
							<ListItem key={11} button>
								<ListItemText id={11} primary="Total for bygningen" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="tired"
										onChange={props.onChange}
										checked={checkboxStates['userexperience']['tired'] ? true : false}
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
											value={"tired_" + room.uuid}
											onChange={props.onChange}
											//checked={checkboxStates['temphistory'] ? true : false}
											inputProps={{ 'aria-labelledby': 1 }}
										/>
									</ListItemSecondaryAction>
								</ListItem>);
							})}
						</Collapse>

						<ListItem key={70} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={10} primary="Tørre øjne og næse" onClick={toogleItchyEyesOpen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toogleItchyEyesOpen}>
									{itchyEyesOpen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={itchyEyesOpen} timeout="auto" unmountOnExit>
							<ListItem key={11} button>
								<ListItemText id={11} primary="Total for bygningen" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="itchyeyes"
										onChange={props.onChange}
										checked={checkboxStates['userexperience']['itchyeyes'] ? true : false}
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
											value={"itchyeyes_" + room.uuid}
											onChange={props.onChange}
											//checked={checkboxStates['temphistory'] ? true : false}
											inputProps={{ 'aria-labelledby': 1 }}
										/>
									</ListItemSecondaryAction>
								</ListItem>);
							})}
						</Collapse>

						<ListItem key={80} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={10} primary="Dårlig belysning" onClick={toogleLightingOpen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toogleLightingOpen}>
									{lightingOpen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={lightingOpen} timeout="auto" unmountOnExit>
							<ListItem key={11} button>
								<ListItemText id={11} primary="Total for bygningen" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="lighting"
										onChange={props.onChange}
										checked={checkboxStates['userexperience']['lighting'] ? true : false}
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
											value={"lighting_" + room.uuid}
											onChange={props.onChange}
											//checked={checkboxStates['temphistory'] ? true : false}
											inputProps={{ 'aria-labelledby': 1 }}
										/>
									</ListItemSecondaryAction>
								</ListItem>);
							})}
						</Collapse>

						<ListItem key={90} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={10} primary="Blænding" onClick={toogleBlindedOpen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toogleBlindedOpen}>
									{blindedOpen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={blindedOpen} timeout="auto" unmountOnExit>
							<ListItem key={11} button>
								<ListItemText id={11} primary="Total for bygningen" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="blinded"
										onChange={props.onChange}
										checked={checkboxStates['userexperience']['blinded'] ? true : false}
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
											value={"blinded_" + room.uuid}
											onChange={props.onChange}
											//checked={checkboxStates['temphistory'] ? true : false}
											inputProps={{ 'aria-labelledby': 1 }}
										/>
									</ListItemSecondaryAction>
								</ListItem>);
							})}
						</Collapse>

						<ListItem key={100} button style={{ backgroundColor: '#eee' }}>
							<ListItemText id={10} primary="Støj" onClick={toogleNoisyOpen} />
							<ListItemSecondaryAction>
								<IconButton edge="end" onClick={toogleNoisyOpen}>
									{noisyOpen ? <RemoveIcon /> : <AddIcon />}
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />

						<Collapse in={noisyOpen} timeout="auto" unmountOnExit>
							<ListItem key={11} button>
								<ListItemText id={11} primary="Total for bygningen" />
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										value="noisy"
										onChange={props.onChange}
										checked={checkboxStates['userexperience']['noisy'] ? true : false}
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
											value={"noisy_" + room.uuid}
											onChange={props.onChange}
											//checked={checkboxStates['temphistory'] ? true : false}
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
	);
};

export default UserExperienceDropdown;
import React, { useState } from 'react';
import { Popover, Radio, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import roomStyles from 'Styles/roomStyles';

const RoomComfortDropdown = (props) => {
	const classes = roomStyles();
	const [anchorClimateEl, setAnchorClimateEl] = React.useState(null);
	const currentMeassurement = props.currentMeassurement;
	const [popoverWidth, setPopoverWidth] = useState(310);

	const handleClimateMenuOpen = event => {
		setPopoverWidth(event.currentTarget.offsetWidth);
		setAnchorClimateEl(event.currentTarget);
	};

	const handleClimateMenuClose = () => {
		setAnchorClimateEl(null);
	};

	const _onChange = (e) => {
		handleClimateMenuClose();
		props.onChange(e.target.value);
	}

	return (
		<>
			<List dense onClick={handleClimateMenuOpen}>
				<ListItem key={0} button className={classes.topDropdown}>
					<Button aria-controls="climate-menu" aria-haspopup="true" fullWidth={true} className={classes.topDropdownButton}>
						Målinger
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
				id="measseaure-menu"
				anchorEl={anchorClimateEl}
				keepMounted
				open={Boolean(anchorClimateEl)}
				onClose={handleClimateMenuClose}
			>
				<>
					<List dense className={classes.root}>
						<ListItem key={1}>
							<ListItemText id={1} primary="Temperatur [°C]" />
							<ListItemSecondaryAction>
								<Radio
									edge="end"
									value="temperature"
									onChange={_onChange}
									checked={currentMeassurement === 'temperature' ? true : false}
									inputProps={{ 'aria-labelledby': 1 }}
								/>
							</ListItemSecondaryAction>
						</ListItem>

						<ListItem key={2}>
							<ListItemText id={2} primary="Luftkvalitet [ppm]" />
							<ListItemSecondaryAction>
								<Radio
									edge="end"
									value="co2"
									onChange={_onChange}
									checked={currentMeassurement === 'co2' ? true : false}
									inputProps={{ 'aria-labelledby': 2 }}
								/>
							</ListItemSecondaryAction>
						</ListItem>

						<ListItem key={3}>
							<ListItemText id={3} primary="Luftfugtighed [%]" />
							<ListItemSecondaryAction>
								<Radio
									edge="end"
									value="humidity"
									onChange={_onChange}
									checked={currentMeassurement === 'humidity' ? true : false}
									inputProps={{ 'aria-labelledby': 3 }}
								/>
							</ListItemSecondaryAction>
						</ListItem>

						<ListItem key={4}>
							<ListItemText id={4} primary="VOC [ppb]" />
							<ListItemSecondaryAction>
								<Radio
									edge="end"
									value="voc"
									onChange={_onChange}
									checked={currentMeassurement === 'voc' ? true : false}
									inputProps={{ 'aria-labelledby': 4 }}
								/>
							</ListItemSecondaryAction>
						</ListItem>

						<ListItem key={5}>
							<ListItemText id={5} primary="Lydniveau [dB]" />
							<ListItemSecondaryAction>
								<Radio
									edge="end"
									value="noisePeak"
									onChange={_onChange}
									checked={currentMeassurement === 'noisePeak' ? true : false}
									inputProps={{ 'aria-labelledby': 5 }}
								/>
							</ListItemSecondaryAction>
						</ListItem>

						<ListItem key={6}>
							<ListItemText id={6} primary="Lysniveau [lx]" />
							<ListItemSecondaryAction>
								<Radio
									edge="end"
									value="light"
									onChange={_onChange}
									checked={currentMeassurement === 'light' ? true : false}
									inputProps={{ 'aria-labelledby': 6 }}
								/>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
				</>
			</Popover>
		</>
	)
}

export default RoomComfortDropdown;

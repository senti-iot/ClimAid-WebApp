import React, { useState, useEffect } from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

const AdminDeviceGaugeDialog = (props) => {
	const [type, setType] = useState('');
	const [period, setPeriod] = useState('hour');
	const [func, setFunc] = useState('57');
	const [maxValue, setMaxValue] = useState('');
	const [minValue, setMinValue] = useState('');
	const [segments, setSegments] = useState('5');
	const [topLabel, setTopLabel] = useState('');
	const [unitLabel, setUnitLabel] = useState('');

	const handleSave = () => {
		let gauge = {};

		if (!props.data || typeof props.data === 'undefined') {
			gauge.uuid = uuidv4();
		} else {
			gauge = props.data;
		}

		gauge.type = type;
		gauge.period = period;
		gauge.function = func ? parseInt(func) : 57;
		gauge.maxValue = maxValue ? parseInt(maxValue) : 0;
		gauge.minValue = minValue ? parseInt(minValue) : 0;
		gauge.segments = segments ? parseInt(segments) : 5;
		gauge.topLabel = topLabel;
		gauge.unitLabel = unitLabel;

		props.save(gauge);
	}

	useEffect(() => {
		if (props.data && typeof props.data !== 'undefined') {
			setType(props.data.type);
			setPeriod(props.data.period);
			setFunc(props.data.function);
			setMaxValue(props.data.maxValue);
			setMinValue(props.data.minValue);
			setSegments(props.data.segments);
			setTopLabel(props.data.topLabel);
			setUnitLabel(props.data.unitLabel);
		}
	}, [props.data]);

	return (
		<Dialog
			disableBackdropClick
			disableEscapeKeyDown
			open={props.showAddGaugeDialog}
		>
			<DialogTitle>Tilføj måler</DialogTitle>
			<DialogContent dividers>
				<Grid container justify={'flex-start'} spacing={0}>
					<form>
						<Grid item xs={12} style={{ marginTop: 20 }}>
							<FormControl variant="outlined">
								<InputLabel id="type-select-helper-label">Type</InputLabel>
								<Select
									id="type"
									labelId="type-select-helper-label"
									label="Type"
									value={type}
									onChange={(e) => setType(e.target.value)}
								>
									<MenuItem value="temperature">Temperatur</MenuItem>
									<MenuItem value="co2">CO2</MenuItem>
									<MenuItem value="humidity">Luftfugtighed</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="period"
								label="Periode"
								value={period}
								margin='normal'
								variant='outlined'
								onChange={(e) => setPeriod(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="function"
								label="Funktion"
								value={func}
								margin='normal'
								variant='outlined'
								onChange={(e) => setFunc(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="maxValue"
								label="Max værdi"
								value={maxValue}
								margin='normal'
								variant='outlined'
								onChange={(e) => setMaxValue(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="minValue"
								label="Min. værdi"
								value={minValue}
								margin='normal'
								variant='outlined'
								onChange={(e) => setMinValue(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="segments"
								label="Segmenter"
								value={segments}
								margin='normal'
								variant='outlined'
								onChange={(e) => setSegments(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="topLabel"
								label="Tekst"
								value={topLabel}
								margin='normal'
								variant='outlined'
								onChange={(e) => setTopLabel(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="unitLabel"
								label="Enhed"
								value={unitLabel}
								margin='normal'
								variant='outlined'
								onChange={(e) => setUnitLabel(e.target.value)}
							/>
						</Grid>
					</form>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={props.handleDialogCancel} color="primary">
					Annullér
        			</Button>
				<Button onClick={() => handleSave()} color="primary">
					Gem
       				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AdminDeviceGaugeDialog;
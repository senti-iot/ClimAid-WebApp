import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper, TextField, Button, ButtonGroup, MenuItem } from '@material-ui/core';

import { getBuildings, getBuilding } from 'data/climaid';
import adminStyles from 'Styles/adminStyles';
import CircularLoader from 'Components/Loaders/CircularLoader';

const AdminZonesAdd = props => {
	const { uuid } = useParams();
	const classes = adminStyles();
	const [loading, setLoading] = useState(true);

	const [buildings, setBuingings] = useState(null);
	const [building, setBuilding] = useState('');
	const [buildingError, setBuildingError] = useState('');
	const [name, setName] = useState('');
	const [nameError, setNameError] = useState('');
	const [address, setAddress] = useState('');
	const [addressError, setAddressError] = useState('');
	const [size, setSize] = useState('');
	const [sizeError, setSizeError] = useState('');
	const [primaryFunction, setPrimaryFunction] = useState('');
	const [primaryFunctionError, setPrimaryFunctionError] = useState('');

	const primaryFunctionOptions = ['Kontor', 'Undervisning', 'Kantine', 'Mødelokale', 'Lager', 'Køkken'];

	useEffect(() => {
		async function fetchData() {

			const buildingsData = await getBuildings();

			if (buildingsData) {
				setBuingings(buildingsData);
			}

			if (uuid !== 'undefined') {
				const buildingData = await getBuilding(uuid);
				if (buildingData) {
					setBuilding(buildingData.uuid);
					setAddress(buildingData.address);
				}
			}

			setLoading(false);
		}

		fetchData();
	}, [uuid]);

	const handleBuildingChange = event => {
		setBuilding(event.target.value);
	};

	const handleCancel = () => {
		props.history.goBack();
	};

	const handleNext = () => {
		let isOK = true;

		setBuildingError('');
		setNameError('');
		setAddressError('');
		setSizeError('');
		setPrimaryFunctionError('');

		if (!building.length) {
			setBuildingError('Du skal vælge en bygning');
			isOK = false;
		} else if (!name.length) {
			setNameError('Du skal indtaste et navn på zonen');
			isOK = false;
		} else if (!address.length) {
			setAddressError('Du skal indtaste en adresse på zonen');
			isOK = false;
		} else if (!size.length) {
			setSizeError('Du skal indtaste en størrelse på zonen');
			isOK = false;
		} else if (!primaryFunction.length) {
			setPrimaryFunctionError('Du skal vælge zone type');
			isOK = false;
		}

		if (isOK) {
			const data = { building: building, name: name, address: address, size: size, primaryFunction: primaryFunction };

			props.history.push('/administration/zones/add/levels', data);
		}
	};

	return (
		!loading ? (
			<Paper elevation={3} className={classes.adminPaperContainer}>
				<div className={classes.adminHeader}>Zone oprettelse</div>

				<Grid container justify={'flex-start'} spacing={0}>
					<form>
						<Grid item xs={12} style={{ marginTop: 20 }}>
							<TextField
								select
								id="select-building"
								label="Tilknyt bygning"
								value={building}
								onChange={handleBuildingChange}
								className={classes.selectField}
								error={buildingError.length ? true : false}
								helperText={buildingError}
							>
								{buildings.map(b => {
									return <MenuItem key={b.uuid} value={b.uuid}>{b.name}</MenuItem>;
								})}
							</TextField>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id={'name'}
								label='Navn'
								value={name}
								onChange={(e) => setName(e.target.value)}
								margin='normal'
								variant='outlined'
								error={nameError.length ? true : false}
								helperText={nameError}
								className={classes.textField}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id={'name'}
								label='Adresse'
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								margin='normal'
								variant='outlined'
								error={addressError.length ? true : false}
								helperText={addressError}
								className={classes.textField}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id={'size'}
								label='Størrelse'
								value={size}
								onChange={(e) => setSize(e.target.value)}
								margin='normal'
								variant='outlined'
								error={sizeError.length ? true : false}
								helperText={sizeError}
								className={classes.textField}
							/>
						</Grid>
						<Grid item xs={12} style={{ marginTop: 15 }}>
							<TextField
								id="primaryfunction"
								select
								label="Zone type"
								value={primaryFunction}
								onChange={(e) => setPrimaryFunction(e.target.value)}
								error={primaryFunctionError.length ? true : false}
								helperText={primaryFunctionError}
								variant="outlined"
								className={classes.textField}
							>
								{primaryFunctionOptions.map((option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
							</TextField>
						</Grid>
					</form>
					<Grid item xs={12} style={{ marginTop: 40 }}>
						<Grid container>
							<Grid container item xs={12} justify="flex-end">
								<ButtonGroup variant="contained" color="primary">
									<Button onClick={handleCancel}>Annuller</Button>
									<Button onClick={handleNext}>Næste</Button>
								</ButtonGroup>
							</Grid>
						</Grid>

					</Grid>
				</Grid>
			</Paper>
		) : (
			<CircularLoader fill />
		)
	);
}

export default AdminZonesAdd;
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableRow, TableCell, Typography } from '@material-ui/core';

import adminStyles from 'Styles/adminStyles';
import CircularLoader from 'Components/Loaders/CircularLoader';
import { getBuildings, getRooms, getDevices } from 'data/climaid';
import { getUsers, getLoggedInUser } from 'data/users';

const AdminInfobox = () => {
	const classes = adminStyles();

	const [loading, setLoading] = useState(true);
	const [buildings, setBuildings] = useState(null);
	const [rooms, setRooms] = useState(null);
	const [devices, setDevices] = useState(null);
	const [user, setUser] = useState(null);
	const [users, setUsers] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const buildingData = await getBuildings();
			if (buildingData) {
				setBuildings(buildingData.length);
			}

			const roomsData = await getRooms();
			if (roomsData) {
				setRooms(roomsData.length);
			}

			const devicesData = await getDevices();
			if (devicesData) {
				setDevices(devicesData.length);
			}

			const usersData = await getUsers();
			if (usersData) {
				setUsers(usersData.length);
			}

			const userData = await getLoggedInUser();

			if (userData) {
				setUser(userData);
			}

			setLoading(false);
		}

		fetchData();
	}, []);

	return (
		<>
			{!loading ?
				<>
					<Typography variant="h4" style={{ textAlign: 'center', color: '#007178', marginBottom: 50 }}>{user && user.org ? user.org.name : ""}</Typography>
					<Table className={classes.table} aria-label="infobox table" style={{ boxShadow: "none" }}>
						<TableBody>
							<TableRow key="row1" style={{ backgroundColor: '#f8fbfb', height: 60 }}>
								<TableCell style={{ borderBottom: "none" }}>
									<Typography className={classes.infoboxLabel}>Antal brugere:</Typography>
								</TableCell>
								<TableCell style={{ borderBottom: "none", textAlign: 'right' }}>
									<Typography className={classes.infoboxValue}>{users ? users : ""}</Typography>
								</TableCell>
							</TableRow>
							<TableRow key="row2" style={{ backgroundColor: '#fff', height: 60 }}>
								<TableCell style={{ borderBottom: "none" }}>
									<Typography className={classes.infoboxLabel}>Antal administratorer:</Typography>
								</TableCell>
								<TableCell style={{ borderBottom: "none", textAlign: 'right' }}>
									<Typography className={classes.infoboxValue}>xxx</Typography>
								</TableCell>
							</TableRow>
							<TableRow key="row3" style={{ backgroundColor: '#f8fbfb', height: 60 }}>
								<TableCell style={{ borderBottom: "none" }}>
									<Typography className={classes.infoboxLabel}>Antal sensorer:</Typography>
								</TableCell>
								<TableCell style={{ borderBottom: "none", textAlign: 'right' }}>
									<Typography className={classes.infoboxValue}>{devices ? devices : ""}</Typography>
								</TableCell>
							</TableRow>
							{/* <TableRow key="row5" style={{ backgroundColor: '#fff', height: 60 }}>
								<TableCell style={{ borderBottom: "none" }}>
									<Typography className={classes.infoboxLabel}>Antal sensor typer:</Typography>
								</TableCell>
								<TableCell style={{ borderBottom: "none", textAlign: 'right' }}>
									<Typography className={classes.infoboxValue}>xxx</Typography>
								</TableCell>
							</TableRow> */}
							<TableRow key="row6" style={{ backgroundColor: '#fff', height: 60 }}>
								<TableCell style={{ borderBottom: "none" }}>
									<Typography className={classes.infoboxLabel}>Antal zoner:</Typography>
								</TableCell>
								<TableCell style={{ borderBottom: "none", textAlign: 'right' }}>
									<Typography className={classes.infoboxValue}>{rooms ? rooms : ""}</Typography>
								</TableCell>
							</TableRow>
							<TableRow key="row7" style={{ backgroundColor: '#f8fbfb', height: 60 }}>
								<TableCell style={{ borderBottom: "none" }}>
									<Typography className={classes.infoboxLabel}>Antal bygninger:</Typography>
								</TableCell>
								<TableCell style={{ borderBottom: "none", textAlign: 'right' }}>
									<Typography className={classes.infoboxValue}>{buildings ? buildings : ""}</Typography>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</>
				: <CircularLoader fill />}
		</>
	)
}

export default AdminInfobox;
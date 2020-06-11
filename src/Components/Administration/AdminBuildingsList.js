import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Grid, Paper, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListIcon from '@material-ui/icons/List';

import { Add } from 'variables/icons';
import { getBuildings, getRoomsInBuilding } from 'data/climaid';
import AdminMenu from './AdminMenu';
import adminStyles from 'Styles/adminStyles';
import CircularLoader from 'Components/Loaders/CircularLoader';

const AdminBuildingsList = (props) => {
	const [buildings, setBuildings] = useState(null);
	const [roomsData, setRoomsData] = useState({});
	const classes = adminStyles();
	const history = props.history;

	useEffect(() => {
		async function fetchData() {
			const data = await getBuildings();
			if (data) {
				let rd = {};

				await Promise.all(
					data.map(async (building) => {
						let rooms = await getRoomsInBuilding(building.uuid);
						if (rooms) {
							rd[building.uuid] = Object.keys(rooms).length;
						}
					})
				);

				setRoomsData(rd);
				setBuildings(data);
			}
		}

		fetchData();
	}, []);

	// const handleGoToBuilding = (uuid) => {
	// 	props.history.push('/administration/buildings/view/' + uuid);
	// }

	const confirmDelete = (uuid) => {

	}

	return (
		<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={3}>
			<Grid container item xs={3}>
				<Paper elevation={3} className={classes.adminPaperContainer}>
					<AdminMenu />
				</Paper>
			</Grid>
			<Grid container item xs={6}>
				<Paper elevation={3} className={classes.adminPaperContainer}>
					<h1 className={classes.adminHeader}>Bygninger</h1>

					<p>
						<Button
							variant="contained"
							color="primary"
							startIcon={<Add />}
							onClick={ () => history.push('/administration/buildings/add') }
						>
							Tilføj bygning
						</Button>
					</p>

					{buildings ?
						<TableContainer component={Paper}>
							<Table stickyHeader className={classes.table} aria-label="buildings table">
								<TableHead>
									<TableRow className={classes.tableRow}>
										<TableCell>Navn</TableCell>
										<TableCell>Antal lokaler</TableCell>
										<TableCell></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{buildings.map(building => (
										<TableRow hover key={building.uuid} className={classes.tableRow}>
											<TableCell>
												{building.name}
											</TableCell>
											<TableCell>
												{roomsData[building.uuid] ? roomsData[building.uuid] : ""}
											</TableCell>
											<TableCell align="right">
												<IconButton onClick={() => history.push('/administration/rooms/list/' + building.uuid)}>
													<ListIcon />
												</IconButton>
												<IconButton onClick={() => history.push('/administration/buildings/' + building.uuid + '/edit')}>
													<EditIcon />
												</IconButton>
												<IconButton onClick={() => confirmDelete(building.uuid)}>
													<DeleteIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						: <CircularLoader fill />}
				</Paper>
			</Grid>
			<Grid container item xs={3}>
				<Paper elevation={3} className={classes.adminPaperContainer}>
				</Paper>
			</Grid>
		</Grid >
	);
}

export default AdminBuildingsList;
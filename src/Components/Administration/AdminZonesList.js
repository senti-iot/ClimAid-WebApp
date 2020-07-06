import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
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

import { Add } from 'variables/icons';
import { getRooms, getRoomsInBuilding } from 'data/climaid';
import AdminMenu from './AdminMenu';
import adminStyles from 'Styles/adminStyles';
import CircularLoader from 'Components/Loaders/CircularLoader';

const AdminRoomsList = (props) => {
	const [rooms, setRooms] = useState(null);
	const classes = adminStyles();
	const history = props.history;
	const { uuid } = useParams();

	useEffect(() => {
		async function fetchData() {
			if (typeof uuid === 'undefined') {
				const data = await getRooms();
				if (data) {
					setRooms(data);
				}
			} else {
				let data = await getRoomsInBuilding(uuid);
				if (data) {
					setRooms(data);
				}
			}
		}

		fetchData();
	}, [uuid]);

	// const handleGoToRoom = (uuid) => {
	// 	props.history.push('/administration/rooms/view/' + uuid);
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
					<div className={classes.adminHeader}>Zoner</div>

					<p>
						<Button
							variant="contained"
							color="primary"
							startIcon={<Add />}
							onClick={() => history.push('/administration/zones/add/' + uuid)}
						>
							Tilføj zone
						</Button>
					</p>

					{rooms ? (
						!rooms.length ? <p>Der blev ikke fundet nogen zoner på denne bygning</p> : 
							<TableContainer component={Paper}>
								<Table stickyHeader className={classes.table} aria-label="buildings table">
									<TableHead>
										<TableRow className={classes.tableRow}>
											<TableCell>Navn</TableCell>
											<TableCell>Bygning</TableCell>
											<TableCell></TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{rooms.map(room => (
											<TableRow hover key={room.uuid} className={classes.tableRow}>
												<TableCell>
													{room.name}
												</TableCell>
												<TableCell>
													{room.building.name}
												</TableCell>
												<TableCell align="right">
													<IconButton onClick={() => history.push('/administration/rooms/' + room.uuid + '/edit')}>
														<EditIcon />
													</IconButton>
													<IconButton onClick={() => confirmDelete(room.uuid)}>
														<DeleteIcon />
													</IconButton>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
					) : (<CircularLoader fill />)}
				</Paper>
			</Grid>
			<Grid container item xs={3}>
				<Paper elevation={3} className={classes.adminPaperContainer}>
				</Paper>
			</Grid>
		</Grid >
	);
}

export default AdminRoomsList;
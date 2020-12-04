import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';

import { Add } from 'variables/icons';
import { getRooms, getRoomsInBuilding, deleteRoom } from 'data/climaid';
import adminStyles from 'Styles/adminStyles';
import CircularLoader from 'Components/Loaders/CircularLoader';

const AdminZonesList = (props) => {
	const [rooms, setRooms] = useState(null);
	const [selectedUuid, setSelectedUuid] = useState(null);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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

	const confirmDelete = (id) => {
		setSelectedUuid(id);
		setShowDeleteDialog(true);
	}

	const handleCancel = () => {
		setShowDeleteDialog(false);
	}

	const handleOk = async () => {
		const result = await deleteRoom(selectedUuid);
		if (result) {
			setShowDeleteDialog(false);
		}
	}

	return (
		<>
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
										<TableCell>Adresse</TableCell>
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
											<TableCell>
												{room.building.address}
											</TableCell>
											<TableCell align="right">
												<IconButton onClick={() => history.push('/administration/devices/' + room.uuid + '/list')}>
													<ListIcon />
												</IconButton>
												<IconButton onClick={() => history.push('/administration/zones/' + room.uuid + '/edit')}>
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
			<Dialog
				disableBackdropClick
				disableEscapeKeyDown
				maxWidth="xs"
				open={showDeleteDialog}
			>
				<DialogTitle>Dette vil slette zonen</DialogTitle>
				<DialogContent dividers>
					Er du sikker?
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleCancel} color="primary">
						Nej
        			</Button>
					<Button onClick={handleOk} color="primary">
						Ja
       				</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default AdminZonesList;
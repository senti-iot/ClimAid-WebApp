import React, { useEffect, useState } from 'react';
import { Paper, IconButton, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';

import { Add } from 'variables/icons';
import { getUsers, deleteUser } from 'data/users';
import adminStyles from 'Styles/adminStyles';
import CircularLoader from 'Components/Loaders/CircularLoader';
import ConfirmDialog from 'Components/Dialogs/ConfirmDialog';

const AdminUsersList = props => {
	const classes = adminStyles();
	const history = props.history;

	const [alertSuccess, setAlertSuccess] = useState(false);
	const [alertFail, setAlertFail] = useState(false);
	const [loading, setLoading] = useState(true);

	const [users, setUsers] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	useEffect(() => {
		async function fetchData() {
			let data = await getUsers();

			if (data) {
				setUsers(data);
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	const handleAlertSuccessClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlertSuccess(false);
	}

	const handleAlertFailClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlertFail(false);
	}

	const confirmDelete = (uuid) => {
		setSelectedUser(uuid);

		setShowDeleteDialog(true);
	}

	const handleHideDeleteDialog = () => {
		setSelectedUser(null);
		setShowDeleteDialog(false);
	}

	const doDeleteUser = async () => {
		const result = await deleteUser(selectedUser);

		if (result !== 200) {
			setAlertFail(true);
		} else {
			setAlertSuccess(true);
			setLoading(true);

			let data = await getUsers();

			if (data) {
				setUsers(data);
				setLoading(false);
			}
		}

		handleHideDeleteDialog();
	}

	return (
		<Paper elevation={3} className={classes.adminPaperContainer}>
			<div className={classes.adminHeader}>Brugere</div>

			<p>
				<Button
					variant="contained"
					color="primary"
					startIcon={<Add />}
					onClick={() => history.push('/administration/users/add/')}
				>
					Tilføj bruger
				</Button>
			</p>

			{!loading ? (
				<>
					<TableContainer component={Paper}>
						<Table stickyHeader className={classes.table} aria-label="user table">
							<TableHead>
								<TableRow className={classes.tableRow}>
									<TableCell>Navn</TableCell>
									<TableCell>E-mail</TableCell>
									<TableCell>Adgang</TableCell>
									<TableCell>Kontoaktivitet</TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{users.map(user => (
									<TableRow hover key={user.uuid} className={classes.tableRow}>
										<TableCell>
											{user.firstName} {user.lastName}
										</TableCell>
										<TableCell>
											{user.email}
										</TableCell>
										<TableCell>
											{user.role.name}
										</TableCell>
										<TableCell>
											{user.lastLoggedIn ? moment(user.lastLoggedIn).format('LLL') : "Aldrig logget ind"}
										</TableCell>
										<TableCell align="right">
											<IconButton onClick={() => history.push('/administration/users/' + user.uuid + '/edit')}>
												<EditIcon />
											</IconButton>
											<IconButton onClick={() => confirmDelete(user.uuid)}>
												<DeleteIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>

					<Snackbar open={alertSuccess} autoHideDuration={3000} onClose={handleAlertSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
						<Alert onClose={handleAlertSuccessClose} severity="success" elevation={6} variant="filled">Bruger slettet!</Alert>
					</Snackbar>
					<Snackbar open={alertFail} autoHideDuration={3000} onClose={handleAlertFailClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
						<Alert onClose={handleAlertFailClose} severity="error" elevation={6} variant="filled">Der opstod en fejl ved sletning af bruger!</Alert>
					</Snackbar>

					<ConfirmDialog visible={showDeleteDialog} title="Dette vil slette brugeren" message="Er du sikker?" handleCancel={handleHideDeleteDialog} handleOk={doDeleteUser} />
				</>
			) : (<CircularLoader fill />)}
		</Paper>
	)
}

export default AdminUsersList;

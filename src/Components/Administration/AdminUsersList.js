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

import { Add } from 'variables/icons';
import { getUser, getOrgUsers } from 'data/users';
import AdminMenu from './AdminMenu';
import adminStyles from 'Styles/adminStyles';
import CircularLoader from 'Components/Loaders/CircularLoader';

const AdminUsersList = props => {
	const [users, setUsers] = useState(null);
	const classes = adminStyles();
	const history = props.history;

	useEffect(() => {
		async function fetchData() {
			const user = await getUser();

			if (user.org) {
				let data = await getOrgUsers(user.org.uuid);
				if (data) {
				 	setUsers(data);
				}
			}
		}

		fetchData();
	}, []);

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

					{users ? (
						<TableContainer component={Paper}>
							<Table stickyHeader className={classes.table} aria-label="user table">
								<TableHead>
									<TableRow className={classes.tableRow}>
										<TableCell>Navn</TableCell>
										<TableCell>E-mail</TableCell>
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
					) : (<CircularLoader fill />)}
				</Paper>
			</Grid>
			<Grid container item xs={3}>
				<Paper elevation={3} className={classes.adminPaperContainer}>
				</Paper>
			</Grid>
		</Grid >
	)
}

export default AdminUsersList;

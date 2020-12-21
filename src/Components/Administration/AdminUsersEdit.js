
import React, { useState, useEffect } from 'react';
import { Paper, Grid, TextField, MenuItem, ButtonGroup, Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useParams } from 'react-router-dom';

import adminStyles from 'Styles/adminStyles';
import { getUserOrgs, getRoles, getUser, updateUser } from 'data/users';
import CircularLoader from 'Components/Loaders/CircularLoader';

const AdminUsersList = props => {
	const classes = adminStyles();
	const { uuid } = useParams();

	const [alertSuccess, setAlertSuccess] = useState(false);
	const [alertFail, setAlertFail] = useState(false);
	const [loading, setLoading] = useState(true);

	const [orgs, setOrgs] = useState([]);
	const [roles, setRoles] = useState([]);

	const [user, setUser] = useState(null);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [org, setOrg] = useState('');
	const [role, setRole] = useState('');

	const [firstNameError, setFirstNameError] = useState('');
	const [lastNameError, setLastNameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [orgError, setOrgError] = useState('');
	const [roleError, setRoleError] = useState('');

	useEffect(() => {
		async function fetchData() {

			let userData = await getUser(uuid);
			console.log(userData);
			if (userData) {
				setUser(userData);

				setFirstName(userData.firstName);
				setLastName(userData.lastName);
				setEmail(userData.email);
				setOrg(userData.org.uuid);
				setRole(userData.role.uuid);
			}

			const orgsData = await getUserOrgs();

			if (orgsData) {
				setOrgs(orgsData);
			}

			const rolesData = await getRoles();

			if (rolesData) {
				setRoles(rolesData);
			}

			setLoading(false);
		}

		fetchData();
	}, [uuid]);

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

	const handleCancel = () => {
		props.history.goBack();
	};

	const handleSave = async () => {
		let isOK = true;

		setFirstNameError('');
		setLastNameError('');
		setEmailError('');
		setOrgError('');
		setRoleError('');

		if (!firstName.length) {
			setFirstNameError('Du skal indtaste et fornavn');
			isOK = false;
		} else if (!lastName.length) {
			setLastNameError('Du skal indtaste et efternavn');
			isOK = false;
		} else if (!email.length) {
			setEmailError('Du skal indtaste en e-mail');
			isOK = false;
		} else if (!org.length) {
			setOrgError('Du skal vælge en organisation');
			isOK = false;
		} else if (!role.length) {
			setRoleError('Du skal vælge et adgangsniveau');
			isOK = false;
		}

		if (isOK) {
			let data = { ...user };
			data.firstName = firstName;
			data.lastName = lastName;
			data.email = email;
			data.org = { uuid: org }
			data.role = { uuid: role }

			const result = await updateUser(user.uuid, data);

			if (!result) {
				setAlertFail(true);
			} else {
				setAlertSuccess(true);

				setTimeout(function () {
					props.history.push('/administration/users/list');
				}, 500);
			}
		}
	}

	return (
		<Paper elevation={3} className={classes.adminPaperContainer}>
			<div className={classes.adminHeader}>Bruger redigering</div>

			{!loading ?
				<Grid container justify={'flex-start'} spacing={0}>
					<form>
						<Grid item xs={12}>
							<TextField
								id={'firstName'}
								label='Fornavn'
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								margin='normal'
								variant='outlined'
								error={firstNameError.length ? true : false}
								helperText={firstNameError}
								className={classes.textField}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id={'lastName'}
								label='Efternavn'
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								margin='normal'
								variant='outlined'
								error={lastNameError.length ? true : false}
								helperText={lastNameError}
								className={classes.textField}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id={'email'}
								label='E-mail'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								margin='normal'
								variant='outlined'
								error={emailError.length ? true : false}
								helperText={emailError}
								className={classes.textField}
							/>
						</Grid>
						<Grid item xs={12} style={{ marginTop: 20 }}>
							<TextField
								select
								id="select-org"
								label="Tilknyt organisation"
								value={org}
								onChange={(e) => setOrg(e.target.value)}
								className={classes.selectField}
								variant='outlined'
								error={orgError.length ? true : false}
								helperText={orgError}
							>
								{orgs.map(o => {
									return <MenuItem key={o.uuid} value={o.uuid}>{o.name}</MenuItem>;
								})}
							</TextField>
						</Grid>
						<Grid item xs={12} style={{ marginTop: 20 }}>
							<TextField
								select
								id="select-role"
								label="Adgangsniveau"
								value={role}
								onChange={(e) => setRole(e.target.value)}
								className={classes.selectField}
								variant='outlined'
								error={roleError.length ? true : false}
								helperText={roleError}
							>
								{roles.map(o => {
									return <MenuItem key={o.uuid} value={o.uuid}>{o.name}</MenuItem>;
								})}
							</TextField>
						</Grid>
					</form>
					<Grid item xs={12} style={{ marginTop: 40 }}>
						<Grid container>
							<Grid container item xs={12} justify="flex-end">
								<ButtonGroup variant="contained" color="primary">
									<Button onClick={handleCancel}>Annuller</Button>
									<Button onClick={handleSave}>Gem</Button>
								</ButtonGroup>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				: <CircularLoader fill />}

			<Snackbar open={alertSuccess} autoHideDuration={3000} onClose={handleAlertSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
				<Alert onClose={handleAlertSuccessClose} severity="success" elevation={6} variant="filled">Bruger opdateret!</Alert>
			</Snackbar>
			<Snackbar open={alertFail} autoHideDuration={3000} onClose={handleAlertFailClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
				<Alert onClose={handleAlertFailClose} severity="error" elevation={6} variant="filled">Der opstod en fejl!</Alert>
			</Snackbar>
		</Paper>
	)
}

export default AdminUsersList;

import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { Add } from 'variables/icons';
import { getBuildings } from 'data/climaid';
import adminStyles from 'Styles/adminStyles';

const useStyles = makeStyles({
	table: {
	},
});

const AdminBuildingsList = (props) => {
	const [buildings, setBuildings] = useState(null);
	const classes = useStyles();
	const history = props.history;

	useEffect(() => {
		async function fetchData() {
			const data = await getBuildings();
			if (data) {
				setBuildings(data);
			}
		}

		fetchData();
	}, []);

	const handleGoToBuilding = (uuid) => {
		props.history.push('/administration/buildings/view/' + uuid);
	};

	return (
		<div>
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
					<Table className={classes.table} aria-label="buildings table">
						<TableHead>
							<TableRow>
								<TableCell>Navn</TableCell>
								<TableCell>Lokation</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{buildings.map(building => (
								<TableRow key={building.uuid}>
									<TableCell onClick={() => handleGoToBuilding(building.uuid)}>
										{building.name}
									</TableCell>
									<TableCell>
										{building.latlong}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				: ""}
		</div>
	);
}

export default AdminBuildingsList;
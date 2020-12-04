import React from 'react'
import { Table, TableBody, TableRow, TableCell, Typography } from '@material-ui/core';

import adminStyles from 'Styles/adminStyles';


const AdminInfobox = () => {
	const classes = adminStyles();

	return (
		<>
			<Table className={classes.table} aria-label="infobox table" style={{ boxShadow: "none" }}>
				<TableBody>
					<TableRow key="row1" style={{ backgroundColor: '#f8fbfb', height: 60 }}>
						<TableCell style={{ borderBottom: "none" }}>
							<Typography className={classes.infoboxLabel}>Antal brugere:</Typography>
						</TableCell>
						<TableCell style={{ borderBottom: "none", textAlign: 'right' }}>
							<Typography className={classes.infoboxValue}>xxx</Typography>
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
							<Typography className={classes.infoboxValue}>xxx</Typography>
						</TableCell>
					</TableRow>
					<TableRow key="row4" style={{ backgroundColor: '#fff', height: 60 }}>
						<TableCell style={{ borderBottom: "none" }}>
							<Typography className={classes.infoboxLabel}>Antal sensor typer:</Typography>
						</TableCell>
						<TableCell style={{ borderBottom: "none", textAlign: 'right' }}>
							<Typography className={classes.infoboxValue}>xxx</Typography>
						</TableCell>
					</TableRow>
					<TableRow key="row5" style={{ backgroundColor: '#f8fbfb', height: 60 }}>
						<TableCell style={{ borderBottom: "none" }}>
							<Typography className={classes.infoboxLabel}>Antal zoner:</Typography>
						</TableCell>
						<TableCell style={{ borderBottom: "none", textAlign: 'right' }}>
							<Typography className={classes.infoboxValue}>xxx</Typography>
						</TableCell>
					</TableRow>
					<TableRow key="row6" style={{ backgroundColor: '#fff', height: 60 }}>
						<TableCell style={{ borderBottom: "none" }}>
							<Typography className={classes.infoboxLabel}>Antal bygninger:</Typography>
						</TableCell>
						<TableCell style={{ borderBottom: "none", textAlign: 'right' }}>
							<Typography className={classes.infoboxValue}>xxx</Typography>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</>
	)
}

export default AdminInfobox;
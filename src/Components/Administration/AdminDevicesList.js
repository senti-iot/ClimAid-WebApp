import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//Dialog, DialogTitle, DialogContent, DialogActions, Button
import { Grid, Paper, IconButton } from '@material-ui/core';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
import QRCode from 'qrcode';
import { saveAs } from 'file-saver';

// import { Add } from 'variables/icons';
import { getDevices } from 'data/climaid';
import AdminMenu from './AdminMenu';
import adminStyles from 'Styles/adminStyles';
import CircularLoader from 'Components/Loaders/CircularLoader';
import QrCodeIcon from 'assets/icons/qrcode.svg';

const AdminDevicesList = (props) => {
	const [devices, setDevices] = useState(null);
	// const [selectedUuid, setSelectedUuid] = useState(null);
	// const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const classes = adminStyles();
	// const history = props.history;
	const { uuid } = useParams();

	useEffect(() => {
		async function fetchData() {
			// if (typeof uuid === 'undefined') {
			const data = await getDevices();

			if (data) {
				setDevices(data);
			}
			// } else {
			// 	let data = await getDevicesInBuilding(uuid);
			// 	if (data) {
			// 		setDevices(data);
			// 	}
			// }
		}

		fetchData();
	}, [uuid]);

	// const confirmDelete = (id) => {
	// 	setSelectedUuid(id);
	// 	setShowDeleteDialog(true);
	// }

	// const handleCancel = () => {
	// 	setShowDeleteDialog(false);
	// }

	// const handleOk = async () => {
	// 	// const result = await deleteRoom(selectedUuid);
	// 	// if (result) {
	// 	// 	setShowDeleteDialog(false);
	// 	// }
	// }

	const handleQrCode = async uuid => {
		try {
			let dataUrl = await QRCode.toDataURL('https://feedback.climaid.dk/feedback/' + uuid);
			let dataBlob = dataUrlToBlob(dataUrl);
			saveAs(dataBlob, uuid + '.png');
		} catch (err) {
			console.error(err)
		}
	}

	const dataUrlToBlob = (strUrl) => {
		var parts = strUrl.split(/[:;,]/),
			type = parts[1],
			decoder = parts[2] === "base64" ? atob : decodeURIComponent,
			binData = decoder(parts.pop()),
			mx = binData.length,
			i = 0,
			uiArr = new Uint8Array(mx);

		for (i; i < mx; ++i) uiArr[i] = binData.charCodeAt(i);

		return new Blob([uiArr], { type: type });
	}

	return (
		<>
			<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={3}>
				<Grid container item xs={3}>
					<Paper elevation={3} className={classes.adminPaperContainer}>
						<AdminMenu />
					</Paper>
				</Grid>
				<Grid container item xs={6}>
					<Paper elevation={3} className={classes.adminPaperContainer}>
						<div className={classes.adminHeader}>Sensorer</div>

						{/* <p>
							<Button
								variant="contained"
								color="primary"
								startIcon={<Add />}
								onClick={() => history.push('/administration/sensor/add/' + uuid)}
							>
								Tilføj sensor
							</Button>
						</p> */}

						{devices ? (
							!devices.length ? <p>Der blev ikke fundet nogen sensorer på denne bygning</p> : 
								<TableContainer component={Paper}>
									<Table stickyHeader className={classes.table} aria-label="buildings table">
										<TableHead>
											<TableRow className={classes.tableRow}>
												<TableCell>Lokale</TableCell>
												<TableCell>ID</TableCell>
												<TableCell>Bygning</TableCell>
												<TableCell></TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{devices.map(device => (
												<TableRow hover key={device.room.uuid} className={classes.tableRow}>
													<TableCell>
														{device.room.name}
													</TableCell>
													<TableCell>
														{device.uuid}
													</TableCell>
													<TableCell>
														{device.room.building.name}
													</TableCell>
													<TableCell align="right">
														{/* <IconButton onClick={() => history.push('/administration/devices/' + device.uuid + '/edit')}>
															<EditIcon />
														</IconButton> */}
														<IconButton onClick={() => handleQrCode(device.uuid)}>
															<img src={QrCodeIcon} alt="Generer QR kode" />
														</IconButton>
														{/* <IconButton onClick={() => confirmDelete(device.uuid)}>
															<DeleteIcon />
														</IconButton> */}
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
			{/* <Dialog
				disableBackdropClick
				disableEscapeKeyDown
				maxWidth="xs"
				open={showDeleteDialog}
			>
				<DialogTitle>Dette vil slette sensoren</DialogTitle>
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
			</Dialog> */}
		</>
	);
}

export default AdminDevicesList;
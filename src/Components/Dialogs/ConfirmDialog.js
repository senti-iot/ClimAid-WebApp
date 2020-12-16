import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

const ConfirmDialog = (props) => {
	return (
		<Dialog
			disableBackdropClick
			disableEscapeKeyDown
			maxWidth="xs"
			open={props.visible}
		>
			<DialogTitle>{props.title}</DialogTitle>
			<DialogContent dividers>
				{props.message}
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={props.handleCancel} color="primary">
					Nej
        			</Button>
				<Button onClick={props.handleOk} color="primary">
					Ja
       				</Button>
			</DialogActions>
		</Dialog>

	)
}

export default ConfirmDialog;
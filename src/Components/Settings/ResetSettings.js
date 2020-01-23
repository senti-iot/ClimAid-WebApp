import React, { useContext } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { resetSettings } from 'Redux/settings';
import { TProvider } from 'Components/Providers/LocalizationProvider';
import { settingsStyles } from 'Styles/settingsStyle';
import { useDispatch } from 'react-redux'

const ResetSettingsModal = (props) => {
	const dispatch = useDispatch()
	const t = useContext(TProvider)
	const classes = settingsStyles()
	
	const rstSettings = () => dispatch(resetSettings())

	const handleClose = () => props.handleClose()
	const handleYes = () => {
		rstSettings()
		props.handleClose(true)
	}
	
	
	const { open } = props
	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="simple-dialog-title" >
			<DialogTitle disableTypography id="simple-dialog-title">{t('settings.reset.resetSettings')}</DialogTitle>
			<DialogContent>
				{t('settings.reset.message')}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>
					{t('actions.no')}
				</Button>
				<Button onClick={handleYes} className={classes.red}>
					{t('actions.yes')}
				</Button>
			</DialogActions>
		</Dialog>
	)
}


export default ResetSettingsModal

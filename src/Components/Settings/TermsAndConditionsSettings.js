import React, { useState, useContext } from 'react'
import { InfoCard, ItemGrid } from 'Components';
import { Assignment } from 'variables/icons';
import { Grid, List, ListItem, ListItemText, Button } from '@material-ui/core';

import ResetSettingsModal from './ResetSettings';

import { CookiesDialog, PrivacyDialog } from 'Components';

import { TProvider } from 'Components/Providers/LocalizationProvider';
import { settingsStyles } from 'Styles/settingsStyle';

const TermsAndConditions = () => {
	const t = useContext(TProvider)
	const classes = settingsStyles()
	const [openCP, setCP] = useState(false)
	const [openRS, setRS] = useState(false)
	const [openPP, setPP] = useState(false)

	const handleOpenPP = () => setPP(true)
	const handleClosePP = () => setPP(false)
	
	const handleOpenCP = () => setCP(true)
	const handleCloseCP = () => setCP(false)
	
	const handleOpenRS = () => setRS(true)
	const handleCloseRS = () => setRS(false)
	// handleCloseRS = (redirect) => {
	// 	setState({ openRS: false })
	// 	if (redirect) {
	// 		props.history.push('/')
	// 	}
	// }

	return (
		<InfoCard
			noExpand
			avatar={<Assignment />}
			title={t('settings.t&c.title')}
			content={
				<Grid container>
					<CookiesDialog open={openCP} handleClose={handleCloseCP} t={t} readOnly />
					<PrivacyDialog open={openPP} handleClose={handleClosePP} t={t} readOnly />
					<ResetSettingsModal open={openRS} handleClose={handleCloseRS} t={t} classes={classes} />
					<List className={classes.list}>
						<ListItem divider>
							<ItemGrid container zeroMargin noPadding alignItems={'center'}>
								<ListItemText>{t('settings.t&c.cookiesPolicy')}</ListItemText>
								<Button color={'primary'} onClick={handleOpenCP}>{t('actions.read')}</Button>
							</ItemGrid>
						</ListItem>
						<ListItem divider>
							<ItemGrid container zeroMargin noPadding alignItems={'center'}>
								<ListItemText>{t('settings.t&c.privacyPolicy')}</ListItemText>
								<Button color={'primary'} onClick={handleOpenPP}>{t('actions.read')}</Button>
							</ItemGrid>
						</ListItem>
						<ListItem>
							<ItemGrid container zeroMargin noPadding alignItems={'center'}>
								<ListItemText>{t('settings.reset.resetSettings')}</ListItemText>
								<Button className={classes.red} onClick={handleOpenRS}>{t('settings.reset.restore')}</Button>
							</ItemGrid>
						</ListItem>
					</List>
				</Grid>
			}
		/>
	)
}

export default TermsAndConditions
import React from 'react'
import { InfoCard, ItemGrid, DSelect, CircularLoader } from 'Components';
import { Laptop } from 'variables/icons'
import { Grid, ListItem, List, ListItemText, colors, /* Switch */ } from '@material-ui/core';
import { settingsStyles } from 'Styles/settingsStyle';
import { changeLanguage } from 'Redux/localization';
import { changeTheme, changeSnackbarLocation, changeHoverTime, changeTRP, changeColorTheme } from 'Redux/settings'
import { useSelector, useDispatch } from 'react-redux'

function DisplaySettings(props) {
	const lang = useSelector(state => state.localization.language)
	const settings = useSelector(state => state.settings)
	const dispatch = useDispatch()
	const redux = {
		changeLanguage: e => dispatch(changeLanguage(e.target.value)),
		changeTRP: e => dispatch(changeTRP(e.target.value)),
		changeTheme: e => dispatch(changeTheme(e.target.value)),
		changeSnackbarLocation: e => dispatch(changeSnackbarLocation(e.target.value)),
		changeHoverTime: e => dispatch(changeHoverTime(e.target.value)),
		changeColorTheme: e => dispatch(changeColorTheme(e.target.value))
	}
	const { t } = props
	const { language, trp, sideBar, discSentiVal,
		theme, hoverTime, snackbarLocation, colorTheme } = settings

	const classes = settingsStyles()

	let languages = [
		{ value: 'en', label: t('settings.languages.en') },
		{ value: 'da', label: t('settings.languages.da') }
	]

	let themes = [
		{ value: 1, label: t('settings.themes.dark') },
		{ value: 0, label: t('settings.themes.light') }
	]
	const renderColor = (color) => {
		return <div style={{ background: color[500], width: 16, height: 16, borderRadius: 4 }} />
	}

	let colorThemes = [
		// { value: 'lightBlue', label: t('settings.chart.weekendColors.lightBlue'), icon: renderColor(colors.lightBlue) },
		// { value: 'cyan', label: t('settings.chart.weekendColors.cyan'), icon: renderColor(colors.cyan) },
		// { value: 'teal', label: t('settings.chart.weekendColors.teal'), icon: renderColor(colors.teal) },
		// { value: 'green', label: t('settings.chart.weekendColors.green'), icon: renderColor(colors.green) },
		// { value: 'lightGreen', label: t('settings.chart.weekendColors.lightGreen'), icon: renderColor(colors.lightGreen) },
		// { value: 'lime', label: t('settings.chart.weekendColors.lime'), icon: renderColor(colors.lime) },
		// { value: 'yellow', label: t('settings.chart.weekendColors.yellow'), icon: renderColor(colors.yellow) },
		// { value: 'amber', label: t('settings.chart.weekendColors.amber'), icon: renderColor(colors.amber) },
		// { value: 'orange', label: t('settings.chart.weekendColors.orange'), icon: renderColor(colors.orange) },
		// { value: 'deepOrange', label: t('settings.chart.weekendColors.deepOrange'), icon: renderColor(colors.deepOrange) },
		// { value: 'red', label: t('settings.chart.weekendColors.red'), icon: renderColor(colors.red) },
		// { value: 'pink', label: t('settings.chart.weekendColors.pink'), icon: renderColor(colors.pink) },
		// { value: 'purple', label: t('settings.chart.weekendColors.purple'), icon: renderColor(colors.purple) },
		// { value: 'deepPurple', label: t('settings.chart.weekendColors.deepPurple'), icon: renderColor(colors.deepPurple) },
		// { value: 'indigo', label: t('settings.chart.weekendColors.indigo'), icon: renderColor(colors.indigo) },
		{ value: 'blue', label: t('settings.chart.weekendColors.blue'), icon: renderColor(colors.blue) },
	]

	// rowsPerPageOptions: [autoheight, 5, 7, 8, 10, 15, 20, 25, 50, 100],
	let autoheightStr = Math.round((window.innerHeight - 70 - 48 - 30 - 64 - 56 - 30 - 56 - 30) / 49) + ' - auto'
	let autoheight = Math.round((window.innerHeight - 70 - 48 - 30 - 64 - 56 - 30 - 56 - 30) / 49)
	let trps = [
		{ value: autoheight, label: autoheightStr },
		{ value: 5, label: 5 },
		{ value: 7, label: 7 },
		{ value: 8, label: 8 },
		{ value: 10, label: 10 },
		{ value: 15, label: 15 },
		{ value: 20, label: 20 },
		{ value: 25, label: 25 },
		{ value: 50, label: 50 },
		{ value: 100, label: 100 }
	]

	let snackbarLocations = [
		{ value: 'left', label: t('settings.snackbarLocations.left') },
		{ value: 'right', label: t('settings.snackbarLocations.right') }
	]
	let hoverTimes = [
		{ value: 0, label: t('settings.hover.values.0') },
		{ value: 300, label: t('settings.hover.values.300') },
		{ value: 500, label: t('settings.hover.values.500') },
		{ value: 700, label: t('settings.hover.values.700') },
		{ value: 1000, label: t('settings.hover.values.1000') },
		{ value: 2000, label: t('settings.hover.values.2000') },
		{ value: 3000, label: t('settings.hover.values.3000') },
	]
	return (
		discSentiVal !== null && language !== null && trp !== null && sideBar !== null && theme !== null ?
			<InfoCard
				noExpand
				avatar={<Laptop />}
				title={t('settings.headers.display')}
				content={
					<Grid container>
						<List className={classes.list}>
							<ListItem divider>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText>{t('settings.language')}</ListItemText>
									<DSelect menuItems={languages} value={lang} onChange={redux.changeLanguage} />
								</ItemGrid>
							</ListItem>
							<ListItem divider>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText>{t('settings.theme')}</ListItemText>
									<DSelect menuItems={themes} value={theme} onChange={redux.changeTheme} />
								</ItemGrid>
							</ListItem>
							<ListItem divider>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText>{t('settings.colorTheme')}</ListItemText>
									<DSelect leftIcon menuItems={colorThemes} value={colorTheme} onChange={redux.changeColorTheme} />
								</ItemGrid>
							</ListItem>
							<ListItem divider>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText>{t('settings.snackbarLocation')}</ListItemText>
									<DSelect menuItems={snackbarLocations} value={snackbarLocation} onChange={redux.changeSnackbarLocation} />
								</ItemGrid>
							</ListItem>

							<ListItem divider>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText>{t('settings.tables.trp')}</ListItemText>
									<DSelect menuItems={trps} value={trp} onChange={redux.changeTRP} />
								</ItemGrid>
							</ListItem>
							<ListItem>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText primary={t('settings.tables.hover')} />
									<DSelect menuItems={hoverTimes} value={hoverTime} onChange={redux.changeHoverTime} />
								</ItemGrid>
							</ListItem>
						</List>
					</Grid>
				}
			/> : <CircularLoader notCentered />
	)
}

export default DisplaySettings
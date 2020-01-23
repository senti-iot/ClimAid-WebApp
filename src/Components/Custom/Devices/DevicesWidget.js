import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { T, ItemG } from 'Components'
import { useLocalization, useSelector } from 'Hooks'
import { green, red } from '@material-ui/core/colors'
// import { KeyboardArrowRight } from 'variables/icons'
// import { IconButton } from '@material-ui/core'

const devicesWidgetStyles = makeStyles(theme => ({
	title: {
		marginLeft: 16, marginTop: 16, fontWeight: 600, letterSpacing: 1, height: 32
	},
	text: {
		whiteSpace: 'nowrap',
		marginTop: 8,
		fontSize: '1rem'
	},
	devices: {
		minWidth: '100px',
		width: '100px',
		textAlign: 'center',
		marginTop: 4,
		fontSize: '1.25rem',
		fontWeight: 500
	},
	activeDevices: {
		color: green[500]
	},
	inactiveDevices: {
		color: red[500]
	},

}))


const DevicesWidget = () => {
	const classes = devicesWidgetStyles()
	const t = useLocalization()
	const devices = useSelector(s => s.data.devices)
	const inactiveDevices = devices.filter(d => !d.communication)
	const activeDevices = devices.filter(d => d.communication)
	return (
		<div>
			<T variant={'h5'} className={classes.title}>{t('charts.devices')}</T>
			<ItemG container>
				<ItemG container direction={'column'} style={{ maxWidth: '45%' }}>
					<ItemG style={{ margin: 16 }} container alignItems={'center'}>
						<T className={classes.text}>{t('charts.device.active')}:</T>
					</ItemG>
					<ItemG style={{ margin: 16 }} container alignItems={'center'}>
						<T className={classes.text}>{t('charts.device.inactive')}:</T>
					</ItemG>
				</ItemG>
				<ItemG container direction={'column'} style={{ maxWidth: '45%' }}>
					{/* <T variant={'h5'} className={classes.title}>{t('charts.devices')}</T> */}
					<ItemG style={{ margin: 16 }} container alignItems={'center'}>
						<T className={classes.devices + " " + classes.activeDevices}>{activeDevices.length}</T>
					</ItemG>
					<ItemG style={{ margin: 16 }} container alignItems={'center'}>
						<T className={classes.devices + " " + classes.inactiveDevices}>{inactiveDevices.length}</T>
					</ItemG>
				</ItemG>
			</ItemG>
		</div>
	)
}

export default DevicesWidget

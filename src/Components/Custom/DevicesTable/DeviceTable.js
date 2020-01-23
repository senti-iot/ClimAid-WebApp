import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Dialog } from '@material-ui/core'
import { SlideT, T } from 'Components'
import CTable from 'Components/Table/Table'
import TC from 'Components/Table/TC'
import { Backdrop, DPaper, TitleContainer, DBox, GetDevicesButton, DevicesSelected } from 'Components/Custom/Styles/deviceTableStyles'
import { useSelector, useLocalization, useState, useDispatch } from 'Hooks'
import { setSelectedDevices } from 'Redux/appState'
import { sortData } from 'Redux/data'
import FilterToolbar from 'Components/FilterToolbar/FilterToolbar'
import { customFilterItems } from 'variables/functions/filters'
import ItemG from 'Components/Containers/ItemG'





const DeviceTable = (props) => {
	const devices = useSelector(s => s.data.devices)
	const selectedDevices = useSelector(s => s.appState.selectedDevices)
	const filters = useSelector(s => s.appState.filters.devices)
	const dispatch = useDispatch()
	const redux = {
		setSelDevices: devices => dispatch(setSelectedDevices(devices)),
		sortData: (key, property, order) => dispatch(sortData(key, property, order))
	}
	const [selDev, setSelDev] = useState([])
	const t = useLocalization()
	const [order, setOrder] = useState('desc')
	const [orderBy, setOrderBy] = useState('id')

	const { openTable, setOpenTable } = props

	useEffect(() => {
		setSelDev(selectedDevices)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const handleRequestSort = (key, property) => {
		let o = property !== orderBy ? 'asc' : order === 'desc' ? 'asc' : 'desc'

		setOrder(o)
		setOrderBy(property)
		redux.sortData(key, property, o)
	}
	const selectDevice = (s, device) => {
		let newSDevices = []
		newSDevices = [...selDev]
		if (s) {
			newSDevices = newSDevices.filter(d => d !== device)
		}
		else {
			newSDevices.push(device)
		}
		setSelDev(newSDevices)
	}
	const selectAllDevices = (s) => {
		let newSDevices = []
		if (!s)
			setSelDev(newSDevices)
		else
			setSelDev(customFilterItems(devices, filters).map(d => d.id))
	}
	//#region  Filters
	const dLiveStatus = () => {
		return [
			{ value: 0, label: t("devices.fields.state.inactive") },
			{ value: 1, label: t("devices.fields.state.active") },
		]
	}
	const deviceFilters = [
		{ key: 'name', name: t('devices.fields.name'), type: 'string' },
		{ key: 'address', name: t('devices.fields.address'), type: 'string' },
		// { key: '', name: t('orgs.fields.name'), type: 'string' },
		{ key: 'communication', name: t('devices.fields.status'), type: 'dropDown', options: dLiveStatus() },
		// { key: 'locationType', name: t('devices.fields.locType'), type: 'dropDown', options: this.dLocationPlace() },
		// { key: 'lat', name: t('calibration.stepheader.calibration'), type: 'diff', options: { dropdown: this.dCalibrated(), values: { false: [0] } } },
		// { key: 'dataCollection', name: t('devices.fields.availability'), type: 'dropDown', options: this.dAvailable() },
		{ key: '', name: t('filters.freeText'), type: 'string', hidden: true },
	]

	//#endregion
	const columns = [
		{ id: 'address', label: t('devices.fields.address') },
		{ id: 'uuid', label: t('devices.fields.uuid') },
		{ id: 'name', label: t('devices.fields.name') },
		{ id: 'id', label: t('devices.fields.id') },
		{ id: 'type', label: t('devices.fields.type') },
		{ id: 'group', label: t('devices.fields.group') },
		{ id: 'communication', label: t('devices.fields.status') },
		// { id: 'liveStatus', checkbox: true, label: <ItemG container justify={'center'} title={t('devices.fields.status')}><SignalWifi2Bar /></ItemG> },
		// { id: 'address', label: t('devices.fields.address') },
		// { id: 'org.name', label: t('devices.fields.org') },
		// { id: 'dataCollection', label: t('devices.fields.availability') }
	]
	const bodyStructure = row => {
		return <Fragment>
			<TC label={row.address} />
			<TC label={row.uuid} />
			<TC label={row.name} />
			<TC label={row.id} />
			<TC label={row.type} />
			<TC label={row.group} />
			<TC label={row.communication ? t('devices.fields.state.active') : t('devices.fields.state.inactive')} />
		</Fragment>
	}
	const closeDialog = () => {
		redux.setSelDevices(selDev)
		setOpenTable(false)
	}
	const exitDialog = () => {
		setOpenTable(false)
	}
	return (
		<Dialog
			fullScreen
			style={{ top: 70 }}
			onClose={exitDialog}
			open={openTable}
			// open={true}
			color={'primary'}
			TransitionComponent={SlideT}
			BackdropComponent={Backdrop}
			PaperComponent={DPaper}

		// classes={{
		// 	root: classes.dialogRoot
		// }}
		>
			<DBox>
				<TitleContainer>
					<T variant={'h4'} style={{ fontWeight: 500, letterSpacing: 0.5 }}>{t('charts.selectedDevices')}</T>
					<ItemG container style={{ width: 'auto' }}>
						<ItemG>
							<DevicesSelected>{selDev.length}</DevicesSelected>
						</ItemG>
						<ItemG>
							<GetDevicesButton variant={'contained'} color={'secondary'} onClick={closeDialog}>{t('actions.get')}</GetDevicesButton>
						</ItemG>
					</ItemG>
				</TitleContainer>
				<FilterToolbar reduxKey={'devices'} filters={deviceFilters} />
				<CTable
					order={order}
					orderBy={orderBy}
					sortKey={'devices'}
					body={customFilterItems(devices, filters)}
					bodyStructure={bodyStructure}
					mobile
					bodyMobileStructure={() => { }}
					selected={selDev}
					columns={columns}
					handleCheckboxClick={selectDevice}
					handleSelectAllClick={selectAllDevices}
					handleClick={() => { }}
					handleSort={handleRequestSort}
				/>
			</DBox>
		</Dialog>
	)
}

DeviceTable.propTypes = {
	openTable: PropTypes.bool.isRequired,
	setOpenTable: PropTypes.func.isRequired,
}

export default DeviceTable

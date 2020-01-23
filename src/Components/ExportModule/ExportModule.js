import React, { useState, useEffect } from 'react'
import { DMenu, ItemG } from 'Components'
import { ImportExport, Close, DateRange, AccessTime, KeyboardArrowRight, KeyboardArrowLeft } from 'variables/icons'
import { useLocalization, useSelector } from 'Hooks'
import { Dialog, DialogContent, DialogActions, Button, Checkbox, FormGroup, FormControlLabel, FormLabel, DialogTitle } from '@material-ui/core'
import GridContainer from 'Components/Containers/GridContainer'
import { DatePicker } from '@material-ui/pickers'
import moment from 'moment'
import { getDevicesDataCSV } from 'data/devices'
import DeviceTableExportWidget from 'Components/Custom/DevicesTable/DeviceTableExportWidget'
import FadeOutLoader from 'Components/Loaders/FadeOutLoader'
import styled from 'styled-components'

const MDialogHeader = styled(DialogTitle)`
	background: ${({ theme }) => theme.chartButton};
`

const MDialogContent = styled(DialogContent)`
	background: ${({ theme }) => theme.boxBackground};
`
const MDialogActions = styled(DialogActions)`
	background: ${({ theme }) => theme.boxBackground};
`

const columns = [
	{ id: 9, field: 'device_id', label: 'deviceId', isReq: true, hidden: true },
	{ id: 0, field: 'name', label: 'meterNumber', type: 'device', isReq: true },
	{ id: 1, field: 'uuid', label: 'SigfoxID', type: 'device', isReq: true },
	{ id: 2, field: 'time', label: 'time', type: 'json', isReq: true, hidden: true },
	{ id: 3, field: 'value', label: 'waterUsage', type: 'json', cf: 53 },
	{ id: 4, field: 'value', label: 'waterReading', type: 'json', cf: 56 },
	{ id: 5, field: 'minWTemp', label: 'minWaterTemperature', type: 'json' },
	{ id: 6, field: 'minATemp', label: 'minAmbientTemperature', type: 'json' },
	{ id: 7, field: 'minFlow', label: 'minWaterFlow', type: 'json' },
	{ id: 8, field: 'maxFlow', label: 'maxWaterFlow', type: 'json' },

]


export const ExportModule = () => {
	const t = useLocalization()
	const [openDialog, setOpenDialog] = useState(false)
	const [loading, setLoading] = useState(false)
	const [sColumns, setSColumns] = useState([]) //selected columns
	const [from, setFrom] = useState(moment().subtract(6, 'day').startOf('day'))
	const [to, setTo] = useState(moment().startOf('day'))
	const selectedDevices = useSelector(s => s.appState.selectedExportDevices)
	const menuPoints = [{
		dontShow: false,
		icon: <ImportExport />,
		label: t('actions.export')
	}]
	useEffect(() => {
		setSColumns(columns.filter(c => c.isReq).map(c => c.id))
	}, [])
	//#region Handlers

	const handleCheckboxClick = (c) => (e) => {
		let newSColumns = [...sColumns]
		if (newSColumns.indexOf(c.id) !== -1) {
			newSColumns.splice(newSColumns.indexOf(c.id), 1)
		}
		else {
			newSColumns.push(c.id)
		}
		newSColumns = newSColumns.sort()
		setSColumns(newSColumns)
	}
	const handleOpenDialog = () => {
		setOpenDialog(true)
	}
	const handleCloseDialog = () => {
		setOpenDialog(false)
	}
	const setLoader = () => {
		setLoading(true)
	}
	const getData = async () => {
		// setLoading(true)
		let config = {
			type: 'deviceData',
			config: {
				customerId: 138230100010117,
				columns: columns.filter(f => sColumns.indexOf(f.id) !== -1),
				period: {
					from: from.clone().subtract(1, 'day').format('YYYY-MM-DD'),
					to: to.format('YYYY-MM-DD')
				},
				filters: {
					pre: selectedDevices.map(s => ({
						"key": "device_id",
						"value": s,
						"type": "equal"
					})),
					post: [
						{
							type: "datetime",
							key: "time",
							from: from.format('YYYY-MM-DD'),
							to: to.format('YYYY-MM-DD')
						}
					]
				}
			}
		}
		await getDevicesDataCSV(config).then(rs => {
			const url = window.URL.createObjectURL(new Blob([rs]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `senti-waterworks-${moment().valueOf()}.csv`);
			document.body.appendChild(link);
			link.click();
		})
		setOpenDialog(false)
		setLoading(false)



	}
	//#endregion
	return (
		<>
			<DMenu
				onChange={handleOpenDialog}
				menuItems={menuPoints}
			/>
			<Dialog
				onClose={loading ? undefined : handleCloseDialog}
				open={openDialog}
			>
				<MDialogHeader>
					{t('actions.export')}
				</MDialogHeader>
				<FadeOutLoader overlay on={loading} onChange={getData}>
					<MDialogContent >

						<GridContainer>
							<ItemG xs={6}>
								<FormGroup>
									<FormLabel>{t('exports.columns')}</FormLabel>
									{columns.map((c, i) => {
										return c.hidden ? null :
											<FormControlLabel
												key={i}
												control={<Checkbox
													onChange={handleCheckboxClick(c)}
													id={c.field}
													disabled={c.isReq}
													checked={c.isReq ? true : sColumns.indexOf(c.id) !== -1 ? true : false} />}
												label={t("exports.fields." + c.label) + ` (${c.label})`}
												style={{ marginTop: 8 }}
											/>
									})}
								</FormGroup>
							</ItemG>
							<ItemG xs={6}>
								<ItemG container spacing={2}>
									<ItemG xs={12}>
										<FormGroup>
											<FormLabel>{t('exports.period')}</FormLabel>
											<DatePicker
												autoOk
												ampm={false}
												label={t('filters.startDate')}
												clearable
												format='LLL'
												value={from}
												onChange={e => setFrom(e)}
												animateYearScrolling={false}
												color='primary'
												disableFuture
												dateRangeIcon={<DateRange />}
												timeIcon={<AccessTime />}
												rightArrowIcon={<KeyboardArrowRight />}
												leftArrowIcon={<KeyboardArrowLeft />}

											/>
											<DatePicker
												autoOk
												ampm={false}
												label={t('filters.endDate')}
												clearable
												format='LLL'
												value={to}
												onChange={e => setTo(e)}
												animateYearScrolling={false}
												color='primary'
												disableFuture
												dateRangeIcon={<DateRange />}
												timeIcon={<AccessTime />}
												rightArrowIcon={<KeyboardArrowRight />}
												leftArrowIcon={<KeyboardArrowLeft />}

											/>
										</FormGroup>
									</ItemG>
									<ItemG xs={12}>
										<FormGroup style={{ marginTop: 36 }}>
											<DeviceTableExportWidget />
										</FormGroup>

									</ItemG>
								</ItemG>
							</ItemG>
						</GridContainer>
					</MDialogContent>
				</FadeOutLoader>
				<MDialogActions>
					<Button onClick={handleCloseDialog}>
						<Close />
						{t('actions.cancel')}
					</Button>
					<Button onClick={setLoader}>
						<ImportExport />
						{t('actions.export')}
					</Button>
				</MDialogActions>
			</Dialog>
		</>
	)
}

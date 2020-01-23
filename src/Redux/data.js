import { handleRequestSort } from 'data/functions'
import { getDevices, getDevicesData, /* getDevicesData */ } from 'data/devices'
import { genBenchmark, genArcData, genWR, genMinATemp, genMinWTemp, genMaxF, genMinF } from 'data/model'
import moment from 'moment'
// import { genBenchmarkAll } from 'data/model'

const sData = 'sortData'
const GETDevice = 'devices'
const deviceData = 'deviceData'
// const rawDataStore = 'storeOldData'
const middleChartData = 'middleChartData'

export const sortData = (key, property, order) => {
	return (dispatch, getState) => {
		let data = getState().data[key]
		let sortedData = handleRequestSort(property, order, data)
		let newArr = []
		newArr = sortedData
		dispatch({
			type: sData,
			payload: {
				key,
				sortedData: newArr
			}
		})

	}
}
// let fakeDevice = {
// 	nId: 0,
// 	address: "fakestreet",
// 	guid: "56970DF",
// 	id: "348580",
// 	type: "fakeDevice",
// 	active: true
// }
export const getAllDevices = async () => {
	return async (dispatch) => {
		let devices = await getDevices()
		dispatch({
			type: GETDevice,
			payload: devices
		})
		dispatch({
			type: 'selectDevice',
			payload: devices ? devices.map(d => d.id) : []
			// payload: devices ? [devices[0].id, devices[1].id, devices[2].id] : []
		})
	}
}
export const getData = async () => {
	return async (dispatch, getState) => {
		let from = getState().dateTime.period.from.clone()
		let to = getState().dateTime.period.to.clone().endOf('day')
		let filterDevices = getState().appState.selectedDevices
		let noOfDevices = getState().data.devices.length
		let fromM1 = from.clone().subtract(1, 'day')
		let subtr = moment(to).diff(moment(from), 'day')
		let prevFrom = moment(from).subtract(1, 'day').subtract(subtr, 'day')

		let prevTo = moment(from)
		if (moment().diff(moment(to), 'day') === 0) {
			prevTo = moment(fromM1)
		}
		let rawData, prevRawData, currentPeriodData, benchMarkData, previousPeriodData, finalData, middleData, prevMiddleData, finalMiddleData

		/**
		 * TODO: Filter the data of devices here ONCE instead of 4 times inside model
		 */
		let completeRawData = await getDevicesData(prevFrom, to)
		rawData = completeRawData.filter(f => moment(f.time) >= fromM1 && moment(f.time) <= to)
		prevRawData = completeRawData.filter(f => moment(f.time) >= prevFrom && moment(f.time) <= prevTo)

		currentPeriodData = {
			waterUsage: genWR(rawData, filterDevices),
			temperature: {
				ambient: genMinATemp(rawData, filterDevices),
				water: genMinWTemp(rawData, filterDevices)
			},
			waterFlow: {
				maxFlow: genMaxF(rawData, filterDevices),
				minFlow: genMinF(rawData, filterDevices)
			}
		}
		benchMarkData = genBenchmark(rawData, noOfDevices, filterDevices.length)

		// previousPeriodData = {
		// 	waterUsage: [],
		// 	temperature: {
		// 		ambient: [],
		// 		water: [],
		// 	},
		// 	waterFlow: {
		// 		maxFlow: [],
		// 		minFlow: []
		// 	}

		// }
		prevRawData.forEach(d => {
			d.time = moment(d.time).add(subtr, 'day')
		})

		previousPeriodData = {
			waterUsage: genWR(prevRawData, filterDevices),
			temperature: {
				ambient: genMinATemp(prevRawData, filterDevices),
				water: genMinWTemp(prevRawData, filterDevices)
			},
			waterFlow: {
				maxFlow: genMaxF(prevRawData, filterDevices),
				minFlow: genMinF(prevRawData, filterDevices)
			}
		}
		// currentPeriodData = genData(rawData, filterDevices)
		// previousPeriodData = genData(prevRawData, filterDevices, true, subtr)

		/**
		 * TODO: Do not call the API for another set of data, filter it based on from
		 */

		let rawArcData = currentPeriodData.waterUsage
		let prevRawArcData = previousPeriodData.waterUsage/* .filter(f => moment(f.created) > prevFrom) */

		middleData = genArcData(rawArcData, filterDevices)
		prevMiddleData = genArcData(prevRawArcData, filterDevices)

		finalData = {
			waterusage: [
				{
					name: 'waterusageL',
					median: true,
					data: currentPeriodData.waterUsage,
					color: 'red'
				},
				{
					name: 'waterusageP',
					prev: true,
					hidden: true,
					noMedianLegend: true,
					median: true,
					data: previousPeriodData.waterUsage
				},
				{
					name: 'benchmark',
					hidden: true,
					noArea: true,
					dashed: true,
					data: benchMarkData,
					color: 'yellow'
				}
			],
			// temperature: [],
			// waterflow: []
			temperature: [
				{
					name: 'tempAmbient',
					median: true,
					data: currentPeriodData.temperature.ambient,
					color: 'red'
				},
				{
					name: 'tempWater',
					median: true,
					data: currentPeriodData.temperature.water,
					color: 'blue'
				},
				{
					name: 'tempAmbientPrev',
					prev: true,
					hidden: true,
					noMedianLegend: true,
					median: true,
					data: previousPeriodData.temperature.ambient
				},
				{
					name: 'tempWaterPrev',
					prev: true,
					hidden: true,
					noMedianLegend: true,
					median: true,
					data: previousPeriodData.temperature.water
				}
			],
			waterflow: [
				{
					name: 'maxFlow',
					median: true,
					data: currentPeriodData.waterFlow.maxFlow,
					color: 'lightBlue'
				},
				{
					name: 'minFlow',
					median: true,
					data: currentPeriodData.waterFlow.minFlow,
					color: 'purple'
				},
				{
					name: 'maxFlowPrev',
					prev: true,
					hidden: true,
					noMedianLegend: true,
					median: true,
					data: previousPeriodData.waterFlow.maxFlow
				},
				{
					name: 'minFlowPrev',
					prev: true,
					hidden: true,
					smallArea: true,
					noMedianLegend: true,
					median: true,
					data: previousPeriodData.waterFlow.minFlow
				}
			]

		}
		if (filterDevices.length === 1) {
			finalData.readings = [
				{
					name: 'readingL',
					// median: true,
					color: 'yellow',
					data: rawData.filter(d => d.value && d.device_id === filterDevices[0]).map(d => ({ value: d.value, date: moment(d.created).startOf('day') }))
				}
			]
		}
		//#endregion
		//#region Middle Widget
		finalMiddleData = {
			current: middleData,
			previous: prevMiddleData
		}
		//#endregion
		dispatch({
			type: deviceData,
			payload: finalData
		})

		dispatch({
			type: middleChartData,
			payload: finalMiddleData
		})

	}
}
const initialState = {
	devices: [],
	data: {},
	middleChartData: {
		current: {
			waterusage: 0
		},
		previous: {
			waterusage: 0
		}
	}
}

export const data = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'RESET_APP':
			return initialState
		case sData:
			return Object.assign({}, state, { [payload.key]: payload.sortedData })
		case GETDevice:
			return Object.assign({}, state, { devices: payload })
		case deviceData:
			return Object.assign({}, state, { deviceData: payload })
		case middleChartData:
			return Object.assign({}, state, { middleChartData: payload })
		default:
			return state;
	}
}
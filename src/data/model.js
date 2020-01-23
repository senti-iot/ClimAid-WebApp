import moment from 'moment';

//#region Main Graph

export const genWaterPerDevice = (data) => {
	let devData = {}
	let final = []
	if (data.length > 0) {
		data.forEach(d => {
			devData[d.id] = devData[d.id] || {};
			var date = moment(d.date).format('YYYY-MM-DD HH:mm:ss')
			devData[d.id][date] = devData[d.id][date] || {}
			devData[d.id][date] = d.value
		})
		let deviceIds = Object.keys(devData)
		var dataByDay = {}
		deviceIds.forEach((d) => {
			let dates = Object.keys(devData[d]).reverse()
			dates.forEach((de, di) => {
				if (di < dates.length - 1 && devData[d][dates[di + 1]] && devData[d][de]) {
					devData[d][de] = devData[d][de] - devData[d][dates[di + 1]]
					dataByDay[de] = dataByDay[de] || 0
					dataByDay[de] = dataByDay[de] + devData[d][de]
				}
				else {
					delete devData[d][de]
				}
			})
		})

		Object.keys(dataByDay).forEach(k => final.push({ date: k, value: parseFloat(dataByDay[k].toFixed(3)) }))
		final = final.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())
	}
	return final
}


export const genReading = (deviceData) => {
	let data = {}
	var dataByDay = deviceData.reduce((d, datum) => {
		var date = moment(datum.date);
		var value = datum.value
		let group = date.format('YYYY-MM-DD 00:00:00').toString()
		data[group] = data[group] || {};
		data[group].totalValue = (data[group].totalValue || 0) + value;
		data[group].count = (data[group].count || 0) + 1;
		return data;
	}, {});
	let fResult = []
	Object.keys(dataByDay).forEach(d => {
		fResult.push({
			date: d,
			value: parseFloat((dataByDay[d].totalValue / dataByDay[d].count).toFixed(3))
		})
	});
	return fResult;
}
//#endregion
export const genMinWTemp = (deviceData, filter, prev, diff) => {
	let minWTemp;
	if (filter && filter.length > 0) {
		minWTemp = deviceData.filter(d => d.minWTemp && filter.indexOf(d.device_id) > -1)
	}
	else {
		minWTemp = deviceData.filter(d => d.minWTemp)
	}


	minWTemp = genReading(minWTemp.map(d => ({ value: d.minWTemp, date: d.time })))

	return minWTemp
}

export const genMinF = (deviceData, filter, prev, diff) => {
	let minFlow;
	if (filter && filter.length > 0) {
		minFlow = deviceData.filter(d => d.minFlow && filter.indexOf(d.device_id) > -1)
	}
	else {
		minFlow = deviceData.filter(d => d.minFlow)
	}


	minFlow = genReading(minFlow.map(d => ({ value: d.minFlow, date: d.time })))

	return minFlow
}

export const genMinATemp = (deviceData, filter, prev, diff) => {
	let minATemp;
	if (filter && filter.length > 0) {
		minATemp = deviceData.filter(d => d.minATemp && filter.indexOf(d.device_id) > -1)
	}
	else {
		minATemp = deviceData.filter(d => d.minATemp)
	}


	minATemp = genReading(minATemp.map(d => ({ value: d.minATemp, date: d.time })))

	return minATemp
}

export const genMaxF = (deviceData, filter, prev, diff) => {
	let maxFlow;
	if (filter && filter.length > 0) {
		maxFlow = deviceData.filter(d => d.maxFlow && filter.indexOf(d.device_id) > -1)
	}
	else {
		maxFlow = deviceData.filter(d => d.maxFlow)
	}


	maxFlow = genReading(maxFlow.map(d => ({ value: d.maxFlow, date: d.time })))

	return maxFlow
}
export const genBenchmark = (deviceData, noOfDevices, noOfSelectedDevices) => {
	let waterReading = deviceData.filter(d => d.value).map(d => ({ id: d.device_id, value: d.value, date: moment(d.time) }))
	window.bench = deviceData.filter(d => d.value).map(d => ({ id: d.device_id, value: d.value, date: moment(d.time) }))
	let data = []
	data = genWaterPerDevice(waterReading)
	if (noOfDevices - noOfSelectedDevices !== 0) {
		Object.keys(data).forEach(f => {
			data[f].value = parseFloat(((data[f].value / noOfDevices) * (noOfSelectedDevices)).toFixed(3))
		})
	}
	return data
}

export const genWR = (deviceData, filter, prev, diff) => {
	let waterUsage
	window.wr = deviceData.filter(d => d.value && filter.indexOf(d.device_id) > -1).map(d => ({ id: d.device_id, value: d.value, date: moment(d.time) }))

	if (prev) {
		deviceData.forEach(d => {
			d.time = moment(d.time).add(diff, 'day')
		})
	}
	if (filter && filter.length > 0) {
		waterUsage = deviceData.filter(d => d.value && filter.indexOf(d.device_id) > -1).map(d => ({ id: d.device_id, value: d.value, date: moment(d.time) }))

	}
	else {
		waterUsage = deviceData.filter(d => d.value).map(d => ({ id: d.device_id, value: d.value, date: moment(d.time) }))
	}

	waterUsage = genWaterPerDevice(waterUsage)

	return waterUsage
}
//#region Arc Graph

const sumUpData = (data) => {
	let total = 0;
	Object.keys(data).forEach(d => {
		total = total + data[d].value
	})
	return parseFloat(total.toFixed(3));

}

export const genArcData = (deviceData) => {
	// let data = {}
	let data = {
		waterusage: 0
		// values: []
	}
	data.waterusage = sumUpData(deviceData)
	// data.values = waterReading.map(d => ({ id: d.device_id, value: d.value, date: d.time }))
	return data
}
//#endregion

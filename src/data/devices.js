import { servicesAPI, dataExportAPI } from './data'
import moment from 'moment'




export const getDevices = async () => {
	let response = await servicesAPI.get('v1/138230100010117/devices').then(rs => rs)
	return response.data
}

export const getDevicesData = async (from, to) => {
	let startDate = moment(from).format('YYYY-MM-DD HH:mm:ss')
	let endDate = moment(to).format('YYYY-MM-DD HH:mm:ss')
	let response = await servicesAPI.get(`v1/deviceDataByCustomerID/138230100010117/${startDate}/${endDate}/-1`)
	return response.data
}

export const getDevicesDataCSV = async (config) => {
	let response = await dataExportAPI.post(`v1/export/csv`, config)
	return response.data
}
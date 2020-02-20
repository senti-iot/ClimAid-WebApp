import { create } from 'apisauce';
import moment from 'moment';
import crypto from 'crypto'

import { servicesAPI, weatherApi } from './data';

const { REACT_APP_CLIMAID_API_URL, REACT_APP_ENCRYPTION_KEY } = process.env;
const IV_LENGTH = 16

const encrypt = (text) => {
	let iv = crypto.randomBytes(IV_LENGTH)
	let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer.from(REACT_APP_ENCRYPTION_KEY), iv)
	let encrypted = cipher.update(text)

	encrypted = Buffer.concat([encrypted, cipher.final()])

	return iv.toString('hex') + ':' + encrypted.toString('hex')
}

export const climaidApi = create({
	baseURL: REACT_APP_CLIMAID_API_URL,
	timout: 30000,
	headers: {
		'auth': encrypt(process.env.REACT_APP_ENCRYPTION_KEY),
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		// 'Cache-Control': 'public, max-age=86400'
	}
});

export const getBuildings = async () => {
	let data = await climaidApi.get('/buildings').then(rs => rs.data);
	// console.log(data);
	return data;
};

export const getBuilding = async (uuid) => {
	let data = await climaidApi.get('/building/' + uuid).then(rs => rs.data);
	// console.log(data);
	return data;
};

export const getRoomsInBuilding = async (uuid) => {
	let data = await climaidApi.get('/rooms/' + uuid).then(rs => rs.data);
	// console.log(data);
	return data;
};

export const addBuilding = async (postData) => {
	let data = await climaidApi.post('/building', postData).then(rs => rs.data);
	// console.log(data);
	return data;
};

export const addBuildingImage = async (uuid, formData) => {
	let data = await climaidApi.post('/building/' + uuid + '/image', formData).then(rs => rs.data);
	// console.log(data);
	return data;
};

export const getBuildingImage = async (uuid) => {
	let data = await climaidApi.get('/building/' + uuid + '/image').then(rs => rs.data);
	// console.log(data);
	return data;
};

export const getRoom = async (uuid) => {
	let data = await climaidApi.get('/room/' + uuid).then(rs => rs.data);
	// console.log(data);
	return data;
};

export const getRooms = async () => {
	let data = await climaidApi.get('/rooms').then(rs => rs.data);
	// console.log(data);
	return data;
};

export const getWeather = async (date, lat, long) => {
	let data = await weatherApi.get('/' + date + '/' + lat + '/' + long + '/da').then(rs => rs.data);
	// console.log(data);
	return data;
};

// DEVICE DATA

export const getMeassurement = async (deviceId, gauge) => {
	let from = 0;
	let to = 0;

	switch (gauge.period) {
		case 'hour':
			from = moment().subtract(2, 'hours').format('YYYY-MM-DD HH:mm:ss');
			to = moment().format('YYYY-MM-DD HH:mm:ss');
			break;
		default:
		case 'day':
			from = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
			to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
			break;
	}

	let data = await servicesAPI.get('/v1/devicedata-clean/' + deviceId + '/' + from + '/' + to + '/' + gauge.type + '/' + gauge.function).then(rs => rs.data);
	return data;
};

export const getBatteryStatus = async (deviceId) => {
	const startDate = moment().subtract(2, 'hours').format('YYYY-MM-DD HH:mm:ss');
	const endDate = moment().format('YYYY-MM-DD HH:mm:ss');

	let data = await servicesAPI.get('/v1/devicedata-clean/' + deviceId + '/' + startDate + '/' + endDate + '/batteristatus/57').then(rs => rs.data);
	return data;

};

export const getDeviceDataConverted = async (deviceId, period, type) => {
	// let from = 0;
	// let to = 0;

	let cloudFunction = 13;
	if (period.timeType === 1) {
		cloudFunction = 14;
	}

	// switch (period) {
	// 	default:
	// 	case 'today':
	// 		from = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
	// 		to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
	// 		cloudFunction = 14;
	// 		break;
	// 	case 'yesterday':
	// 		from = moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
	// 		to = moment().subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss');
	// 		cloudFunction = 14;
	// 		break;
	// 	case 'thisweek':
	// 		from = moment().startOf('week').format('YYYY-MM-DD HH:mm:ss');
	// 		to = moment().endOf('week').format('YYYY-MM-DD HH:mm:ss');
	// 		break;
	// 	case '7days':
	// 		from = moment().subtract(6, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
	// 		to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
	// 		break;
	// 	case '30days':
	// 		from = moment().subtract(30, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
	// 		to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
	// 		break;
	// 	case '90days':
	// 		from = moment().subtract(90, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
	// 		to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
	// 		break;
	// }

	let data = await servicesAPI.get('/v1/devicedata-clean/' + deviceId + '/' + period.from + '/' + period.to + '/' + type + '/' + cloudFunction).then(rs => rs.data);

	let convertedData = [];
	Object.keys(data).map(key => (
		convertedData.push({ date: key, value: data[key] })
	));

	return convertedData;
};


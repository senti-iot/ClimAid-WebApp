import { create } from 'apisauce';
import moment from 'moment';

import { servicesAPI, weatherApi } from './data';

const { REACT_APP_CLIMAID_API_URL } = process.env;

export const climaidApi = create({
	baseURL: REACT_APP_CLIMAID_API_URL,
	timout: 30000,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
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
	let startDate = 0;
	let endDate = 0;

	switch (gauge.period) {
		case 'hour':
			startDate = moment().subtract(2, 'hours').format('YYYY-MM-DD HH:mm:ss');
			endDate = moment().format('YYYY-MM-DD HH:mm:ss');
			break;
		default:
		case 'day':
			startDate = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
			endDate = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
			break;
	}

	let data = await servicesAPI.get('/v1/devicedata-clean/' + deviceId + '/' + startDate + '/' + endDate + '/' + gauge.type + '/' + gauge.function).then(rs => rs.data);
	return data;
};

export const getBatteryStatus = async (deviceId) => {
	const startDate = moment().subtract(2, 'hours').format('YYYY-MM-DD HH:mm:ss');
	const endDate = moment().format('YYYY-MM-DD HH:mm:ss');

	let data = await servicesAPI.get('/v1/devicedata-clean/' + deviceId + '/' + startDate + '/' + endDate + '/batteristatus/57').then(rs => rs.data);
	return data;

};



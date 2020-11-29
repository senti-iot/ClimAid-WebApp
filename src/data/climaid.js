import { create } from 'apisauce';
import moment from 'moment';
import crypto from 'crypto';
import cookie from 'react-cookies';

import { servicesAPI, weatherApi } from './data';

const { REACT_APP_ENCRYPTION_KEY } = process.env;
const IV_LENGTH = 16

const encrypt = (text) => {
	let iv = crypto.randomBytes(IV_LENGTH)
	let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer.from(REACT_APP_ENCRYPTION_KEY), iv)
	let encrypted = cipher.update(text)

	encrypted = Buffer.concat([encrypted, cipher.final()])

	return iv.toString('hex') + ':' + encrypted.toString('hex')
}

let climaidApiHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
	// climaidApiHost = 'http://localhost:3026';
	climaidApiHost = 'https://services.senti.cloud/climaid-backend';
} else if (hostname === 'insight.climaid.dk') {
	climaidApiHost = 'https://services.senti.cloud/climaid-backend';
} else {
	climaidApiHost = 'https://services.senti.cloud/climaid-backend';
}

export const setTokenClimaid = () => {
	try {
		let token = cookie.load('SESSION').token;
		climaidApi.setHeader('Authorization', 'Bearer ' + token);
		return true;
	} catch (error) {
		return false
	}
}

export const climaidApi = create({
	baseURL: climaidApiHost,
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

export const updateBuilding = async (postData) => {
	let data = await climaidApi.put('/building/' + postData.uuid, postData).then(rs => rs.data);
	return data;
};

export const addBuildingImage = async (uuid, formData) => {
	let data = await climaidApi.post('/building/' + uuid + '/image', formData).then(rs => rs.status);
	return data;
};

export const getBuildingImage = async (uuid) => {
	let data = await climaidApi.get('/building/' + uuid + '/image').then(rs => rs.data);
	// console.log(data);
	return data;
};

export const getBuildingDevices = async (uuid) => {
	let data = await climaidApi.get('/building/' + uuid + '/devices').then(rs => rs.data);
	// console.log(data);
	return data;
};

export const deleteBuilding = async (uuid) => {
	let data = await climaidApi.delete('/building/' + uuid).then(rs => rs.data);
	return data;
}

export const setBuildingPermissions = async (uuid, permissions) => {
	let data = await climaidApi.post('/building/' + uuid + '/permissions', permissions).then(rs => rs.data);
	return data;
}

export const getBuildingPermissions = async (uuid) => {
	let data = await climaidApi.get('/building/' + uuid + '/permissions').then(rs => rs.data);
	return data;
}

export const getRoom = async (uuid) => {
	let data = await climaidApi.get('/room/' + uuid).then(rs => rs.data);
	// console.log(data);
	return data;
};

export const addRoom = async (roomData) => {
	let data = await climaidApi.post('/room', roomData).then(rs => rs.data);
	return data;
};

export const updateRoom = async (roomData) => {
	let data = await climaidApi.put('/room/' + roomData.uuid, roomData).then(rs => rs.data);
	return data;
};

export const deleteRoom = async (uuid) => {
	let data = await climaidApi.delete('/room/' + uuid).then(rs => rs.data);
	return data;
};

export const addRoomImage = async (uuid, formData) => {
	let data = await climaidApi.post('/room/' + uuid + '/image', formData).then(rs => rs.status);
	return data;
};

export const getRoomImage = async (uuid) => {
	let data = await climaidApi.get('/room/' + uuid + '/image').then(rs => rs.data);
	return data;
};

export const getRoomDevices = async (uuid) => {
	let data = await climaidApi.get('/room/' + uuid + '/devices').then(rs => rs.data);
	return data;
};

export const addRoomDevice = async (uuid, formData) => {
	let data = await climaidApi.post('/room/' + uuid + '/device', formData).then(rs => rs.data);
	return data;
};

export const updateRoomDevice = async (uuid, formData) => {
	let data = await climaidApi.put('/room/' + uuid + '/device', formData).then(rs => rs.data);
	return data;
};

export const deleteRoomDevice = async (roomUuid, deviceUuid) => {
	let data = await climaidApi.delete('/room/' + roomUuid + '/device/' + deviceUuid).then(rs => rs.data);
	return data;
};

export const getRooms = async () => {
	let data = await climaidApi.get('/rooms').then(rs => rs.data);
	// console.log(data);
	return data;
};

export const getDevice = async (uuid) => {
	let data = await climaidApi.get('/device/' + uuid).then(rs => rs.data);
	return data;
};

export const getDevices = async () => {
	let data = await climaidApi.get('/devices').then(rs => rs.data);
	return data;
};

export const getWeather = async (date, lat, long) => {
	let data = await weatherApi.get('/' + date + '/' + lat + '/' + long + '/da').then(rs => rs.data);
	// console.log(data);
	return data;
};

export const getCsvExport = async (device, period) => {
	let data = await climaidApi.get('/export/roomdata/' + device + '/' + period.from + '/' + period.to + '/').then(rs => rs.data);
	return data;
}

// DEVICE DATA

export const getMeassurement = async (device, gauge) => {
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

	let data = await servicesAPI.get('/v1/devicedata-clean/' + device + '/' + from + '/' + to + '/' + gauge.type + '/' + gauge.function).then(rs => rs.data);
	return data;
};

export const getBatteryStatus = async (device) => {
	const startDate = moment().subtract(2, 'hours').format('YYYY-MM-DD HH:mm:ss');
	const endDate = moment().format('YYYY-MM-DD HH:mm:ss');

	let data = await servicesAPI.get('/v1/devicedata-clean/' + device + '/' + startDate + '/' + endDate + '/batteristatus/57').then(rs => rs.data);
	return data;
};

export const getDeviceOnlineStatus = async (device) => {
	const startDate = moment().subtract(20, 'minutes').format('YYYY-MM-DD HH:mm:ss');
	const endDate = moment().format('YYYY-MM-DD HH:mm:ss');

	let data = await servicesAPI.get('/v1/devicedata-clean/' + device + '/' + startDate + '/' + endDate + '/temperature/0').then(rs => rs.data);

	let status = false;
	if (data && Object.keys(data).length) {
		status = true;
	}

	return status;
}

export const getDeviceDataConverted = async (device, period, type) => {
	let cloudFunction = 13; //per day
	if (period.timeTypeData === 1) {
		cloudFunction = 0; //raw
	} else if (period.timeTypeData === 3) {
		cloudFunction = 14; // per hour
	}
	//console.log('/v1/devicedata-clean/' + device + '/' + period.from + '/' + period.to + '/' + type + '/' + cloudFunction);
	let data = await servicesAPI.get('/v1/devicedata-clean/' + device + '/' + period.from + '/' + period.to + '/' + type + '/' + cloudFunction).then(rs => rs.data);

	let convertedData = [];
	Object.keys(data).map(key => (
		convertedData.push({ date: key, value: data[key] })
	));

	return convertedData;
};

export const getQualitativeData = async (devices, period) => {
	let sort = 'byhour';
	if (period.timeType === 2) {
		sort = 'byday';
	}
	// console.log('/v2/climaidinsight/qualitative/' + sort + '/' + period.from + '/' + period.to);
	let data = await servicesAPI.post('/v2/climaidinsight/qualitative/' + sort + '/' + period.from + '/' + period.to, { "devices": devices }).then(rs => rs.data);
	return data;
}

export const getBuildingColorData = async (devices, period) => {
	const from = moment().startOf(period).format('YYYY-MM-DD HH:mm:ss');
	const to = moment().endOf(period).format('YYYY-MM-DD HH:mm:ss');

	const config = {
		"T_ben1": 19,
		"T_ben2": 20,
		"T_ben3": 21,
		"T_ben4": 23,
		"T_ben5": 24.5,
		"T_ben6": 26,
		"T_an_min": 21,
		"T_an_max": 23,
		"RH_ben1": 15,
		"RH_ben2": 25,
		"RH_ben3": 30,
		"RH_ben4": 65,
		"RH_ben5": 75,
		"RH_ben6": 85,
		"RH_an_min": 30,
		"RH_an_max": 65,
		"CO2_ben1": 800,
		"CO2_ben2": 1000,
		"CO2_ben3": 1200,
		"CO2_an_max": 800
	};

	let data = await servicesAPI.post('/v2/climaidinsight/colorstate/building/' + from + '/' + to + '/', { "devices": devices, "config": config }).then(rs => rs.data);
	return data;
}

export const getRoomColorData = async (devices) => {
	const config = {
		"T_ben1": 19,
		"T_ben2": 20,
		"T_ben3": 21,
		"T_ben4": 23,
		"T_ben5": 24.5,
		"T_ben6": 26,
		"T_an_min": 21,
		"T_an_max": 23,
		"RH_ben1": 15,
		"RH_ben2": 25,
		"RH_ben3": 30,
		"RH_ben4": 65,
		"RH_ben5": 75,
		"RH_ben6": 85,
		"RH_an_min": 30,
		"RH_an_max": 65,
		"CO2_ben1": 800,
		"CO2_ben2": 1000,
		"CO2_ben3": 1200,
		"CO2_an_max": 800
	};

	let data = await servicesAPI.post('/v2/climaidinsight/colorstate/room', { "devices": devices, "config": config }).then(rs => rs.data);
	return data;
}

export const getRoomActivityLevel = async (device) => {
	const config = {
		"firstday": 0,
		"lastday": 4,
		"firsthour": 7,
		"lasthour": 16
	}

	const from = moment().startOf('month').format('YYYY-MM-DD');
	const to = moment().endOf('month').format('YYYY-MM-DD');
	// console.log('/v2/climaidinsight/activity/' + from + '/' + to);
	// console.log({ "devices": [device], "config": config });
	let data = await servicesAPI.post('/v2/climaidinsight/activity/' + from + '/' + to, { "devices": [device], "config": config }).then(rs => rs.data);
	return data;
}

export const getActivityLevelData = async (devices, period) => {
	let sort = 'byquarter';
	if (period.timeType === 2) {
		//sort = 'byday';
	}

	const config = {
		"firstday": 0,
		"lastday": 6,
		"firsthour": 7,
		"lasthour": 16
	}

	let data = await servicesAPI.post('/v2/climaidinsight/activity/' + sort + '/' + period.from + '/' + period.to, { "devices": devices, "config": config }).then(rs => rs.data);
	return data;
}

setTokenClimaid();

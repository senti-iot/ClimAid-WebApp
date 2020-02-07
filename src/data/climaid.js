import { create } from 'apisauce';

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
	console.log(data);
	return data;
};

export const getRooms = async (uuid) => {
	let data = await climaidApi.get('/rooms/' + uuid).then(rs => rs.data);
	console.log(data);
	return data;
};

export const getRoom = async (uuid) => {
	let data = await climaidApi.get('/room/' + uuid).then(rs => rs.data);
	console.log(data);
	return data;
};

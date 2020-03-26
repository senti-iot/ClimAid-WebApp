import { create } from 'apisauce'
import cookie from 'react-cookies'
import crypto from 'crypto'

const { REACT_APP_ENCRYPTION_KEY } = process.env
const IV_LENGTH = 16

const encrypt = (text) => {
	let iv = crypto.randomBytes(IV_LENGTH)
	let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer.from(REACT_APP_ENCRYPTION_KEY), iv)
	let encrypted = cipher.update(text)

	encrypted = Buffer.concat([encrypted, cipher.final()])

	return iv.toString('hex') + ':' + encrypted.toString('hex')
}

let backendHost;

//const hostname = window && window.location && window.location.hostname;

backendHost = 'https://dev.services.senti.cloud/core';

export const loginApi = create({
	baseURL: backendHost,
	timout: 30000,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
})

export const weatherApi = create({
	baseURL: `https://api.senti.cloud/weather/v1/`,
	timeout: 30000,
	headers: {
		'auth': encrypt(process.env.REACT_APP_ENCRYPTION_KEY),
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		// 'Cache-Control': 'public, max-age=86400'
	}
})
export const mapApi = create({
	baseURL: 'https://maps.googleapis.com/maps/api/geocode/',
	timeout: 30000,
	params: {
		key: process.env.REACT_APP_SENTI_MAPSKEY
	}
})

export const makeCancelable = (promise) => {
	let hasCanceled_ = false;

	const wrappedPromise = new Promise((resolve, reject) => {
		promise.then((val) =>
			hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)
		);
		promise.catch((error) =>
			hasCanceled_ ? reject({ isCanceled: true }) : reject(error)
		);
	});

	return {
		promise: wrappedPromise,
		cancel() {
			hasCanceled_ = true;
		},
	};
};
export const api = create({
	baseURL: backendHost,
	timeout: 30000,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Authorization': '',
		// 'Cache-Control': 'public, max-age=86400'
	},
})

export const setToken = () => {
	try {
		let token = cookie.load('SESSION').token;
		api.setHeader('Authorization', 'Bearer ' + token);
		return true;
	}
	catch (error) {
		return false
	}

}
setToken()

//#region Senti Services

export const servicesAPI = create({
	baseURL: 'https://dev.services.senti.cloud/databroker',
	timeout: 30000,
	headers: {
		'auth': encrypt(process.env.REACT_APP_ENCRYPTION_KEY),
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		// 'Cache-Control': 'public, max-age=86400'
	}
})

export const dataExportAPI = create({
	baseURL: 'https://services.senti.cloud/data-export',
	// baseURL: 'localhost:3021',
	timeout: 300000,
	headers: {
		'auth': encrypt(process.env.REACT_APP_ENCRYPTION_KEY),
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
})
//#endregion
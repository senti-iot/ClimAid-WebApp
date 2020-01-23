/* eslint-disable no-func-assign */
import store from 'store';

let PREFIX = 'sentiWaterworks.';

export const setPrefix = (id) => {
	if (PREFIX.includes(id)) {
		PREFIX = 'sentiWaterworks.' + id + '.'
	}
	else {
		PREFIX = PREFIX + id + '.'
	}
}
export function del(key) {
	return store.remove(PREFIX + key)
}
export function get(key) {
	return store.get(PREFIX + key);
}
export const setAll = (key, value) => {
	return store.set('sentiWaterworks.' + key, value)
}
export const getAll = (key) => {
	return store.get('sentiWaterworks.' + key)
}
export function rGet(key) {
	return store.get(key)
}
export function rSet(key, value) {
	return store.set(key, value)
}
export function set(key, value) {
	return store.set(PREFIX + key, value);
}

function init() {
	if (!store.enabled) {
		get = function () { };
		set = function () { };
	}
}

init();

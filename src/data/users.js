import { api } from './data';

export const getAllUsers = async () => {
	let data = await api.get('core/users').then(rs => rs.data)
	data.forEach(d => {
		if (d.aux) {
			delete d.aux.favorites
			delete d.aux.settings
		}
	})
	return data
}
export const getValidSession = async () => {
	let data = await api.get(`/v2/auth`).then(rs => rs)
	return data
}
export const getUser = async (uuid) => {
	let data = await api.get(`/v2/entity/user/` + uuid).then(rs => rs.data)
	return data
}

export const addUser = async (userData) => {
	let status = await api.post(`/v2/entity/user`, userData).then(rs => rs.status)
	return status
}

export const updateUser = async (uuid, userData) => {
	let data = await api.put('/v2/entity/user/' + uuid, userData).then(rs => rs.data)
	return data
}

export const deleteUser = async (uuid) => {
	let status = await api.delete(`/v2/entity/user/` + uuid).then(rs => rs.status)
	return status
}

export const getLoggedInUser = async () => {
	let data = await api.get(`/v2/auth/user`).then(rs => rs.data)
	return data
}

export const getUserOrgs = async () => {
	let data = await api.get(`/v2/entity/organisations`).then(rs => rs.data)
	return data
}

export const getOrgUsers = async (uuid) => {
	let data = await api.get('/v2/entity/users/' + uuid).then(rs => rs.data)
	return data
}

export const getUsers = async () => {
	let data = await api.get('/v2/entity/users').then(rs => rs.data)
	return data
}

export const getRoles = async () => {
	let data = await api.get('/v2/entity/roles').then(rs => rs.data)
	return data
}

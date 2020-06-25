import { loginApi, api } from './data';
import cookie from 'react-cookies';

/**
 *
 * @param {String} username
 * @param {String} password
 */
export const loginUser = async (username, password, organisationId) => {
	var session = await loginApi.post('/v2/auth/organisation', JSON.stringify({ username: username, password: password, orgNickname: organisationId })).then(rs => rs.data)
	return session
}
export const loginUserViaGoogle = async (token) => {
	var session = await api.post('senti/googleauth', { id_token: token }).then(rs => rs.data)
	return session
}
/**
 * @function logOut Log out function
 */
export const logOut = async () => {
	var session = cookie.load('SESSION')
	var data = await loginApi.delete(`/v2/auth/${session.token}`)
	cookie.remove('SESSION')
	return data
}
/**
 *
 * @param {String} email User's e-mail
 */
export const resetPassword = async (email) => {
	let response = await api.post(`/v2/entity/user/forgotpassword`, { email: email }).then(rs => rs);
	return response.status;
}
/**
 *
 * @param {object} obj
 * @param {String} obj.newPassword New Password
 * @param {String} obj.passwordToken Confirm new password token
 */
export const confirmPassword = async (obj) => {
	let response = await api.post(`/v2/entity/user/forgotpassword/set`, obj).then(rs => rs)
	return response.status
}
/**
 *
 * @param {object} obj
 * @param {String} obj.id User ID
 * @param {String} obj.oldPassword Old Password - Not required
 * @param {String} obj.newPassword New Password
 */
// export const setPassword = async (obj) => {
// 	let data = await api.post(`/user/setpassword`, obj).then(rs => rs.data)
// 	return data
// }
/**
 *
 * @param {object} user
 */
export const saveSettings = async (user) => {
	var data = await api.put(`/user/${user.id}`, user).then(rs => rs.data)
	return data
}
import moment from 'moment'
/**
 * Date Formatter 'LL' format
 * @param {Date} date
 */
export const dateFormatter = (date) => {
	var a = moment(date).format('LL')
	return a
}

const isObject = (obj) => {
	return obj === Object(obj);
}

export const keyTester = (obj, sstr) => {
	let searchStr = sstr.toLowerCase()
	let found = false
	if (isObject(obj)) {
		for (var k in obj) {
			if (!found) {
				if (k instanceof Date) {
					let date = dateFormatter(obj[k])
					found = date.toLowerCase().includes(searchStr)
				}
				else {
					if (isObject(obj[k])) {
						found = keyTester(obj[k], sstr)
					}
					else {
						found = obj[k] ? obj[k].toString().toLowerCase().includes(searchStr) : false
					}
				}
			}
			else {
				break
			}
		}
	}
	else {
		found = obj ? obj.toString().toLowerCase().includes(searchStr) : null
	}
	return found
}

export const filterItems = (data, filters) => {
	const { activeDateFilter, keyword } = filters
	var arr = data
	if (activeDateFilter)
		arr = filterByDate(arr, filters)
	if (arr) {
		if (arr[0] === undefined)
			return []
		var keys = Object.keys(arr[0])
		var filtered = arr.filter(c => {
			var contains = keys.map(key => {
				if (c)
					return keyTester(c[key], keyword ? keyword : '')
				return false

			})
			return contains.indexOf(true) !== -1 ? true : false
		})
		return filtered
	}
}

const _ = require('lodash')
const index = (obj, is) => {
	let newA = _.get(obj, is) !== undefined ? _.get(obj, is) : undefined
	return newA
}
const filterByDate = (items, k) => {
	return items = items.reduce((newArr, d) => {
		let objVal = index(d, k.key)
		if (objVal)
			if (k.value.after) {
				if (moment(objVal).isAfter(moment(k.value.date)))
					newArr.push(d)
			}
			else {
				if (moment(objVal).isBefore(moment(k.value.date)))
					newArr.push(d)
			}
		return newArr
	}, [])
}

const filterByString = (items, k) => {
	if (k.key === "") {
		return items = filterItems(items, { keyword: k.value })
	}
	else
		return items = items.reduce((newArr, d) => {
			let objVal = index(d, k.key)
			if (objVal !== null && objVal !== undefined) {
				if (objVal.toString().toLowerCase().includes(k.value.toString().toLowerCase()))
					newArr.push(d)
				else {
					if (objVal.hasOwnProperty(k.value)) {
						newArr.push(d)
					}
				}
			}

			return newArr
		}, [])
}

const filterByDiff = (items, k) => {
	items = items.reduce((newArr, d) => {
		let objVal = index(d, k.key)
		if (k.value.diff) {
			if (k.value.values.false.indexOf(objVal) === -1)
				newArr.push(d)
		}
		else {
			if (k.value.values.false.indexOf(objVal) !== -1)
				newArr.push(d)
		}
		return newArr
	}, [])
	return items
}

export const customFilterItems = (items, keyValues) => {
	keyValues.forEach(k => {
		switch (k.type) {
			case 'string':
			case 'dropDown':
			case null:
				items = filterByString(items, k)
				break;
			case 'date':
				items = filterByDate(items, k)
				break;
			case 'diff':
				items = filterByDiff(items, k)
				break;
			default:
				break;
		}
	})
	return items
}

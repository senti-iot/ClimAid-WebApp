const updateFilters = 'updateFilters'
const changeTRP = 'changeTableRows'
const changeMT = 'changeMapTheme'
const changeCT = 'changeChartType'
const changeHM = 'changeHeatMap'
const changeYAXIS = 'changeYAxis'
const changeCPP = 'changeCardsPerPage'
const changeEventHandler = 'changeEH'
const changeSM = 'changeSmallmenu'
const changeT = 'changeTabs'
const sDevice = 'selectDevice'
const sExportDevice = 'selectExportDevice'
const getSettings = 'getSettings'

export const changeSmallMenu = (val) => {
	return dispatch => {
		dispatch({
			type: changeSM,
			smallMenu: val
		})
	}
}
export const changeEH = (bool) => {
	return dispatch => {
		dispatch({ type: changeEventHandler, EH: bool })
	}
}
export const changeCardsPerPage = (val) => {
	return (dispatch) => {
		dispatch({ type: changeCPP, CPP: val })
	}
}
export const changeYAxis = (val) => {
	return (dispatch) => {
		dispatch({ type: changeYAXIS, chartYAxis: val })
	}
}
export const changeHeatMap = (val) => {
	return (dispatch) => {
		dispatch({ type: changeHM, heatMap: val })
	}
}
export const changeChartType = (val) => {
	return (dispatch) => {
		dispatch({ type: changeCT, chartType: val })
	}
}
export const changeMapTheme = (val) => {
	return (dispatch) => {
		dispatch({ type: changeMT, mapTheme: val })
	}
}

export const changeTableRows = (val) => {
	return (dispatch, getState) => {
		let trp = val
		if (val.toString().includes('auto')) {
			let height = window.innerHeight
			let rows = Math.round((height - 70 - 48 - 30 - 64 - 56 - 30 - 56 - 30) / 49)
			trp = rows
			dispatch({ type: 'autoRowsPerPage', payload: trp })
		}
		dispatch({ type: changeTRP, trp: trp, trpStr: val })
	}
}

export const addFilter = (f, type) => {
	return (dispatch, getState) => {
		let filters = []
		filters = [...getState().appState.filters[type]]
		let id = filters.length
		filters.push({ ...f, id })
		dispatch({
			type: updateFilters,
			filters: {
				[type]: filters
			}
		})
		return id
	}
}
export const editFilter = (f, type) => {
	return (dispatch, getState) => {
		let filters = []

		filters = [...getState().appState.filters[type]]
		let filterIndex = filters.findIndex(fi => fi.id === f.id)
		filters[filterIndex] = f
		dispatch({
			type: updateFilters,
			filters: {
				[type]: filters
			}
		})
	}
}
export const removeFilter = (f, type) => {
	return (dispatch, getState) => {
		let filters = []
		filters = [...getState().appState.filters[type]]
		filters = filters.filter(filter => {
			return filter.id !== f.id
		})
		dispatch({
			type: updateFilters,
			filters: {
				[type]: filters
			}
		})
	}
}
export const changeTabs = tabs => {
	return dispatch => {
		dispatch({
			type: changeT,
			tabs: tabs
		})
	}
}
export const selectAllDevices = (b) => {
	return (dispatch, getState) => {
		if (b) {
			let devices = getState().data.devices
			let newSDevices = devices.map(d => d.id)
			dispatch({
				type: sDevice,
				payload: newSDevices
			})
		}
		else {
			dispatch({
				type: sDevice,
				payload: []
			})
		}
	}
}
export const setSelectedExportDevices = (devices) => {
	return (dispatch, getState) => {
		dispatch({
			type: sExportDevice,
			payload: devices
		})
	}
}
export const setSelectedDevices = (devices) => {
	return (dispatch, getState) => {
		dispatch({
			type: sDevice,
			payload: devices
		})
	}
}
export const selectDevice = (b, device) => {
	return (dispatch, getState) => {
		let newSDevices = []
		let selectedDevices = getState().appState.selectedDevices
		newSDevices = [...selectedDevices]
		if (b) {
			newSDevices = newSDevices.filter(d => d.toString() !== device)
		}
		else {
			newSDevices.push(device)
		}
		dispatch({
			type: sDevice,
			payload: newSDevices
		})

	}
}

const initialState = {
	selectedExportDevices: [],
	selectedDevices: [],
	tabs: {
		id: '',
		route: 0,
		data: [],
		// filters: {
		// keyword: ''
		// },
		tabs: [],
		// noSearch: true
	},
	eH: true,
	CPP: 9,
	chartYAxis: 'linear',
	trpStr: null,
	heatMap: false,
	chartType: null,
	mapTheme: null,
	smallMenu: true,
	trp: null,
	filters: {
		tokens: [],
		favorites: [],
		projects: [],
		devices: [],
		collections: [],
		orgs: [],
		users: [],
		registries: [],
		devicetypes: [],
		sensors: [],
		functions: [],
		messages: [],
	}

}

export const appState = (state = initialState, action) => {
	switch (action.type) {
		case 'RESET_APP':
			return initialState
		case changeT:
			return Object.assign({}, state, { tabs: action.tabs })
		case getSettings:
			return Object.assign({}, state, { smallMenu: action.settings.drawerState !== undefined ? action.settings.drawerState : true })
		case changeSM:
			return Object.assign({}, state, { smallMenu: action.smallMenu })
		case changeEventHandler:
			return Object.assign({}, state, { EH: action.EH })
		case changeCPP:
			return Object.assign({}, state, { CPP: action.CPP })
		case changeYAXIS:
			return Object.assign({}, state, { chartYAxis: action.chartYAxis })
		case changeHM:
			return Object.assign({}, state, { heatMap: action.heatMap })
		case changeCT:
			return Object.assign({}, state, { chartType: action.chartType })
		case changeMT:
			return Object.assign({}, state, { mapTheme: action.mapTheme })
		case changeTRP:
			return Object.assign({}, state, { trp: action.trp })
		case updateFilters:
			return Object.assign({}, state, { filters: { ...state.filters, ...action.filters } })
		case sDevice:
			return Object.assign({}, state, { selectedDevices: action.payload })
		case sExportDevice:
			return Object.assign({}, state, { selectedExportDevices: action.payload })
		default:
			return state
	}
}

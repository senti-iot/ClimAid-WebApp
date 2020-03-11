const getSettings = 'getSettings'

const initialState = {
}

export const appState = (state = initialState, action) => {
	switch (action.type) {
		case 'RESET_APP':
			return initialState
		case getSettings:
			return Object.assign({}, state, { smallMenu: action.settings.drawerState !== undefined ? action.settings.drawerState : true })
		default:
			return state
	}
}

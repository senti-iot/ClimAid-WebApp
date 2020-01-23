import React, { Fragment, useRef, useEffect, useState } from 'react'
import FilterInput from './FilterInput'
import FilterCard from './FilterCard'
import { useSelector, useDispatch } from 'react-redux'
import { MenuItem, MenuList, ClickAwayListener, Paper, Popper, Grow } from '@material-ui/core'
import { addFilter, editFilter as eF, removeFilter, changeEH } from 'Redux/appState'
import { useLocalization } from 'Hooks'
import PropTypes from 'prop-types'

const FilterToolbar = (props) => {
	const [error, setError] = useState(false)
	const [state, setState] = useState({})
	const [openFilterCard, setOpenFilterCard] = useState(false)
	const [actionAnchor, setActionAnchor] = useState(null)
	const [focusedMenu, setFocusedMenu] = useState(-1)
	const [editFilter, setEditFilter] = useState(null)
	const [editChip, setEditChip] = useState(null)
	const dispatch = useDispatch()
	const redux = {
		addFilter: (filter, type) => dispatch(addFilter(filter, type)),
		editFilter: (filter, type) => dispatch(eF(filter, type)),
		removeFilter: (filter, type) => dispatch(removeFilter(filter, type)),
		disableEH: () => dispatch(changeEH(false)),
		enableEH: () => dispatch(changeEH(true))
	}
	const chip = useRef(null)
	const input = useRef(null)
	const t = useLocalization()

	const { filters, reduxKey } = props

	const chips = useSelector(s => s.appState.filters)
	const eH = useSelector(s => s.appState.eH)

	const handleMenuNav = e => {
		if (actionAnchor !== null) {
			switch (e.keyCode) {
				case 13:
					const ft = filters[focusedMenu]
					if (ft) {
						setState(prevState => ({ ...prevState, [ft.name]: true }))
						setActionAnchor(null)
						setFocusedMenu(-1)
						setOpenFilterCard(true)
					}
					break;
				case 40: //keyboard down
					let nFocusedMenu = focusedMenu === (filters.length - 1) ? 0 : focusedMenu + 1
					setFocusedMenu(nFocusedMenu)
					break;
				case 38: //keyboard up
					setFocusedMenu(focusedMenu === 0 ? filters.length - 1 : focusedMenu - 1)
					break;
				case 27:
					// window.addEventListener('keydown', handleWindowKeyPress, false)
					setActionAnchor(null)
					setFocusedMenu(-1)
					break;
				default:
					if (actionAnchor !== null) {
						setActionAnchor(null)
					}
					break;
			}
			e.stopPropagation()
		}
		else {
			if (e.keyCode === 40)
				handleClick()
			if (e.keyCode === 27) {
				//TODO
				input.current.blur()
				handleBlur()
			}
		}
	}
	const handleClick = () => {
		// window.removeEventListener('keydown', handleWindowKeyPress, false)
		if (actionAnchor === null) {
			setActionAnchor(chip.current)
			// window.addEventListener('keydown', handleMenuNav, false)
			input.current.focus()
		}
		else {
			// window.addEventListener('keydown', handleWindowKeyPress, false)
			setActionAnchor(null)
		}
	}
	const handleWindowKeyPress = e => {
		if (actionAnchor === null && e.keyCode === 70 && !openFilterCard) {
			e.preventDefault()
			handleClick()
		}
	}
	useEffect(() => {
		// window.addEventListener('keydown', handleWindowKeyPress, false)
		return () => {
			window.removeEventListener('keydown', handleMenuNav, false)
			window.removeEventListener('keydown', handleWindowKeyPress, false)
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (eH) {
			// window.addEventListener('keydown', handleWindowKeyPress, false)
		}
		else {
			// window.removeEventListener('keydown', handleWindowKeyPress, false)
		}

	})


	const handleBlur = () => {
		// window.removeEventListener('keydown', handleMenuNav, false)
		// window.addEventListener('keydown', handleWindowKeyPress, false)
	}
	const handleFocus = () => {
		// window.addEventListener('keydown', handleMenuNav, false)
		// window.removeEventListener('keydown', handleWindowKeyPress, false)
	}
	const handleClose = () => {
		// window.addEventListener('keydown', handleWindowKeyPress, false)
		setActionAnchor(null)
	}

	const onBeforeAdd = (chip) => {
		if (typeof chip === 'string')
			if (chip.length >= 2)
				return true
			else {
				setError(true)
				setTimeout(() => {
					setError(false)
				}, 500);
				return false
			}
		else {
			return true
		}
	}

	const handleDoubleClick = chip => {

		let allChips = chips[reduxKey]
		let editChip = allChips[allChips.findIndex(c => c.id === chip.id)]
		let editFilter = filters[filters.findIndex(f => {
			return f.key === editChip.key && f.type === editChip.type
		})]
		setEditFilter(editFilter)
		setEditChip(editChip)
		redux.disableEH()
	}

	const handleAdd = (displayValue, value, key, type, icon, name) => {
		if (onBeforeAdd(value)) {
			setState(prevState => ({ ...prevState, [name]: false }))
			setOpenFilterCard(false)
			redux.addFilter({ value, key, type: type ? type : null, icon, displayValue: displayValue }, reduxKey)
		}
	}
	const handleEdit = (displayValue, value, key, type, icon, id) => {
		redux.editFilter({ id, value, key, type: type ? type : null, icon, displayValue: displayValue }, reduxKey)
		setEditFilter(false)
		setEditChip(null)
		redux.enableEH()
	}
	const handleDelete = (deletedChip) => {
		redux.removeFilter(deletedChip, reduxKey)
	}
	const handleMenuItem = ft => {
		setState(prevState => ({ ...prevState, [ft]: true }))
		setOpenFilterCard(true)
	}

	const isSelected = id => focusedMenu === id ? true : false

	return (
		<ClickAwayListener onClickAway={handleClose}>
			<Fragment>
				<FilterInput
					onBlur={handleBlur}
					inputRef={ref => input.current = ref}
					chipRef={ref => chip.current = ref}
					chips={chips[reduxKey]}
					onBeforeAdd={(chip) => onBeforeAdd(chip)}
					onBeforeDelete={handleClose}
					handleDoubleClick={handleDoubleClick}
					onFocus={handleFocus}
					onAdd={(displayValue, value, key) => handleAdd(displayValue, value, key)}
					onDelete={(deletedChip, i) => handleDelete(deletedChip, i)}
					handleClick={handleClick}
					dataSourceConfig={{ id: 'id', text: 'displayValue', value: 'displayValue' }}
					placeholder={t('actions.search')}
					fullWidth
				/>
				<Popper
					open={actionAnchor ? true : false}
					anchorEl={actionAnchor}
					placement="bottom-start"
					transition
					disablePortal
					modifiers={{
						hide: {
							enabled: false
						},
						flip: {
							enabled: false,
						},
						preventOverflow: {
							enabled: false,
							boundariesElement: 'scrollParent',
						}
					}}
					onClose={() => setActionAnchor(null)}
					style={{ zIndex: 1028, marginTop: 8 }}
				>
					{({ TransitionProps }) => (
						<Grow {...TransitionProps} timeout={350} style={{
							position: "absolute",
							top: 0
						}}>
							<Paper onClick={e => e.stopPropagation()} >
								<MenuList>
									{filters ? filters.map((ft, i) =>
										ft.hidden ? null :
											<MenuItem selected={isSelected(i)} key={i} onClick={() => handleMenuItem(ft.name)}>
												{ft.name}
											</MenuItem>
									) : null}
								</MenuList>
							</Paper>
						</Grow>)}
				</Popper>
				{editFilter ? <FilterCard
					open={editFilter ? true : false}
					anchorEl={input.current}
					title={editFilter.name}
					type={editFilter.type}
					options={editFilter.options}
					content={editFilter.content}
					hidden={editFilter.hidden}
					edit
					pValue={editChip.value}
					handleButton={(displayValue, value, icon) => { handleEdit(displayValue, value, editFilter.key, editFilter.type, icon, editChip.id) }}
					handleClose={() => { setEditFilter(false); setEditChip(null) }}
				/> : null}
				{filters ? filters.map((ft, i) => {
					return <FilterCard
						resetError={() => setError(false)}
						error={error}
						key={i}
						open={state[ft.name]}
						anchorEl={input.current}
						title={ft.name}
						hidden={ft.hidden}
						type={ft.type}
						options={ft.options}
						content={ft.content}
						handleButton={(displayValue, value, icon) => { handleAdd(displayValue, value, ft.key, ft.type, icon, ft.name) }}
						handleClose={() => {
							setState(prevState => ({ ...prevState, [ft.name]: false }))
							setOpenFilterCard(false)
						}}
					/>
				}) : null}
			</Fragment>
		</ClickAwayListener>
	)

}

FilterToolbar.propTypes = {
	reduxKey: PropTypes.string.isRequired,
	filters: PropTypes.array.isRequired,
}

export default FilterToolbar

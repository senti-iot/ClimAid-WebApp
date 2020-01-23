import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Chip from '@material-ui/core/Chip'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import cx from 'classnames'
import { Add } from 'variables/icons';
import { makeStyles } from '@material-ui/styles'
import { usePrevious, useLocalization } from 'Hooks'

const styles = makeStyles(theme => {
	const light = theme.palette.type === 'light'
	const bottomLineColor = light ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)'

	return ({
		formControl: {
		},
		chips: {},
		root: {
			background: "rgba(255, 255, 255, 0.1)",
			borderRadius: "4px"
		},
		inputRoot: {
			flex: 1,
			// position: 'absolute',
			// [theme.breakpoints.down('sm')]: {
			// 	position: 'relative'
			// },
			padding: 8,
			display: 'inline-block',
			marginTop: 0,
		},
		input: {
			display: 'inline-block',
			appearance: 'none',
			WebkitTapHighlightColor: 'rgba(0,0,0,0)',
			float: 'left',
			"&::placeholder": {
				textOverflow: 'elipsis',
				fontSize: "0.8125rem"
			}
		},
		chipContainer: {
			cursor: 'text',
			display: 'flex',
			// marginBottom: -2,
			minHeight: 40,
			padding: 8,
			'&$labeled': {
				marginTop: 18
			},
			// [theme.breakpoints.down('md')]: {
			// 	margin: 4
			// }
		},
		labeled: {},
		label: {
			top: 4
		},
		labelShrink: {
			top: 0
		},
		helperText: {
			marginBottom: -20
		},
		inkbar: {
			'&:after': {
				[theme.breakpoints.down('md')]: {
					margin: 2
				},
				backgroundColor: theme.palette.primary[light ? 'dark' : 'light'],
				left: 0,
				bottom: 0,
				content: '""',
				height: 2,
				position: 'absolute',
				right: 0,
				transform: 'scaleX(0)',
				transition: theme.transitions.create('transform', {
					duration: theme.transitions.duration.shorter,
					easing: theme.transitions.easing.easeOut
				}),
				pointerEvents: 'none'
			},
			'&$focused:after': {
				transform: 'scaleX(1)'
			}
		},
		focused: {
		},
		disabled: {},
		underline: {
			'&:before': {
				left: 0,
				bottom: 0,
				content: '""',
				height: 0,
				position: 'absolute',
				right: 0,
				transition: theme.transitions.create('background-color', {
					duration: theme.transitions.duration.shorter,
					easing: theme.transitions.easing.ease
				}),
				pointerEvents: 'none'
			},
			'&:hover:not($disabled):before': {
				height: 0
			},
			'&$disabled:before': {
				background: 'transparent',
				backgroundImage: `linear-gradient(to right, ${bottomLineColor} 33%, transparent 0%)`,
				backgroundPosition: 'left top',
				backgroundRepeat: 'repeat-x',
				backgroundSize: '5px 1px'
			}
		},
		error: {
			'&:after': {
				backgroundColor: theme.palette.error.main,
				transform: 'scaleX(1)'
			}
		},
		chip: {
			color: theme.palette.type === 'light' ? 'inherit' : '#fff',
			margin: 8,
			float: 'left',
			'&:focused': {
				background: theme.palette.primary[light ? 'dark' : 'light']
			}
		},
		chipSelected: {
			background: theme.palette.primary[light ? 'dark' : 'light'] + ' !important',
			color: '#fff'

		}
	})
})

const FilterInput = ({ allowDuplicates = false, blurBehavior = 'clear', clearInputValueOnChange = false, newChipKeyCodes = [13], ...props }) => {
	const [isFocused, setIsFocused] = useState(false)

	const [focusedChip, setFocusedChip] = useState(null)
	const [inputValue, setInputValue] = useState('')


	const {
		disabled, chips, children, chipRenderer = defaultChipRenderer, className, dataSource,
		disableUnderline, error, filter, FormHelperTextProps, fullWidth, fullWidthInput, helperText, id,
		InputProps, InputLabelProps = {}, label, onBeforeAdd, onKeyPress, placeholder, required,
		rootRef, handleClick, chipRef, dataSourceConfig, onAdd, onChange, handleDoubleClick,
		onDelete, inputRef, onBeforeDelete, onKeyDown, onBlur, onFocus, onUpdateInput, onKeyUp,
		...other
	} = props

	const prevChips = usePrevious(chips)

	useEffect(() => {
		if (disabled) {
			setFocusedChip(null)
		}
		if (chips && clearInputValueOnChange && chips.length !== prevChips.length) {
			setInputValue('')
		}
	}, [chips, clearInputValueOnChange, disabled, prevChips])

	/**
	 * Blurs this component.
	 * @public
	 */
	// const blur = () => {
	// 	//TODO
	// 	actualInput.blur()
	// }

	/**
	 * Focuses this component.
	 * @public
	 */
	const focus = () => {
		if (focusedChip != null) {
			setFocusedChip(null)
		}
		// if (this.state.focusedChip != null) {
		// this.setState({ focusedChip: null })
		// }
	}
	let inputBlurTimeout = null

	useEffect(() => {
		return () => {
			clearTimeout(inputBlurTimeout)
		};
	}, [inputBlurTimeout])

	const handleInputBlur = (event) => {
		if (onBlur) {
			onBlur(event)
		}
		setIsFocused(false)
		// this.setState({ isFocused: false })
		if (focusedChip != null) {
			// this.setState({ focusedChip: null })
			setFocusedChip(null)
		}
		if (blurBehavior === 'add') {
			let numChipsBefore = chips.length
			let nValue = event.target.value
			//TODO
			inputBlurTimeout = setTimeout(() => {
				let numChipsAfter = chips.length
				if (numChipsBefore === numChipsAfter) {
					handleAddChip(nValue)
				} else {
					clearInput()
				}
			}, 150)
		} else if (blurBehavior === 'clear') {
			clearInput()
		}
	}
	const handleInputFocus = (event) => {
		setIsFocused(true)
		if (onFocus) {
			onFocus(event)
		}
	}
	const [keyPressed, setKeyPressed] = useState(false)
	const [preventChipCreation, setPreventChipCreation] = useState(false)

	const handleKeyDown = (event) => {
		const nChips = chips

		setKeyPressed(false)
		setPreventChipCreation(false)
		if (onKeyDown) {
			onKeyDown(event)
			if (event.isDefaultPrevented()) {
				return
			}
		}
		if (event.keyCode === 37) {
			if (onBeforeDelete)
				onBeforeDelete()
		}
		if (newChipKeyCodes.indexOf(event.keyCode) >= 0) {
			if (focusedChip !== null) {
				handleDoubleClick({ id: focusedChip })
			}
			else {
				if (event.target.value) {
					let result = handleAddChip({ key: "", value: event.target.value })
					if (result !== false) {
						event.preventDefault()
					}
				}
			}
		} else if (event.keyCode === 8 || event.keyCode === 46) {
			if (onBeforeDelete) {
				onBeforeDelete()
			}
			if (event.target.value === '') {
				if (focusedChip === null && event.keyCode === 8) {
					setFocusedChip(nChips.length - 1)
				} else if (focusedChip != null) {
					const chip = nChips[focusedChip]
					handleDeleteChip(chip)
					if (event.keyCode === 8 && focusedChip > 0) {
						setFocusedChip(focusedChip - 1)
					} else if (event.keyCode === 46 && focusedChip <= nChips.length - 1) {
						setFocusedChip(focusedChip)
					}
				}
			}
		} else if (event.keyCode === 37) {
			if (focusedChip == null && event.target.value === '' && nChips.length) {
				return setFocusedChip(nChips.length - 1)
			}
			if (focusedChip != null && focusedChip > 0) {
				setFocusedChip(focusedChip - 1)
			}
		} else if (event.keyCode === 39) {
			if (focusedChip != null && focusedChip < nChips.length - 1) {
				setFocusedChip(focusedChip + 1)
			} else {
				setFocusedChip(null)
			}
		} else {
			setFocusedChip(null)
		}
	}

	const handleKeyUp = (event) => {
		if (!preventChipCreation && newChipKeyCodes.indexOf(event.keyCode) > 0 && keyPressed) {
			clearInput()
		} else {
			setInputValue(event.target.value)
		}
		if (onKeyUp) {
			onKeyUp(event)
		}
	}

	const handleKeyPress = (event) => {
		setKeyPressed(true)
		// this.setState({ keyPressed: true })
		if (onBeforeDelete) { onBeforeDelete() }
		if (onKeyPress) { onKeyPress(event, { key: '', value: inputValue }) }
	}


	const handleUpdateInput = (e) => {
		setInputValue(e.target.value)
		// this.setState({ inputValue: e.target.value })

		if (onUpdateInput) {
			onUpdateInput(e)
		}
	}

	/**
	 * Handles adding a chip.
	 * @param {string|object} chip Value of the chip, either a string or an object (if dataSourceConfig is set)
	 * @returns True if the chip was added (or at least `onAdd` was called), false if adding the chip was prevented
	 */
	const handleAddChip = chip => {
		if (onBeforeAdd && !onBeforeAdd(chip.value)) {
			setPreventChipCreation(true)
			// this.setState({ preventChipCreation: true })
			return false
		}
		setInputValue('')
		// this.setState({ inputValue: '' })
		const pChips = chips

		if (dataSourceConfig) {
			if (typeof chip === 'string') {
				chip = {
					[dataSourceConfig.text]: chip,
					[dataSourceConfig.value]: chip
				}
			}

			if (allowDuplicates || !pChips.some((c) => c[dataSourceConfig.value] === chip[dataSourceConfig.value])) {
				if (chips && onAdd) {
					onAdd(chip.value, chip.value, chip.key)
				} else {
					// setChips([...pChips, chip])

					// this.setState({ chips: [...this.state.chips, chip] })
					if (onChange) {
						onChange([...pChips, chip])
					}
				}
			}
		} else if (chip.trim().length > 0) {
			if (allowDuplicates || pChips.indexOf(chip) === -1) {
				if (chips && onAdd) {
					onAdd(chip.value, chip.value, chip.key)
				} else {
					// setChips([...pChips, chip])
					if (onChange) {
						onChange([...pChips, chip])
					}
				}
			}
		} else {
			return false
		}
		return true
	}
	const handleDeleteChip = (chip, i) => {
		if (chips && chip) {
			if (onDelete) {
				onDelete({ ...chip })
				setFocusedChip(null)
			}
		} else {
			const nchips = chips.slice()
			const changed = nchips.splice(i, 1)
			let fChip = focusedChip
			if (changed) {
				if (fChip === i) {
					fChip = null
				} else if (fChip > i) {
					fChip = focusedChip - 1
				}
				// setChips(nchips)
				setFocusedChip(fChip)
				// this.setState({ chips, focusedChip })
				if (onChange) {
					onChange(nchips)
				}
			}
		}
	}

	/**
	 * Clears the text field for adding new chips.
	 * @public
	 */
	const clearInput = () => {
		setInputValue('')
	}

	/**
	 * Sets a reference to the Material-UI Input component.
	 * @param {object} input - The Input reference
	 */
	//TODO
	// setInputRef = (input) => {
	// this.input = input
	// }

	/**
	 * Set the reference to the actual input, that is the input of the Input.
	 * @param {object} ref - The reference
	 */
	//TODO
	let actualInput = useRef()

	const setActualInputRef = (ref) => {
		actualInput.current = ref
		if (inputRef) {
			inputRef(ref)
		}
	}
	const onDoubleClick = (chip) => {
		if (handleDoubleClick)
			handleDoubleClick(chip)
	}


	const hasInput = chips.length > 0 || inputValue.length > 0
	const shrinkFloatingLabel = InputLabelProps.shrink != null
		? InputLabelProps.shrink
		: (label != null && (hasInput || isFocused))
	const classes = styles()
	const t = useLocalization()
	return (
		<FormControl
			ref={rootRef} //TODO
			fullWidth={fullWidth}
			className={cx(className, classes.root, classes.formControl)}
			error={error}
			required={required}
			onClick={focus} //TODO
			disabled={disabled}
			{...other}
		>
			{label && (
				<InputLabel
					htmlFor={id}
					classes={{ root: classes.label, shrink: classes.labelShrink }}
					shrink={shrinkFloatingLabel}
					focused={isFocused}
					{...InputLabelProps}
				>
					{label}
				</InputLabel>
			)}
			<div className={cx(
				classes.chipContainer,
				{
					[classes.inkbar]: !disableUnderline,
					[classes.focused]: isFocused,
					[classes.underline]: !disableUnderline,
					[classes.disabled]: disabled,
					[classes.labeled]: label != null,
					[classes.error]: error
				})}
			>
				{chipRenderer({
					value: t('actions.addFilter'),
					text: t('actions.addFilter'),
					chip: t('actions.addFilter'),
					icon: <Add />,
					isDisabled: !!disabled,
					isFocused: false,
					className: classes.chip,
					iRef: chipRef,
					handleClick: handleClick
				})}
				{chips.length > 0 ? chips.map((tag, i) => {
					const value = dataSourceConfig ? tag[dataSourceConfig.id] : tag
					return chipRenderer({
						value,
						text: dataSourceConfig ? tag[dataSourceConfig.text] : tag,
						chip: tag,
						icon: tag.icon,
						isDisabled: !!disabled,
						isFocused: focusedChip === value,
						handleClick: () => setFocusedChip(value),
						handleDelete: () => handleDeleteChip({ id: value }),
						handleDoubleClick: () => onDoubleClick({ id: value }),
						className: classes.chip,
						classNameSelected: classes.chipSelected,
						classes: {

						}
					}, i)
				}) : null}{/* : chipRenderer({
						value: t('actions.addFilter'),
						text: t('actions.addFilter'),
						chip: t('actions.addFilter'),
						icon: <Add />,
						isDisabled: !!disabled,
						isFocused: false,
						className: classes.chip
					})} */}

				<Input
					// ref={this.setInputRef} //TODO
					classes={{ input: classes.input, root: classes.inputRoot }}
					id={id}
					value={inputValue}
					onChange={handleUpdateInput}
					onKeyDown={handleKeyDown}
					onKeyPress={handleKeyPress}
					onKeyUp={handleKeyUp}
					onFocus={handleInputFocus}
					onBlur={handleInputBlur}
					inputRef={setActualInputRef}//TODO
					disabled={disabled}
					disableUnderline
					fullWidth={fullWidthInput}
					placeholder={!hasInput && (shrinkFloatingLabel || label == null) ? placeholder : null}
					onClick={undefined}
					{...InputProps}
				/>
			</div>
			{helperText && (
				<FormHelperText
					{...FormHelperTextProps}
					className={FormHelperTextProps ? cx(FormHelperTextProps.className, classes.helperText) : classes.helperText}
				>
					{helperText}
				</FormHelperText>
			)}
		</FormControl>
	)
}


FilterInput.propTypes = {
	/** Allows duplicate chips if set to true. */
	allowDuplicates: PropTypes.bool,
	/** Behavior when the chip input is blurred: `'clear'` clears the input, `'add'` creates a chip and `'ignore'` keeps the input. */
	blurBehavior: PropTypes.oneOf(['clear', 'add', 'ignore']),
	/** A function of the type `({ value, text, chip, isFocused, isDisabled, handleClick, handleDelete, className }, key) => node` that returns a chip based on the given properties. This can be used to customize chip styles.  Each item in the `dataSource` array will be passed to `chipRenderer` as arguments `chip`, `value` and `text`. If `dataSource` is an array of objects and `dataSourceConfig` is present, then `value` and `text` will instead correspond to the object values defined in `dataSourceConfig`. If `dataSourceConfig` is not set and `dataSource` is an array of objects, then a custom `chipRenderer` must be set. `chip` is always the raw value from `dataSource`, either an object or a string. */
	chipRenderer: PropTypes.func,
	/** Whether the input value should be cleared if the `value` prop is changed. */
	clearInputValueOnChange: PropTypes.bool,
	/** Data source for auto complete. This should be an array of strings or objects. */
	dataSource: PropTypes.array,
	/** Config for objects list dataSource, e.g. `{ text: 'text', value: 'value' }`. If not specified, the `dataSource` must be a flat array of strings or a custom `chipRenderer` must be set to handle the objects. */
	dataSourceConfig: PropTypes.shape({
		text: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired
	}),
	/** The chips to display by default (for uncontrolled mode). */
	defaultValue: PropTypes.array,
	/** Disables the chip input if set to true. */
	disabled: PropTypes.bool,
	/** Props to pass through to the `FormHelperText` component. */
	FormHelperTextProps: PropTypes.object,
	/** If true, the chip input will fill the available width. */
	fullWidth: PropTypes.bool,
	/** If true, the input field will always be below the chips and fill the available space. By default, it will try to be beside the chips. */
	fullWidthInput: PropTypes.bool,
	/** Helper text that is displayed below the input. */
	helperText: PropTypes.node,
	/** Props to pass through to the `InputLabel`. */
	InputLabelProps: PropTypes.object,
	/** Props to pass through to the `Input`. */
	InputProps: PropTypes.object,
	/** Use this property to pass a ref callback to the native input component. */
	inputRef: PropTypes.func,
	/* The content of the floating label. */
	label: PropTypes.node,
	/** The key codes used to determine when to create a new chip. */
	newChipKeyCodes: PropTypes.arrayOf(PropTypes.number),
	/** Callback function that is called when a new chip was added (in controlled mode). */
	onAdd: PropTypes.func,
	/** Callback function that is called with the chip to be added and should return true to add the chip or false to prevent the chip from being added without clearing the text input. */
	onBeforeAdd: PropTypes.func,
	/** Callback function that is called when the chips change (in uncontrolled mode). */
	onChange: PropTypes.func,
	/** Callback function that is called when a new chip was removed (in controlled mode). */
	onDelete: PropTypes.func,
	/** Callback function that is called when the input changes. */
	onUpdateInput: PropTypes.func,
	/** A placeholder that is displayed if the input has no values. */
	placeholder: PropTypes.string,
	/** The chips to display (enables controlled mode if set). */
	value: PropTypes.array
}

export default FilterInput

export const defaultChipRenderer = ({ value, handleDoubleClick, text, isFocused, isDisabled, handleClick, handleDelete, className, icon, iRef, classNameSelected }, key) => (
	<Chip
		innerRef={ref => iRef ? iRef(ref) : undefined}
		key={key}
		className={`${className} ${isFocused ? classNameSelected : ""}`}
		icon={icon}
		style={{
			pointerEvents: isDisabled ? 'none' : undefined,
		}}
		onClick={handleClick}
		onDoubleClick={handleDoubleClick}
		onDelete={handleDelete}
		label={text}
	/>
)

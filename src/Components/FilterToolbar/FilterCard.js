import React, { Fragment, useState, useEffect } from 'react'

import { Card, IconButton, CardContent, Button, Popover, Typography, CardActions, Checkbox, colors } from '@material-ui/core';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Close, DateRange, AccessTime, KeyboardArrowRight, KeyboardArrowLeft } from 'variables/icons';
import { dateTimeFormatter } from 'data/functions';
import { TextF, DSelect, ItemG } from 'Components';
import moment from 'moment'
import cx from 'classnames'
import { usePrevious, useLocalization, useSelector } from 'Hooks';
import { makeStyles } from '@material-ui/styles';

const styles = makeStyles(theme => ({
	error: {
		animation: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
		transform: "translate3d(0, 0, 0)",
		backfaceVisibility: "hidden",
		perspective: 1000,
	},
	"@keyframes shake": {
		"10%, 90%": {
			transform: "translate3d(-1px, 0, 0)",
		},

		"20%, 80%": {
			transform: "translate3d(2px, 0, 0)",
		},

		"30%, 50%, 70%": {
			transform: "translate3d(-4px, 0, 0)",
		},

		"40%, 60%": {
			transform: "translate3d(4px, 0, 0)",
		}
	},

	headerText: {
		color: 'white',
	},
	header: {
		background: props => colors[props.color][400],
		color: 'white',
		padding: 8
	},
	menu: {
		padding: 0,
		background: props => colors[props.color][400]
	},
	content: {
		height: '100%'
	}
}))
const FilterCard = (props) => {
	const [value, setValue] = useState()
	const [date, setDate] = useState(moment())
	const [after, setAfter] = useState(false)
	const [diff, setDiff] = useState({ value: -1, icon: '', label: '' })
	const [dropdown, setDropdown] = useState({ value: -1, icon: '', label: '' })
	const { open, type, options, edit, pValue, handleButton, title, hidden, error, resetError, handleClose, anchorEl } = props
	const t = useLocalization()
	const prevOpen = usePrevious(open)
	const color = useSelector(s => s.settings.colorTheme)
	const classes = styles({ color })
	useEffect(() => {
		if (open && prevOpen !== open) {
			let obj = null
			if (type === 'diff') {
				obj = options.dropdown[options.dropdown.findIndex(d => d.value === 0 || d.value === false)]
				if (obj)
					setDiff({
						value: obj.value !== undefined || null ? obj.value : null,
						icon: obj.icon ? obj.icon : null,
						label: obj.label ? obj.label : null
					})
				else {
					setDiff({
						value: -1,
						icon: '',
						label: ''
					})
				}
			}
			if (type === 'dropDown') {
				obj = options[options.findIndex(d => d.value === 0 || d.value === false)]
				if (obj)
					setDropdown({
						value: obj.value !== undefined || null ? obj.value : null,
						icon: obj.icon ? obj.icon : null,
						label: obj.label ? obj.label : null
					})
				else {
					setDropdown({
						value: -1,
						icon: '',
						label: ''
					})
				}
			}

		}
	}, [open, options, prevOpen, type])
	// componentDidUpdate = (prevProps, prevState) => {
	// 	const { type, options } = this.props
	// 	if (this.props.open && prevProps.open !== this.props.open) {
	// 		let obj = null
	// 		if (type === 'diff') {
	// 			obj = options.dropdown[options.dropdown.findIndex(d => d.value === 0 || d.value === false)]
	// 		}
	// 		if (type === 'dropDown') {
	// 			obj = options[options.findIndex(d => d.value === 0 || d.value === false)]
	// 		}
	// 		this.setState({
	// 			diff: {
	// 				value: type === 'diff' ? obj ? obj.value !== undefined || null ? obj.value : null : null : null,
	// 				icon: type === 'diff' ? obj ? obj.icon ? obj.icon : null : null : null,
	// 				label: type === 'diff' ? obj ? obj.label ? obj.label : null : null : null
	// 			},
	// 			dropdown: {
	// 				value: type === 'dropDown' ? obj ? obj.value !== undefined || null ? obj.value : null : null : null,
	// 				icon: type === 'dropDown' ? obj ? obj.icon ? obj.icon : null : null : null,
	// 				label: type === 'dropDown' ? obj ? obj.label ? obj.label : null : null : null
	// 			}
	// 		})
	// 	}
	// }
	useEffect(() => {
		if (edit) {
			switch (type) {
				case 'dropDown':
					setDropdown({ value: pValue })
					// this.setState({
					// 	dropdown: {
					// 		value: value
					// 	}
					// })
					break;
				case 'diff':
					setDiff({ value: pValue })
					// this.setState({
					// diff: { value: value }
					// })
					break;
				case 'date':
					setDate({ date: moment(pValue.date, 'lll') })
					setAfter(pValue.after)
					// this.setState({
					// 	date: moment(value.date, 'lll'),
					// 	after: value.after
					// })
					break;
				case 'string':
				case undefined:
				case '':
				case null:
					setValue(pValue)
					break;
				default:
					break;
			}
		}
	}, [edit, pValue, type])
	// componentDidMount = (prevProps, prevState) => {
	// 	const { edit, type, pValue } = this.props
	// 	if (edit)
	// 		switch (type) {
	// 			case 'dropDown':
	// 				this.setState({
	// 					dropdown: {
	// 						value: value
	// 					}
	// 				})
	// 				break;
	// 			case 'diff':
	// 				this.setState({
	// 					diff: { value: value }
	// 				})
	// 				break;
	// 			case 'date':
	// 				this.setState({
	// 					date: moment(value.date, 'lll'),
	// 					after: value.after
	// 				})
	// 				break;
	// 			case 'string':
	// 			case undefined:
	// 			case '':
	// 			case null:
	// 				this.setState({
	// 					value: value,
	// 				})
	// 				break;
	// 			default:
	// 				break;
	// 		}
	// }

	const handleKeyDown = (key) => {
		if (open)
			switch (key.keyCode) {
				case 13:
					_handleButton()
					break;
				default:
					break;
			}
	}
	const handleKeyPress = (key) => {
		if (open)
			switch (key.keyCode) {
				case 13:
					_handleButton()
					break;

				default:
					break;
			}
	}
	const _handleButton = () => {
		if (type === 'dropDown') {
			handleButton(`${title}: ${dropdown.label}`, dropdown.value, dropdown.icon)
		}
		if (type === 'string') {
			if (hidden) {
				handleButton(`${value}`, value)
			}
			else {
				handleButton(`${title}: '${value}'`, value)
			}
		}
		if (type === 'date')
			handleButton(`${title} ${after ? t('filters.after') : t('filters.before')}: '${dateTimeFormatter(date)}'`, { date, after })
		if (type === 'diff')
			handleButton(`${title}: ${diff.label}`, { diff: diff.value, values: options.values })

		setValue('')
		setDate(moment())
		setDiff({ value: -1, label: '', icon: '' })
		setDropdown({ value: -1, label: '', icon: '' })
		// this.setState({
		// 	value: '',
		// 	date: moment(),
		// 	endDate: moment(),
		// 	diff: {
		// 		value: 0,
		// 		label: ""
		// 	},
		// 	dropdown: {
		// 		value: 0,
		// 		label: ""
		// 	}
		// })
	}
	const handleInput = e => {
		setValue(e.target.value)
		if (error) {
			resetError()
		}
		// this.setState({
		// 	value: e,
		// }, () => this.props.error ? this.props.resetError() : {})
	}
	const handleCustomDate = (e) => {

		setDate(e)

		// this.setState({
		// 	[key]: e
		// })
	}
	const handleChangeDropDown = e => {
		setDropdown({
			value: e.target.value,
			icon: options[options.findIndex(o => o.value === e.target.value)].icon,
			label: options[options.findIndex(o => o.value === e.target.value)].label
		})
	}
	const handleChangeDiff = e => {
		setDiff({
			value: e.target.value,
			icon: options.dropdown[options.dropdown.findIndex(o => o.value === e.target.value)].icon,
			label: options.dropdown[options.dropdown.findIndex(o => o.value === e.target.value)].label
		})
	}
	const renderType = () => {
		// const { t, classes, title, options } = this.props
		// const { date, value, after, dropdown, diff } = this.state
		switch (type) {
			case 'diff':
				return <DSelect
					fullWidth
					label={title}
					value={diff.value}
					onChange={handleChangeDiff}
					onKeyDown={handleKeyDown}
					menuItems={
						options.dropdown.map(o => ({ value: o.value, label: o.label, icon: o.icon }))
					} />
			case 'dropDown':
				return <DSelect
					fullWidth
					label={title}
					value={dropdown.value}
					onKeyDown={handleKeyDown}
					onChange={handleChangeDropDown}
					menuItems={
						options.map(o => ({ value: o.value, label: o.label, icon: o.icon }
						))
					} />
			case 'date':
				return <Fragment>
					<ItemG xs={12} container alignItems={'center'}>
						<Checkbox checked={after} onClick={() => setAfter(!after)} style={{ padding: "12px 12px 12px 0px" }} />
						<Typography>{t('filters.afterDate')}</Typography>
					</ItemG>
					<ItemG>
						<MuiPickersUtilsProvider utils={MomentUtils}>
							<DateTimePicker
								id={'date'}
								autoOk
								fullWidth
								clearable
								disableFuture
								ampm={false}
								format='LLL'
								value={date}
								autoFocus
								onChange={handleCustomDate}
								animateYearScrolling={false}
								color='primary'
								dateRangeIcon={<DateRange />}
								timeIcon={<AccessTime />}
								rightArrowIcon={<KeyboardArrowRight />}
								leftArrowIcon={<KeyboardArrowLeft />}
								InputLabelProps={{/*  FormLabelClasses: { root: classes.label, focused: classes.focused } */ }}
								InputProps={{ classes: { underline: classes.underline } }}
							/>
						</MuiPickersUtilsProvider>
					</ItemG>
				</Fragment>
			case 'string':
				return <TextF
					fullWidth
					id={'filter-text'}
					autoFocus
					onKeyDown={handleKeyDown}
					label={t('filters.contains')}
					value={value ? value : ""}
					onChange={handleInput} />
			default:
				break;
		}
	}

	const errorClassname = cx({
		[classes.error]: error
	})

	return (
		<Popover
			anchorEl={anchorEl}
			open={open ? open : false}
			onClose={handleClose}
			PaperProps={{ classes: { root: classes.menu } }}
		>
			<Card classes={{ root: errorClassname }}>
				<ItemG container alignItems={'center'} className={classes.header}>
					<ItemG xs>
						<Typography className={classes.headerText} variant={'h6'}>{title}</Typography>
					</ItemG>
					<ItemG>
						<IconButton onClick={handleClose}>
							<Close className={classes.headerText} />
						</IconButton>
					</ItemG>
				</ItemG>
				<CardContent className={classes.content}>
					<ItemG container justify={'center'}>
						<ItemG xs={12}>
							{renderType()}
						</ItemG>
					</ItemG>
				</CardContent>
				<CardActions>
					<ItemG xs={12} container justify={'center'}>
						<Button onClick={_handleButton} onKeyPress={handleKeyPress}>
							{!edit ? t('actions.addFilter') : t('actions.editFilter')}
						</Button>
					</ItemG>
				</CardActions>
			</Card>
		</Popover>
	)
}


export default FilterCard

import React, { Fragment, useState } from 'react'
// import PropTypes from 'prop-types'
import { Divider, MenuItem, Menu, Button, Tooltip } from '@material-ui/core';
import { T, ItemG, DSelect } from 'Components';
import { dateTimeFormatter } from 'variables/functions';
import moment from 'moment'
import { DateRange } from 'variables/icons';
import { useLocalization } from 'Hooks';
import lineStyles from 'Components/Custom/Styles/lineGraphStyles';

const RoomConformDateFilter = (props) => {
	const { period, label, icon, button, settings, inputType, buttonProps } = props
	const t = useLocalization()
	const [actionAnchor, setActionAnchor] = useState(null)
	const classes = lineStyles();

	const dOptions = [
		{ value: 3, label: t('filters.dateOptions.thisMonth') },
	]
	// const options = [
	// 	{ id: 3, label: t('filters.dateOptions.thisMonth') },
	// 	{ id: 7, label: t('filters.dateOptions.30days') },
	// ]
	const handleSetDate = (menuId, to, from, timeType) => {
		let defaultT = 0
		switch (menuId) {
			case 3: // this month
				// from = moment().subtract(30, 'd').startOf('day')
				from = moment().startOf('month').startOf('day')
				to = moment().startOf('day')
				defaultT = 3
				break;
			case 7: // last 30 days
				from = moment().subtract(30, 'd').startOf('day')
				to = moment().startOf('day')
				defaultT = 3;
				break;
			default:
				break;
		}

		if (props.customSetDate) {
			return props.customSetDate(menuId, to, from, defaultT)
		}
	}

	const handleDateFilter = (event) => {
		let id = event.target.value
		if (id !== 6) {
			setActionAnchor(null)
			handleSetDate(id)
		}
	}

	const handleOpenMenu = e => {
		setActionAnchor(e.currentTarget)
	}
	const handleCloseMenu = () => {
		setActionAnchor(null)
	}

	const isSelected = (value) => value === period ? period.menuId ? true : false : false

	let displayTo = period ? dateTimeFormatter(period.to) : ""
	let displayFrom = period ? dateTimeFormatter(period.from) : ""

	return (
		inputType ? <DSelect
			onChange={handleDateFilter}
			label={label}
			value={period.menuId}
			menuItems={dOptions}
		/> :
			<Fragment>
				{button && <Button

					aria-label='More'
					aria-owns={actionAnchor ? 'long-menu' : null}
					aria-haspopup='true'
					style={{ color: 'rgba(0, 0, 0, 0.54)' }}
					onClick={handleOpenMenu}
					{...buttonProps}
				>
					{icon ? icon : <DateRange />}
				</Button>}
				{!button && <Tooltip title={t('tooltips.chart.period')}>
					<div className={classes.periodLabelsContainer} onClick={handleOpenMenu}>
						<div className={classes.periodLabels}>{displayFrom}</div>
						<div className={classes.periodLabels}>{displayTo}</div>
					</div>
				</Tooltip>}
				<Menu
					disableAutoFocus
					disableRestoreFocus
					id='long-menu'
					anchorEl={actionAnchor}
					open={Boolean(actionAnchor)}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					onClose={handleCloseMenu}
					getContentAnchorEl={null}
					PaperProps={{
						style: {
							minWidth: 250,
							padding: 10
						}
					}}>
					<ItemG container direction={'column'}>
						{!settings && period && <Fragment>
							<ItemG>
								<T>{`${displayFrom} - ${displayTo}`}</T>
							</ItemG>
							<Divider />
						</Fragment>}
						<MenuItem selected={isSelected(3)} onClick={handleDateFilter} value={3}>{t('filters.dateOptions.thisMonth')}</MenuItem>
						<MenuItem selected={isSelected(7)} onClick={handleDateFilter} value={7}>{t('filters.dateOptions.30days')}</MenuItem>
					</ItemG>
				</Menu>
			</Fragment>
	)

}
// RoomConformDateFilter.propTypes = {
// 	classes: PropTypes.object,
// 	to: PropTypes.instanceOf(moment),
// 	from: PropTypes.instanceOf(moment),
// 	t: PropTypes.func,
// 	dateFilterInputID: PropTypes.number,
// 	handleDateFilter: PropTypes.func,
// }

export default RoomConformDateFilter
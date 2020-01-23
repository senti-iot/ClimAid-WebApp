import React from 'react'
import { ItemG } from 'Components'
import { useLocalization, useDispatch, useSelector } from 'Hooks'
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { changeDate } from 'Redux/dateTime';
import moment from 'moment';
import { orange } from '@material-ui/core/colors';

const DayOption = styled(({ isSelected, ...props }) => <Button {...props} />)`
	color: ${(props) => !props.isSelected ? '#fff' : orange[500]}
	text-transform: none;
`

const DateTimeDays = () => {
	const t = useLocalization()
	const dispatch = useDispatch()
	const period = useSelector(s => s.dateTime.period)
	const setDateTime = (menuId, to, from, timeType) => () => {
		dispatch(changeDate(menuId, to, from, timeType))
	}
	return (
		<ItemG container style={{ width: 'auto' }} alignItems={'center'}>
			<DayOption isSelected={period.timeType === 2} onClick={setDateTime(2, moment().startOf('day'), moment().subtract(6, 'day').startOf('day'), 2)}>{t('filters.dateOptions.7days')}</DayOption>
			<DayOption isSelected={period.timeType === 3} onClick={setDateTime(3, moment().startOf('day'), moment().startOf('month').startOf('day'), 3)}>{t('filters.dateOptions.month')}</DayOption>
			<DayOption isSelected={period.timeType === 4} onClick={setDateTime(4, moment().startOf('day'), moment().startOf('year').startOf('day'), 4)}>{t('filters.dateOptions.year')}</DayOption>
		</ItemG>
	)
}

export default DateTimeDays

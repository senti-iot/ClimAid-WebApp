import React from 'react'
import { TablePagination } from '@material-ui/core'
import { useLocalization, useSelector, useDispatch } from 'Hooks';
import { changeTableRows } from 'Redux/appState';
import styled from 'styled-components';

const TP = styled((props) => {
	const { count, page, disableRowsPerPage } = props
	const dispatch = useDispatch()
	const redux = {
		setRowsPerPage: val => dispatch(changeTableRows(val))
	}
	const t = useLocalization()
	const rowsPerPage = useSelector(s => s.appState.trp ? s.appState.trp : s.settings.trp)
	const rowsPerPageOptions = useSelector(s => s.settings.rowsPerPageOptions)

	const handleChangeRowsPerPage = e => {
		redux.setRowsPerPage(e.target.value)
	}
	const handleChangePage = (e, page) => {
		props.handleChangePage(e, page)
	}

	return (
		<TablePagination
			component='div'
			count={count}
			rowsPerPage={rowsPerPage}
			labelRowsPerPage={t('tables.rowsPerPage') + ':'}
			page={page}
			backIconButtonProps={{
				'aria-label': t('actions.nextPage'),
			}}
			nextIconButtonProps={{
				'aria-label': t('actions.previousPage'),
			}}
			labelDisplayedRows={({ from, to, count }) => disableRowsPerPage ? `` : `${from}-${to} ${t('tables.of')} ${count}`}
			onChangePage={handleChangePage}
			onChangeRowsPerPage={handleChangeRowsPerPage}
			rowsPerPageOptions={rowsPerPageOptions}
			SelectProps={{
				renderValue: value => value
			}}
		// labelRowsPerPage={isWidthUp('sm', width) ? disableRowsPerPage ? `` : t('tables.rowsPerPage') : ''}
		// {...props}
		/>
	)
})`
`
export default TP
import {
	/* Checkbox, */ Hidden, Table, TableBody, TableCell,
	TableRow,
	Checkbox
} from '@material-ui/core';
// import { SignalWifi2Bar, SignalWifi2BarLock } from 'variables/icons';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
// import { Info, Caption, ItemG } from 'components';
// import TC from 'components/Table/TC'
import { useLocalization, useSelector, useState } from 'Hooks';
import tableStyles from 'Styles/tableStyles';
import TP from './TP';
import TH from './TH';
import TC from './TC';

// import DeviceHover from 'components/Hover/DeviceHover';
// import devicetableStyles from 'assets/jss/components/devices/devicetableStyles';

function CTable(props) {
	const [page, setPage] = useState(0)
	const colorTheme = useSelector((state) => state.settings.colorTheme)
	const classes = tableStyles({ color: colorTheme })
	const t = useLocalization()

	//Redux
	const rowsPerPage = useSelector(s => s.appState.trp ? s.appState.trp : s.settings.trp)
	// const hoverTime = useSelector(state => state.settings.hoverTime)
	// const accessLevel = useSelector(state => state.settings.user.privileges)


	const handleChangePage = (event, page) => {
		setPage(page)
	};

	const isSelected = id => {
		return props.selected.indexOf(id) !== -1
	};


	const { selected, data, order, orderBy, handleClick, columns, handleCheckboxClick, handleSelectAllClick, handleSort, sortKey } = props;
	const handleRequestSort = (event, property) => {
		handleSort(sortKey, property)
	}
	const { body, bodyStructure, bodyMobileStructure, mobile } = props
	let emptyRows
	if (data)
		emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
	return (
		<Fragment>
			<div className={classes.tableWrapper}>
				<Table className={classes.table} aria-labelledby='tableTitle'>
					<TH
						numSelected={selected.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={body ? body.length : 0}
						columns={columns}
						classes={classes}
						customColumn={[
							// {
							// 	id: 'liveStatus', label: <ItemG container justify={'center'}>
							// 		<SignalWifi2Bar />
							// 	</ItemG>, checkbox: true
							// },
							// {
							// 	id: 'id',
							// 	label: <Typography paragraph classes={{ root: classes.paragraphCell + ' ' + classes.headerCell }}>
							// 		{t('collections.fields.device')}
							// 	</Typography>
							// }
						]}
					/>
					<TableBody>
						{body ? body.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
							const isSelectedRow = isSelected(row.id);
							return (
								<TableRow
									hover
									onClick={handleClick(row.id)}
									role='checkbox'
									aria-checked={isSelectedRow}
									tabIndex={-1}
									key={row.id}
									selected={isSelectedRow}
									style={{ cursor: 'pointer' }}
								>
									{mobile ? <Hidden lgUp>
										<Fragment>
											<TC checkbox content={<Checkbox checked={isSelectedRow} onClick={e => handleCheckboxClick(e, row.id)} />} />
											{bodyMobileStructure(row)}
										</Fragment>
									</Hidden> : null}

									<Hidden mdDown>

										<Fragment>
											<TC checkbox content={<Checkbox checked={isSelectedRow} onClick={e => handleCheckboxClick(!e.target.checked, row.id)} />} />
											{bodyStructure(row)}
										</Fragment>


									</Hidden>
								</TableRow>
							);
						}) : null}
						{emptyRows > 0 && (
							<TableRow style={{ height: 49 }}>
								<TableCell colSpan={8} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<TP
				count={body ? body.length : 0}
				classes={classes}
				page={page}
				t={t}
				handleChangePage={handleChangePage}
			/>
		</Fragment>
	);

}
// const { selected, data, order, orderBy, handleClick, handleCheckboxClick, handleSelectAllClick } = props;
CTable.propTypes = {
	columns: PropTypes.array.isRequired,
	columnsMobile: PropTypes.array,
	body: PropTypes.array.isRequired,
	bodyStructure: PropTypes.func.isRequired,
	mobile: PropTypes.bool,
	bodyMobile: PropTypes.array,
	bodyMobileStructure: PropTypes.func,
	selected: PropTypes.array,
	data: PropTypes.array,
	order: PropTypes.string,
	orderBy: PropTypes.string,
	handleClick: PropTypes.func.isRequired,
	handleCheckboxClick: PropTypes.func.isRequired,
	handleSelectAllClick: PropTypes.func.isRequired,
	handleSort: PropTypes.func.isRequired,
}

export default CTable
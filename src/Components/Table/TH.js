import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, TableSortLabel, Checkbox, Hidden } from '@material-ui/core'
import styled from 'styled-components'
// import classNames from 'classnames'
import tableStyles from 'Styles/tableStyles';
import { useSelector } from 'Hooks';
import { T } from 'Components';

const TH = (props) => {
	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};
	const color = useSelector(s => s.settings.colorTheme)
	const classes = tableStyles({ color: color })
	const { onSelectAllClick, order, orderBy, numSelected, rowCount, columns, mdDown, customColumn, noCheckbox } = props;
	const selectAllClick = e => {
		onSelectAllClick(e.target.checked)
	}

	const TC = styled(TableCell)`
	padding: 4px 8px;
	/* background: ${({ theme }) => theme.palette.primary.light}; */
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	/* border-color: ${({ theme }) => theme.boxBackground}; */
	color: #fff;
	`
	return (
		<TableHead>
			<TableRow>
				{noCheckbox ? null : <TC>
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={numSelected === rowCount && numSelected > 0}
						disabled={rowCount === 0}
						onChange={selectAllClick}
					/>
				</TC>}
				<Hidden mdDown>
					{columns.map((column, i) => {
						return (
							<TC
								key={i}
								sortDirection={orderBy === column.id ? order : false}
							>
								<TableSortLabel
									active={orderBy === column.id}
									direction={order === '' ? 'asc' : order}
									disabled={rowCount === 0}
									onClick={createSortHandler(column.id)}>
									{column.checkbox ? column.label : <T>{column.label}</T>}
								</TableSortLabel>
							</TC>
						);
					}, this)}
				</Hidden>
				<Hidden lgUp>
					{
						mdDown ? mdDown.map(c => {
							return <TC
								// className={classes.header}
								key={columns[c].id}
								sortDirection={orderBy === columns[c].id ? order : false}
							>
								<TableSortLabel
									active={orderBy === columns[c].id}
									direction={order}
									onClick={createSortHandler(columns[c].id)}
								>
									<T paragraph>{columns[c].label}</T>
								</TableSortLabel>
							</TC>
						}) : customColumn ? customColumn.map(c => {
							return <TC
								className={classes.header}
								key={c.id}
								sortDirection={orderBy === c.id ? order : false}>
								<TableSortLabel
									active={orderBy === c.id}
									direction={order}
									onClick={createSortHandler(c.id)}
								>
									{c.label}
								</TableSortLabel>
							</TC>
						}) : null
					}
				</Hidden>

			</TableRow>
		</TableHead>
	);

}

TH.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
	columns: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired
};

export default TH
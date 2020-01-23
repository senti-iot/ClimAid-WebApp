import React from 'react'
import PropTypes from 'prop-types'
import { TableCell } from '@material-ui/core'
import classNames from 'classnames'
import { T } from 'Components'
import tcStyles from 'Styles/tableCellStyles'

const TC = (props) => {
	const { checkbox, noCheckbox, label, content, className, center, FirstC, ...rest } = props
	const classes = tcStyles()
	let tcClasses = classNames({
		[className]: className,
		[classes.tableCellCheckbox]: checkbox,
		[classes.tableCell]: true,
		[classes.tablecellPadding]: noCheckbox
	})
	return (
		<TableCell classes={{ root: tcClasses }}
			{...rest}
		>
			{(label !== null || label !== undefined) ? <T variant={'body1'} classes={{ root: classes.paragraphCell + ' ' + (center ? classes.center : '') }}>
				{label ? label : ""}
			</T> : null}
			{content ? content : null}
		</TableCell>
	)
}

TC.propTypes = {
	checkbox: PropTypes.bool,
	noCheckbox: PropTypes.bool,
	label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	content: PropTypes.any,
	className: PropTypes.string,
	center: PropTypes.bool,
	FirstC: PropTypes.bool,
}

export default TC
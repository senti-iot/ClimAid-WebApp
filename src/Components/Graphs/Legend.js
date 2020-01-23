import React, { Fragment } from 'react'
import { T, ItemG } from 'Components'
import { Checkbox, FormControlLabel, colors } from '@material-ui/core'
import styled from 'styled-components';
import { useLocalization } from 'Hooks/index';

let CheckedBox = styled(Checkbox)`
color: inherit;

`

const Legend = props => {
	const data = props.data ? props.data[props.id] : []
	const t = useLocalization()
	return (
		<ItemG container justify={'center'} alignItems={'center'}>
			{data.map(line => {
				if (line.median && !line.noMedianLegend) {
					return <Fragment key={line.name + 'Legend5412451234'}>
						<FormControlLabel
							key={line.name + 'Legend'}
							id={line.name + 'Legend'}
							style={{
								color: line.hidden ? 'rgba(255, 255, 255, 0.3)' : colors[line.color][500]
							}}
							control={
								<CheckedBox
									color={'default'}
									defaultChecked={!line.hidden} id={line.name + 'LegendCheckbox'} />
							}

							label={<T
								style={{
									color: line.hidden ? 'rgba(255, 255, 255, 0.3)' : '#fff'
								}}
								id={line.name + 'LegendLabel'}>{t('chartLines.' + line.name)}</T>}
						/>
						<FormControlLabel
							defaultChecked={false}
							key={line.name + 'LegendMedian'}
							style={{
								color: 'rgba(255, 255, 255, 0.3)'
							}}
							control={
								<CheckedBox color={'default'} id={line.name + 'LegendMedianCheckbox'} />
							}
							label={<T
								style={{
									color: 'rgba(255, 255, 255, 0.3)'
								}}
								id={line.name + 'LegendMedianLabel'}>{t('chartLines.' + line.name) + ' ' + t('chartLines.average')}</T>}
						/>
					</Fragment>
				}
				return <FormControlLabel
					key={line.name + 'Legend'}
					id={line.name + 'Legend'}
					style={{
						color: !line.prev ? colors[line.color][500] : 'rgba(128,128,128,1)'
					}}
					control={
						<CheckedBox
							color={'default'}
							defaultChecked={!line.hidden} id={line.name + 'LegendCheckbox'} />
					}

					label={<T
						style={{
							color: line.hidden ? 'rgba(255, 255, 255, 0.3)' : '#fff'
						}}
						id={line.name + 'LegendLabel'}>{t('chartLines.' + line.name)}</T>}
				/>

			})}
		</ItemG>
	)
}

export default Legend

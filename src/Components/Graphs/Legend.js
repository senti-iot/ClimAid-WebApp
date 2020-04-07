import React, { Fragment } from 'react'
import { T } from 'Components'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { Grid } from '@material-ui/core';

import styled from 'styled-components';
import { useLocalization } from 'Hooks/index';

let CheckedBox = styled(Checkbox)`
color: inherit;

`

const Legend = props => {
	const data = props.data
	const t = useLocalization()
	return (
		<>
			{
			// eslint-disable-next-line array-callback-return
				Object.keys(data).map(key => {
					if (key !== 'userexperience') {
						return <Grid container justify={'center'} alignItems={'center'} key={key}>
							{data[key].map(line => {
								if (line.median && !line.noMedianLegend) {
									return <Grid item style={{ marginBottom: 5 }} key={line.name + 'Legend5412451234'}>
										<Fragment>
											<FormControlLabel
												key={line.name + 'Legend'}
												id={line.name + 'Legend'}
												style={{
													color: line.hidden ? 'rgba(255, 255, 255, 0.3)' : line.color
												}}
												control={
													<div
														style={{
															backgroundColor: line.hidden ? 'rgba(255, 255, 255, 0.3)' : line.color,
															width: 20,
															height: 20,
															marginRight: 5,
														}}></div>
												}

												label={<T
													style={{
														color: line.hidden ? 'rgba(255, 255, 255, 0.3)' : '#fff'
													}}
													id={line.name + 'LegendLabel'}>{t('chartLines.' + line.name)}</T>}
											/>
										</Fragment>
									</Grid>
								}
								return <Grid item>
									<FormControlLabel key={line.name + 'Legend'}
										id={line.name + 'Legend'}
										style={{
											color: !line.prev ? line.color : 'rgba(128,128,128,1)'
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
								</Grid>
							})}
						</Grid>
					}
				})}
		</>
	)
}

export default Legend

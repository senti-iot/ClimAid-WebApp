/* eslint-disable array-callback-return */
import React from 'react';
import { T } from 'Components';
import { FormControlLabel } from '@material-ui/core';
import { Grid } from '@material-ui/core';

import { useLocalization } from 'Hooks/index';

const Legend = props => {
	const data = props.data;
	const checkboxStates = props.checkboxStates;
	const rooms = props.rooms;
	const t = useLocalization();

	let labels = [];
	labels["warm"] = "For varmt";
	labels["cold"] = "For koldt";
	labels["windy"] = "Træk";
	labels["heavyair"] = "Tung luft";
	labels["good"] = "Godt";
	labels["tired"] = "Træthed";
	labels["itchyeyes"] = "Tørre øjne og næse";
	labels["lighting"] = "Dårlig belysning";
	labels["blinded"] = "Blændning";
	labels["noisy"] = "Støj";

	const renderUeLabel = key => {
		let label = '';
		if (key.includes('_')) {
			const parts = key.split('_');
			key = parts[0];

			const room = rooms.filter(obj => {
				return obj.uuid === parts[1];
			});

			label = labels[key] + ' - ' + room[0].name;
		} else {
			label = labels[key];
		}

		return label;
	}

	return (
		<>
			{
				Object.keys(data).map(key => {
					if (key !== 'userexperience') {
						return <Grid container justify={'center'} alignItems={'center'} key={key}>
							{data[key].map(line => {
								return <Grid item style={{ marginBottom: 5 }} key={line.name + 'Legend5412451234'}>
									<>
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
													color: line.hidden ? 'rgba(255, 255, 255, 0.3)' : '#000'
												}}
												id={line.name + 'LegendLabel'}>{line.caption ? line.caption : t('chartLines.' + line.name)}</T>}
										/>
									</>
								</Grid>
							})}
						</Grid>
					} else {
						const colors = ['#2b6e48', '#3b8058', '#499267', '#4fa171', '#58b07c', '#5ebf88', '#74c694', '#8dcea4', '#9ed3ae', '#b4ddbf'];

						return <Grid container justify={'center'} alignItems={'center'} key="userexperience">
							{Object.keys(checkboxStates['userexperience']).map((ueKey, index) => {
								return <Grid item style={{ marginBottom: 5 }} key={ueKey + 'Legend5412451234'}>
									<>
										<FormControlLabel
											key={ueKey + 'Legend'}
											id={ueKey + 'Legend'}
											style={{
												color: colors[index]
											}}
											control={
												<div
													style={{
														backgroundColor: colors[index],
														width: 20,
														height: 20,
														marginRight: 5,
													}}></div>
											}

											label={<T
												style={{
													color: '#000'
												}}
												id={ueKey + 'LegendLabel'}>Brugeroplevelse - {renderUeLabel(ueKey)}</T>}
										/>
									</>
								</Grid>
							})}
						</Grid>
					}
				})}
		</>
	)
}

export default Legend

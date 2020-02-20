import React, { useRef, useLayoutEffect, useState } from 'react';
import moment from 'moment';
import { Grid } from '@material-ui/core';

import { useLocalization } from 'Hooks';
import d3Line from 'Components/Graphs/classes/d3Line';
import lineStyles from 'Components/Custom/Styles/lineGraphStyles';
import Tooltip from 'Components/Room/Tooltip';
import { getDeviceDataConverted } from 'data/climaid';
import { DateTimeFilter } from 'Components';
import CircularLoader from 'Components/Loaders/CircularLoader';
import { usePrevious } from 'Hooks';

let line = null;

const LineGraph = React.memo((props) => {
	const [value, setValue] = useState({ value: null, date: null });
	const [data, setData] = useState([]);
	const [period, setPeriod] = useState(null);
	const [selectedPeriod, setSelectedPeriod] = useState(2);
	const [loading, setLoading] = useState(true);
	const lineChartContainer = useRef(null);
	const t = useLocalization();
	const classes = lineStyles({ id: props.id });
	const prevId = usePrevious(props.id);
	let prevLoading = usePrevious(loading);

	useLayoutEffect(() => {
		async function fetchData() {
			const period = getPeriod(selectedPeriod);
			setPeriod(period);

			const deviceData = await getDeviceDataConverted(2287, period, 'temperature');

			if (deviceData) {
				setData(deviceData);
				setLoading(false);
			}
		}

		const unitType = () => {
			switch (props.id) {
				case 'temperature':
					return '°C';
				default:
					break;
			}
		}

		const getPeriod = (menuId) => {
			let from = 0;
			let to = 0;
			let timeType = 2;

			setSelectedPeriod(menuId);

			switch (menuId) {
				default:
				case 1:
					from = moment().startOf('week').format('YYYY-MM-DD HH:mm:ss');
					to = moment().endOf('week').format('YYYY-MM-DD HH:mm:ss');
					break;
				case 2:
					from = moment().subtract(6, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
					to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
					break;
				case 3:
					from = moment().startOf('month').startOf('day').format('YYYY-MM-DD HH:mm:ss');
					to = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');
					break;
				case 5:
					from = moment().subtract(90, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
					to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
					break;
				case 7:
					from = moment().subtract(30, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
					to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
					break;
			}

			return {
				menuId: menuId,
				from: from,
				to: to,
				timeType: timeType
			};
		}

		const deviceData = {
			temperature: [
				{
					name: "temperature",
					median: true,
					data: data,
					color: "#e28117"
				}
			]
		}

		const genNewLine = () => {
			let cProps = {
				unit: unitType(),
				id: props.id,
				data: deviceData,
				setTooltip: setValue,
				// setMedianTooltip: setMedianValue,
				period: period,
				t: t
			}

			line = new d3Line(lineChartContainer.current, cProps, classes);
		}

		if ((props.id !== prevId) && line) {
			line.destroy();
			genNewLine();
		}

		if ((lineChartContainer.current && !line && !loading) || ((prevLoading !== loading) && !loading)) {
			genNewLine();
		}

		if (loading && lineChartContainer) {
			fetchData();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading])

	const customSetDate = (menuId, to, from, defaultT) => {
		setSelectedPeriod(menuId);
		setLoading(true);
		console.log('customSetDate');
	}

	return (
		loading ? <CircularLoader fill />
			:
			<div style={{ width: '100%', height: '100%' }}>
				<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={2}>
					<Grid item xs={10}></Grid>
					<Grid item xs={2}>
						<DateTimeFilter period={period} customSetDate={customSetDate} />
					</Grid>
				</Grid>

				<svg id={props.id} ref={lineChartContainer}
					style={{
						width: '100%',
						height: '85%',
						// minHeight: 500
					}}>
				</svg>
				<Tooltip tooltip={value} id={props.id} />
			</div>
	)
});

export default LineGraph;
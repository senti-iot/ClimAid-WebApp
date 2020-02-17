import React, { useEffect, useState } from 'react';

import roomStyles from 'Styles/roomStyles';

const CurrentTemperatureBar = (props) => {
	const classes = roomStyles();
	const [width, setWidth] = useState(null);
	const [anbMin, setAnbMin] = useState(null);
	const [anbMax, setAnbMax] = useState(null);
	const [color, setColor] = useState('');

	useEffect(() => {
		if (props.roomValues['temperature']) {
			let t_x = props.roomValues['temperature'];
			// t_x = 25;
			let t_min = 10;
			let t_max = 30;
			let l_anb_min = 21;
			let l_anb_max = 24.5;
			let lb_t_max = 100;

			let lb_tx = 0;
			if (t_x < t_min) {
				lb_tx = 0.05 * lb_t_max;
			} else if (t_min <= t_x <= t_max) {
				lb_tx = (t_x - t_min) / (t_max - t_min) * lb_t_max;
			} else if (t_x > t_max) {
				lb_tx = lb_t_max;
			}

			let l_anb_min_x = (l_anb_min - t_min) / (t_max - t_min) * lb_t_max;
			let l_anb_max_x = (l_anb_max - t_min) / (t_max - t_min) * lb_t_max;

			setWidth(lb_tx);
			setAnbMin(l_anb_min_x);
			setAnbMax(l_anb_max_x);

			let color = '';

			if ((t_x >= 17 && t_x <= 19.5) ||
				(t_x >= 26 && t_x <= 28)) {
				color = '#e56363';
			}
			if (t_x < 17 || t_x > 28) {
				color = '#d1463d';
			}

			if ((t_x > 19.5 && t_x < 21) ||
				(t_x > 24.5 && t_x < 26)) {
				color = '#e28117';
			}

			if (t_x >= 21 && t_x <= 24.5) {
				color = '#3fbfad';
			}

			setColor(color);
		}
	}, [props.roomValues]);

	return (
		<>
			{width && anbMin && anbMax &&
				<div className={classes.currentReadingBarContainer}>
					<div style={{ left: anbMin + '%', width: (anbMax - anbMin) + '%' }} className={classes.currentReadingBarRecommended}></div>
					<div style={{ width: width + '%', backgroundColor: color }} className={classes.currentReadingBar}></div>
				</div>
			}
		</>
	)
}

export default CurrentTemperatureBar;
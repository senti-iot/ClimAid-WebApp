import React, { useEffect, useState } from 'react';

import roomStyles from 'Styles/roomStyles';

const CurrentCo2Bar = (props) => {
	const classes = roomStyles();
	const [width, setWidth] = useState(null);
	const [anbMin, setAnbMin] = useState(null);
	const [anbMax, setAnbMax] = useState(null);
	const [color, setColor] = useState('');

	useEffect(() => {
		if (props.roomValues['co2']) {
			let c_x = props.roomValues['co2'];
			const c_min = 390;
			const c_max = 2500;
			const lb_c_max = 100;
			let l_anb_min = 400;
			let l_anb_max = 1000;


			let lb_cx = 0;
			if (c_x < c_min) {
				lb_cx = 0.05 * lb_c_max;
			} else if (c_min < c_x || c_x <= c_max) {
				lb_cx = (c_x - c_min) / (c_max - c_min) * lb_c_max;
			} else if (c_x > c_max) {
				lb_cx = lb_c_max;
			}

			setWidth(lb_cx);

			let l_anb_min_x = (l_anb_min - c_min) / (c_max - c_min) * lb_c_max;
			let l_anb_max_x = (l_anb_max - c_min) / (c_max - c_min) * lb_c_max;

			setAnbMin(l_anb_min_x);
			setAnbMax(l_anb_max_x);

			let color = '';

			if (c_x <= 1000) {
				color = '#3fbfad';
			}
			if (c_x > 1000 && c_x <= 1200) {
				color = '#e28117';
			}
			if (c_x > 1200 && c_x <= 2000) {
				color = '#e56363';
			}
			if (c_x > 2000) {
				color = '#d1463d';
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

export default CurrentCo2Bar;
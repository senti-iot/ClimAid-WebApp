/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import { Card, CardContent, Button, Backdrop, Typography } from '@material-ui/core';
import moment from 'moment';

import { getDeviceDataConverted, getQualitativeData, getActivityMinutes } from 'data/climaid';
import CircularLoader from 'Components/Loaders/CircularLoader';

const TCard = styled(Card)`
	position: absolute;
	top: calc(50% - 200px);
	left: calc(50% - 270px);
	width: 400px;
	min-height: 540px;
	border: 0;
	border-radius: 4;
	z-index: 2200;
	transition: 300ms all ease;
`;

const keyToText = {
	warm: 'For varmt',
	cold: 'For koldt',
	windy: 'Træk',
	heavyair: 'Tung luft',
	good: 'Godt',
	tired: 'Træthed',
	itchyeyes: 'Tørre øjne og næse',
	lighting: 'Dårlig belysning',
	blinded: 'Blænding',
	noisy: 'Støj',
	concentration: 'Koncentration',
};

const RomComfortGraphPopover = (props) => {
	const open = props.open;
	const onClose = props.onClose;
	const currentReading = props.currentReading;
	const devices = props.devices;
	const qualitativeDevices = props.qualitativeDevices;

	const [loading, setLoading] = useState(false);
	const [period, setPeriod] = useState(false);
	const [temperature, setTemperature] = useState(null);
	const [co2, setCo2] = useState(null);
	const [humidity, setHumidity] = useState(null);
	const [noisePeak, setNoisePeak] = useState(null);
	const [light, setLight] = useState(null);
	const [voc, setVoc] = useState(null);
	const [qualitative, setQualitative] = useState({});
	const [activityMinutes, setActivityMinutes] = useState({});

	useEffect(() => {
		console.log(currentReading);

		async function fetchData () {
			setLoading(true);

			console.log(currentReading);

			const device = devices[0];
			const qDevice = qualitativeDevices[0];

			let period = {};
			period.timeTypeData = 3;
			period.from = moment(currentReading.ts.split(' ')[0] + ':' + currentReading.ts.split(' ')[1] + ':00:00').format('YYYY-MM-DD HH:mm:ss');
			period.to = moment(currentReading.ts.split(' ')[0] + ':' + currentReading.ts.split(' ')[1] + ':59:59').format('YYYY-MM-DD HH:mm:ss');
			setPeriod(period);
			console.log(period);
			let temperatureData = await getDeviceDataConverted(device, period, 'temperature');
			let co2Data = await getDeviceDataConverted(device, period, 'co2');
			let humidityData = await getDeviceDataConverted(device, period, 'humidity');
			let noisePeakData = await getDeviceDataConverted(device, period, 'noisePeak');
			let lightData = await getDeviceDataConverted(device, period, 'light');
			let vocData = await getDeviceDataConverted(device, period, 'voc');

			let activityData = await getActivityMinutes(period, device);
			if (activityData.length) {
				console.log(activityData[0]);
				setActivityMinutes(activityData[0]);
			}

			if (qualitativeDevices.length) {
				let qualitativeData = await getQualitativeData([qDevice], period);
				if (qualitativeData.length) {
					console.log(qualitativeData[0]);
					setQualitative(qualitativeData[0]);
				}
			}

			if (temperatureData.length) {
				setTemperature(temperatureData[0].value);
			}
			if (co2Data.length) {
				setCo2(co2Data[0].value);
			}
			if (humidityData.length) {
				setHumidity(humidityData[0].value);
			}
			if (noisePeakData.length) {
				setNoisePeak(noisePeakData[0].value);
			}
			if (lightData.length) {
				setLight(lightData[0].value);
			}
			if (vocData.length) {
				setVoc(vocData[0].value);
			}

			setLoading(false);
		}

		if (currentReading) {
			fetchData();
		}
	}, []);

	return (
		<Backdrop open={open} onClick={onClose} style={{ zIndex: 3000 }}>
			<TCard id='readingPopoverOpen'>
				{!loading ?
					<CardContent>
						<div style={{ position: 'absolute', top: 0, right: -10 }}>
							<Button onClick={onClose}>
								<CloseIcon />
							</Button>
						</div>
						<Typography variant="body1" style={{ fontSize: 16 }}>{moment(period.from).format('DD-MM-YYYY')} {moment(period.from).format('HH')} - {moment(period.to).add(1, 'minute').format('HH')}</Typography>
						<Typography variant="h5" style={{ marginTop: 10 }}>Indeklima</Typography>
						{temperature ? <Typography><b>Temperatur:</b> {temperature} °C</Typography> : ""}
						{humidity ? <Typography><b>Luftfugtighed:</b> {humidity} %</Typography> : ""}
						{co2 ? <Typography><b>Luftkvalitet (CO₂):</b> {co2} ppm</Typography> : ""}
						{light ? <Typography><b>Lysniveau:</b> {light} lx</Typography> : ""}
						{noisePeak ? <Typography><b>Lydniveau:</b> {noisePeak} dB</Typography> : ""}
						{voc ? <Typography><b>VOC:</b> {voc} μg/m3</Typography> : ""}

						<Typography variant="h5" style={{ marginTop: 10 }}>Brugeroplevelse (antal stemmer)</Typography>
						{Object.keys(keyToText).map(key => {
							if (key !== 'ts' && key !== 'uts') {
								return <Typography key={key}><b>{keyToText[key]}:</b> {qualitative[key] ? qualitative[key] : 0}</Typography>
							}
							return "";
						})}

						<Typography variant="h5" style={{ marginTop: 10 }}>Aktivitet</Typography>
						<Typography><b>Brugstid:</b> {parseInt(activityMinutes.activeMinutes)} minutter</Typography>
						<Typography><b>Aktivitetsniveau:</b> </Typography>
					</CardContent>
					: <CircularLoader fill />}
			</TCard>
		</Backdrop>
	)
}

export default RomComfortGraphPopover;

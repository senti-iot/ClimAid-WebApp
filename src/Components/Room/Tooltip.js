import React from 'react'
import { T, ItemG } from 'Components'
import Card from '@material-ui/core/Card'
import { CardContent, /* Divider */ } from '@material-ui/core'
import moment from 'moment'
import styled from 'styled-components';
import { capitalizeFL } from 'data/functions'
import cookie from 'react-cookies';

const TCard = styled(Card)`
	min-width: 300px;
	position: absolute;
	border: 0;
	border-radius: 4;
	z-index: -1;
	transition: 300ms all ease;
	top: -1000px;
	left: -1000px;
`

const temperatureTooltip = (props) => {
	let cookiePeriod = cookie.load('graph_period');

	let timeFormat = 'll';
	if (cookiePeriod && cookiePeriod.timeTypeData === 1) {
		timeFormat = 'lll';
	}

	return <TCard id='temperaturetooltip'>
		<CardContent>
			<ItemG container xs={12}>
				<ItemG container xs={6}>
					<ItemG xs={12}>
						<T variant={'h6'}>{capitalizeFL(moment(props.tooltip.date).format('dddd'))}</T>
					</ItemG>
					<ItemG xs={12}>
						<T varinat={'body2'}>{moment(props.tooltip.date).format(timeFormat)}</T>
					</ItemG>
				</ItemG>
				<ItemG xs={6} container justify={'center'} alignItems={'flex-end'}>
					<T variant={'h5'}>{`${parseFloat(props.tooltip.value).toFixed(1)}`} °C</T>
					{/* <img src={Thermometer} alt={'water drop'} height={36} width={36} style={{ margin: 4 }} /> */}
				</ItemG>
			</ItemG>
		</CardContent>
	</TCard>
}

const co2Tooltip = (props) => {
	let cookiePeriod = cookie.load('graph_period');

	let timeFormat = 'll';
	if (cookiePeriod && cookiePeriod.timeTypeData === 1) {
		timeFormat = 'lll';
	}

	return <TCard id='co2tooltip'>
		<CardContent>
			<ItemG container xs={12}>
				<ItemG container xs={6}>
					<ItemG xs={12}>
						<T variant={'h6'}>{capitalizeFL(moment(props.tooltip.date).format('dddd'))}</T>
					</ItemG>
					<ItemG xs={12}>
						<T varinat={'body2'}>{moment(props.tooltip.date).format(timeFormat)}</T>
					</ItemG>
				</ItemG>
				<ItemG xs={6} container justify={'center'} alignItems={'flex-end'}>
					<T variant={'h5'}>{`${parseFloat(props.tooltip.value).toFixed(1)}`} ppm</T>
					{/* <img src={Thermometer} alt={'water drop'} height={36} width={36} style={{ margin: 4 }} /> */}
				</ItemG>
			</ItemG>
		</CardContent>
	</TCard>
}

const humidityTooltip = (props) => {
	let cookiePeriod = cookie.load('graph_period');

	let timeFormat = 'll';
	if (cookiePeriod && cookiePeriod.timeTypeData === 1) {
		timeFormat = 'lll';
	}

	return <TCard id='humiditytooltip'>
		<CardContent>
			<ItemG container xs={12}>
				<ItemG container xs={6}>
					<ItemG xs={12}>
						<T variant={'h6'}>{capitalizeFL(moment(props.tooltip.date).format('dddd'))}</T>
					</ItemG>
					<ItemG xs={12}>
						<T varinat={'body2'}>{moment(props.tooltip.date).format(timeFormat)}</T>
					</ItemG>
				</ItemG>
				<ItemG xs={6} container justify={'center'} alignItems={'flex-end'}>
					<T variant={'h5'}>{`${parseFloat(props.tooltip.value).toFixed(1)}`} %</T>
					{/* <img src={Thermometer} alt={'water drop'} height={36} width={36} style={{ margin: 4 }} /> */}
				</ItemG>
			</ItemG>
		</CardContent>
	</TCard>
}

const batteryTooltip = (props) => {
	let cookiePeriod = cookie.load('graph_period');

	let timeFormat = 'll';
	if (cookiePeriod && cookiePeriod.timeTypeData === 1) {
		timeFormat = 'lll';
	}

	return <TCard id='batterytooltip'>
		<CardContent>
			<ItemG container xs={12}>
				<ItemG container xs={6}>
					<ItemG xs={12}>
						<T variant={'h6'}>{capitalizeFL(moment(props.tooltip.date).format('dddd'))}</T>
					</ItemG>
					<ItemG xs={12}>
						<T varinat={'body2'}>{moment(props.tooltip.date).format(timeFormat)}</T>
					</ItemG>
				</ItemG>
				<ItemG xs={6} container justify={'center'} alignItems={'flex-end'}>
					<T variant={'h5'}>{`${parseFloat(props.tooltip.value).toFixed(1)}`} %</T>
					{/* <img src={Thermometer} alt={'water drop'} height={36} width={36} style={{ margin: 4 }} /> */}
				</ItemG>
			</ItemG>
		</CardContent>
	</TCard>
}

const noisepeakTooltip = (props) => {
	let cookiePeriod = cookie.load('graph_period');

	let timeFormat = 'll';
	if (cookiePeriod && cookiePeriod.timeTypeData === 1) {
		timeFormat = 'lll';
	}

	return <TCard id='noisepeaktooltip'>
		<CardContent>
			<ItemG container xs={12}>
				<ItemG container xs={6}>
					<ItemG xs={12}>
						<T variant={'h6'}>{capitalizeFL(moment(props.tooltip.date).format('dddd'))}</T>
					</ItemG>
					<ItemG xs={12}>
						<T varinat={'body2'}>{moment(props.tooltip.date).format(timeFormat)}</T>
					</ItemG>
				</ItemG>
				<ItemG xs={6} container justify={'center'} alignItems={'flex-end'}>
					<T variant={'h5'}>{`${parseFloat(props.tooltip.value).toFixed(1)}`} db</T>
				</ItemG>
			</ItemG>
		</CardContent>
	</TCard>
}

const analyticsTooltip = (props) => {
	let cookiePeriod = cookie.load('graph_period');

	let timeFormat = 'll';
	if (cookiePeriod && cookiePeriod.timeTypeData === 1) {
		timeFormat = 'lll';
	}

	return <TCard id='analyticstooltip'>
		<CardContent>
			<ItemG container xs={12}>
				<ItemG container xs={6}>
					<ItemG xs={12}>
						<T variant={'h6'}>{capitalizeFL(moment(props.tooltip.date).format('dddd'))}</T>
					</ItemG>
					<ItemG xs={12}>
						<T varinat={'body2'}>{moment(props.tooltip.date).format(timeFormat)}</T>
					</ItemG>
				</ItemG>
				<ItemG xs={6} container justify={'center'} alignItems={'flex-end'}>
					<T variant={'h5'}>{`${parseFloat(props.tooltip.value).toFixed(1)}`} %</T>
				</ItemG>
			</ItemG>
		</CardContent>
	</TCard>
}

const Tooltip = (props) => {
	 switch (props.id) {
	 	case 'temperature':
			return temperatureTooltip(props)
	 	case 'co2':
			return co2Tooltip(props)
	 	case 'humidity':
			return humidityTooltip(props)
	 	case 'battery':
			return batteryTooltip(props)
		case 'analytics':
			return analyticsTooltip(props)
		 case 'noisepeak':
			 return noisepeakTooltip(props)
		default:
			return null
	 }
}

export default Tooltip

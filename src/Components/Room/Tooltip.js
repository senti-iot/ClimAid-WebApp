import React from 'react'
import { T, ItemG } from 'Components'
import Card from '@material-ui/core/Card'
import { CardContent, /* Divider */ } from '@material-ui/core'
import moment from 'moment'
import styled from 'styled-components';
// import { Thermometer } from 'variables/icons'
import { capitalizeFL } from 'data/functions'

const TCard = styled(Card)`
	min-width: 300px;
	position: absolute;
	border: 0;
	border-radius: 4;
	z-index: -1;
	transition: 300ms all ease;
`

const temperatureTooltip = (props) => {
	return <TCard id={props.id + 'tooltip'}>
		<CardContent>
			{/* <ItemG container> */}
			<ItemG container xs={12}>
				<ItemG container xs={6}>
					<ItemG xs={12}>
						<T variant={'h6'}>{capitalizeFL(moment(props.tooltip.date).format('dddd'))}</T>
					</ItemG>
					<ItemG xs={12}>
						<T varinat={'body2'}>{moment(props.tooltip.date).format('ll')}</T>
					</ItemG>
				</ItemG>
				<ItemG xs={6} container justify={'center'} alignItems={'flex-end'}>
					<T variant={'h5'}>{`${parseFloat(props.tooltip.value).toFixed(1)} °C`}</T>
					{/* <img src={Thermometer} alt={'water drop'} height={36} width={36} style={{ margin: 4 }} /> */}
				</ItemG>
			</ItemG>
			{/* </ItemG> */}
			{/* <Divider />
			<ItemG container xs={12}>
			</ItemG> */}

		</CardContent>
	</TCard>
}


const Tooltip = (props) => {
	// switch (props.id) {
	// 	case 'temperature':
	return temperatureTooltip(props)
	// default:
	// 	return null
	// }
}

export default Tooltip

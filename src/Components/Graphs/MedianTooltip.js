import React, { Fragment } from 'react'
import { T, ItemG } from 'Components'
import Card from '@material-ui/core/Card'
import { CardContent, /* Divider */ } from '@material-ui/core'
import moment from 'moment'
import styled from 'styled-components';
import { Droplet, Thermometer } from 'variables/icons'

const TCard = styled(Card)`
	min-width: 300px;
	position: absolute;
	border: 0;
	border-radius: 4;
	z-index: -1;
	transition: 300ms all ease;
`

const renderIcon = (id, tooltip) => {
	switch (id) {
		case 'waterusage':
			return <Fragment>
				<T variant={'h5'}>{`${tooltip.value} m³`}</T>
				<img src={Droplet} alt={'water drop'} height={36} width={36} style={{ margin: 4 }} />
			</Fragment>
		case 'waterflow':
			return <Fragment>
				<T variant={'h5'}>{`${tooltip.value} m³`}</T>
				<img src={Droplet} alt={'water drop'} height={36} width={36} style={{ margin: 4 }} />
			</Fragment>
		case 'temperature':
			return <Fragment>
				<T variant={'h5'}>{`${tooltip.value} m³`}</T>
				<img src={Thermometer} alt={'water drop'} height={36} width={36} style={{ margin: 4 }} />
			</Fragment>
		case 'reading':
			return <Fragment>
				<T variant={'h5'}>{`${tooltip.value} m³`}</T>
				<img src={Droplet} alt={'water drop'} height={36} width={36} style={{ margin: 4 }} />
			</Fragment>



		default:
			return null
	}
}

const MedianTooltip = (props) => {
	return <TCard id={props.id + 'medianTooltip'} style={{ zIndex: -1 }}>
		<CardContent>
			{/* <ItemG container> */}
			<ItemG container xs={12}>
				<ItemG container xs={6}>
					<ItemG xs={12}>
						<T variant={'h6'}>{moment(props.tooltip.date).format('dddd')}</T>
					</ItemG>
					<ItemG xs={12}>
						<T varinat={'body2'}>{moment(props.tooltip.date).format('ll')}</T>
					</ItemG>
				</ItemG>
				<ItemG xs={6} container justify={'center'} alignItems={'flex-end'}>
					{renderIcon(props.id, props.tooltip)}
					{/* <T variant={'h5'}>{`${props.tooltip.value} m³`}</T>
					<img src={Droplet} alt={'water drop'} height={36} width={36} style={{ margin: 4 }} /> */}
				</ItemG>
			</ItemG>
			{/* </ItemG> */}
			{/* <Divider />
			<ItemG container xs={12}>
				<ItemG>
					Test
				</ItemG>
			</ItemG> */}

		</CardContent>
	</TCard>
}

export default MedianTooltip

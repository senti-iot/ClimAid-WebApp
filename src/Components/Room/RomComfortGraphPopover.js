import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import { Card, CardContent, Button, Backdrop } from '@material-ui/core';

const TCard = styled(Card)`
	position: absolute;
	top: -1000px;
	left: -1000px;
	min-width: 300px;
	min-height: 300px;
	border: 0;
	border-radius: 4;
	z-index: 2200;
	transition: 300ms all ease;
`;

// const keyToText = {
// 	warm: 'For varmt',
// 	cold: 'For koldt',
// 	windy: 'Træk',
// 	heavyair: 'Tung luft',
// 	good: 'Godt',
// 	tired: 'Træthed',
// 	itchyeyes: 'Tørre øjne og næse',
// 	lighting: 'Dårlig belysning',
// 	blinded: 'Blænding',
// 	noisy: 'Støj'
// };

const RomComfortGraphPopover = (props) => {
	const open = props.open;
	const left = props.left;
	const top = props.top;
	const onClose = props.onClose;
	const currentMeassurement = props.currentMeassurement;

	return (
		<Backdrop open={open} onClick={onClose} style={{ zIndex: 3000 }}>
			<TCard id='readingPopoverOpen' style={{ left: left, top: top }}>
				<CardContent>
					<div style={{ position: 'absolute', top: 0, right: -10 }}>
						<Button onClick={onClose}>
							<CloseIcon />
						</Button>
					</div>
					{/* {Object.keys(currentReading).map(key => {
											if (key !== 'ts' && key !== 'uts' && currentReading[key] > 0) {
												return <div key={key}>{keyToText[key]}: {currentReading[key]}</div>
											}
										})} */}
				</CardContent>
			</TCard>
		</Backdrop>
	)
}

export default RomComfortGraphPopover;

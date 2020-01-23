import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { colors } from '@material-ui/core'
import T from 'Components/Typography/T'
import styled from 'styled-components';

const arcStyles = makeStyles(theme => ({
	arc: {
		transform: 'translate(-50%, -50%) rotate(180deg)',
		transformOrigin: 'center'
	},
	innerArc: {
		fill: 'rgba(255,255,255, 0.1)'
	},
	outerArc: {
		// fill: props => colors[props.color][600]
	},
	outerArcG: {
		fill: colors['green'][500]
	},
	outerArcR: {
		fill: colors['red'][500]
	},
	label: {

	},
	prevText: {
		color: 'rgba(255,255,255, 0.5)'
	},
	totalUsage: {
		marginLeft: 16, marginTop: 16, fontWeight: 600,
		letterSpacing: 1, height: 32
	},
	totalUsageM: {
		marginLeft: 16, marginBottom: 16, height: 32
	},
}))
export const TotalUsageText = styled(T)`
	margin: 16px;
	font-weight: 600;
	letter-spacing: 1;
	height: 32px;
`
export const DataText = styled(({ prev, ...props }) => <T {...props} />)`
	color: ${({ prev }) => prev ? 'rgba(255,255,255,0.5)' : undefined};
	white-space: nowrap;
`
export const Arc = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
`
export const ArcContainer = styled.div`
	display: flex;
	flex-flow: column;
	justify-content: space-between;
	height: 100%;
	width: 100%;
`
export const TextContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform-origin: center;
	transform: translate(-50%, -50%);
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
`
export default arcStyles
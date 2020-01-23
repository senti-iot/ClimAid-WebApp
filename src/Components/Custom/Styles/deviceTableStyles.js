import { colors, Backdrop as MuiBackdrop, Paper, Button } from '@material-ui/core';
import { bgColors } from 'Styles/backgroundColors';
import { makeStyles } from '@material-ui/styles';
import styled from 'styled-components';
import { T } from 'Components';

const deviceTableStyles = makeStyles(theme => ({
	backgroundColor: {
		background: props => bgColors[props.color].background
	},
	dialogRoot: {
		top: 70,
		height: 'calc(100% - 70px)',
		background: 'rgba(0,0,0,0)',
	},
	paperRoot: {
		// margin: theme.spacing(5),
		borderRadius: 3,
		// overflow: 'hidden'
	},
	title: {
		padding: 24,
		borderRadius: "3px 3px 0px 0px",
		background: props => colors[props.color][700],
		color: '#fff'

	},

}))
export const DevicesSelected = styled(T)`
	border-radius: 4px;
	background: ${({ theme }) => theme.boxBackground};
    padding: 8px 16px;
    margin: 8px;
`
export const GetDevicesButton = styled(Button)`
	color: #fff;
	text-transform: none;
	margin:8px;
`
export const TitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 24px;
	border-radius: 3px 3px 0px 0px;
	/* background: ${({ theme }) => theme.boxBackground}; */
`
export const DPaper = styled(Paper)`
	border-radius: 3;
	background: ${({ theme }) => theme.appBackground};
`
export const Backdrop = styled(MuiBackdrop)`
	top: 70px;
	height: calc(100% - 70px);
	background: rgba(0,0,0,0);
`
export const DBox = styled(Paper)`
	margin: 30px;
	padding: 8px;
	background: ${({ theme }) => theme.boxBackground};
`
export default deviceTableStyles
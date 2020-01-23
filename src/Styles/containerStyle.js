import { bgColors } from './backgroundColors';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper'

// const containerStyles = makeStyles(theme => ({
// 	backgroundColor: {
// 		background: props => bgColors[props.color].background
// 	},
// 	gridItemBackground: {
// 		position: 'relative',
// 		height: 'calc(100% - 32px)',
// 		padding: '8px 16px',
// 		margin: 8,
// 		background: props => darken(hexToRgba(colors[props.color][700], 0.7), 0.5),
// 	}
// }))

export const BPaper = styled(Paper)`
	position: relative;
	height: calc(100% - 32px);
	padding: 8px 16px;
	margin: 8px;
	background: ${({ theme }) => theme.boxBackground};
	`;
export const AppBackground = styled.div`
	margin-top: 120px;
	height: calc(100vh - 120px);
	overflow-x: hidden;
	-webkit-overflow-scrolling: touch;
	background: ${props => bgColors[props.color].background};
	`
import { makeStyles } from '@material-ui/styles'
import { bgColors } from './backgroundColors'
import { darken } from '@material-ui/core/styles'
import hexToRgba from 'hex-to-rgba'
import { colors } from '@material-ui/core'

const tableStyles = makeStyles(theme => ({
	backgroundColor: {
		background: props => { return bgColors[props.color].background }
		// return ({
		// ...bgColors[props.color]
		// })
	},
	gridItemBackground: {
		position: 'relative',
		height: 'calc(100% - 32px)',
		padding: '8px 16px',
		margin: 8,
		// margin: 30,
		color: '#fff',
		background: props => darken(hexToRgba(colors[props.color][700], 0.7), 0.5),
	},
	// header: {
	// 	background: props => colors[props.color][700],
	// 	color: '#fff'
	// },

})
)

export default tableStyles


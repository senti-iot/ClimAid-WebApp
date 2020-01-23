import React, { useRef, useEffect } from 'react'
import d3Arc from './classes/d3Arc'
import { usePrevious, useSelector, useLocalization } from 'Hooks'
import { T } from 'Components'
import arcStyles, { TextContainer, ArcContainer, Arc, TotalUsageText, DataText } from 'Components/Custom/Styles/arcGraphStyles'
import moment from 'moment'
window.m = moment
let arc = null

function formatNumber(num) {
	// return num.toString()

	return num ? num.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0
}

const ArcGraph = (props) => {
	const arcChartContainer = useRef(null)
	const t = useLocalization()
	const arcData = useSelector(s => s.data.middleChartData.current['waterusage'])
	const arcPrevData = useSelector(s => s.data.middleChartData.previous['waterusage'])
	const period = useSelector(s => s.dateTime.period)
	// const [arcData, setArcData] = useState(generateArcData())

	const colorTheme = useSelector((state) => state.settings.colorTheme)
	const classes = arcStyles({ color: colorTheme })

	const unit = () => {
		switch (props.chart) {
			case 'waterusage':
				return 'm³'
			// case 'temperature':
			// 	return '\u2103'
			// case 'waterflow':
			// 	return 'L'
			// case 'readings':
			// 	return 'm3'
			default:
				return 'm³'
		}
	}

	const prevId = usePrevious(props.id)
	// useWhyDidYouUpdate('props', props)
	// useWhyDidYouUpdate('state', { arcData: arcData.toString() })
	useEffect(() => {
		const genNewArc = () => {
			let arcProps = {
				id: props.id,
				arcData: arcData,
				arcPrevData: arcPrevData,
				t: t,
				classes: classes
			}
			arc = new d3Arc(arcChartContainer.current, arcProps)
		}
		if (arc) {
			arc.destroy()
			genNewArc()
		}
		//eslint-disable-next-line
	}, [])

	useEffect(() => {
		const genNewArc = () => {
			let arcProps = {
				id: props.id,
				arcData: arcData,
				arcPrevData: arcPrevData,
				t: t,
				classes: classes
			}
			arc = new d3Arc(arcChartContainer.current, arcProps)
		}
		// if ((props.id !== prevId) && arc) {
		// 	arc.destroy()
		// 	genNewArc()
		// }
		if ((arcChartContainer.current && !arc)) {
			genNewArc()
		}
		let resizeTimer;
		const handleResize = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				arc.destroy()
				genNewArc()
			}, 300);
		}
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}

	}, [arcData, arcPrevData, classes, prevId, props.id, t])

	const displayTime = () => {
		switch (period.timeType) {
			case 1:
				return t('filters.dateOptions.thisWeek')
			case 2:
				return t('filters.dateOptions.7days')
			case 3:
				return t('filters.dateOptions.monthToDate')
			case 4:
				return t('filters.dateOptions.yearToDate')
			default:
				break;
		}
	}
	return (
		<ArcContainer>

			<TotalUsageText variant={'h5'}>{t('charts.totalUsage')}</TotalUsageText>
			<Arc id={props.id} ref={arcChartContainer}>
				<TextContainer >
					{period.from && period.to ? <T>{displayTime()}</T> : null}
					<DataText variant='h5'>{`${formatNumber(arcData)} ${unit()}`}</DataText>
					<DataText variant='h5' prev>{`/${formatNumber(arcPrevData)} ${unit()}`}</DataText>
				</TextContainer>
			</Arc>
			{/* <DataText></DataText> */}
			{/* <T className={classes.totalUsageM}>{arcData.current > arcPrevData.current ? t('charts.totalUsageMessages.more') : t('charts.totalUsageMessages.less')}</T> */}
		</ArcContainer>

	)
}

export default ArcGraph

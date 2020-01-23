import React from 'react'
import { ItemG, T, DateTimeFilter } from 'Components'
import ChartsButton from '../ChartsButton/ChartsButton'
import { Hidden } from '@material-ui/core'
import LineGraph from 'Components/Graphs/LineGraph'
import { useLocalization, useSelector } from 'Hooks'
import DateTimeArrows from 'Components/Input/DateTimeArrows'
import DateTimeDays from 'Components/Input/DateTimeDays'
import { ExportModule } from 'Components/ExportModule/ExportModule'

export const MainChart = React.memo((props) => {
	const { chart, setChart } = props
	const t = useLocalization()
	const isActive = (c) => chart === c ? true : false
	const handleSetChart = (c) => () => setChart(c)
	const selectedDevices = useSelector(s => s.appState.selectedDevices)

	return (
		<ItemG container /* justify={'space-between'} */ style={{ height: '100%', flexFlow: 'column' }}>
			<ItemG style={{ margin: '32px 32px 0px 32px' }}>
				<Hidden mdDown>
					<ItemG container justify={'space-evenly'}>
						<ItemG xs={3}>
							<ChartsButton onClick={handleSetChart('waterusage')} isActive={isActive('waterusage')}>{t('charts.types.waterusage')} </ChartsButton>
						</ItemG>
						<ItemG xs={3}>
							<ChartsButton onClick={handleSetChart('temperature')} isActive={isActive('temperature')}>{t('charts.types.temperature')}</ChartsButton>
						</ItemG>
						<ItemG xs={3}>
							<ChartsButton onClick={handleSetChart('waterflow')} isActive={isActive('waterflow')}>{t('charts.types.waterflow')}</ChartsButton>
						</ItemG>
						<ItemG xs={3}>
							<ChartsButton disabled={selectedDevices.length !== 1} onClick={handleSetChart('readings')} isActive={isActive('readings')}>{t('charts.types.readings')}</ChartsButton>
						</ItemG>
					</ItemG>
				</Hidden>
			</ItemG>
			<ItemG>
				<div style={{ margin: '16px 32px' }}>
					<ItemG container alignItems={'center'} justify={'space-between'}>
						<T variant={'h6'} style={{ fontWeight: 600, fontSize: '1.75rem', letterSpacing: 1.5 }}>{t(`charts.types.${chart}`)}</T>
						<DateTimeArrows />
						<DateTimeDays />
						<DateTimeFilter />
						<ExportModule />
					</ItemG>
				</div>
			</ItemG>
			<ItemG container style={{ flex: 1 }}>
				<LineGraph loading={props.loading} id={chart} />
			</ItemG>

		</ItemG>
	)
})
MainChart.whyDidYouRender = true;
// export default MainChart

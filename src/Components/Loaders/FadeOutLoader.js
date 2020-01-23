import React, { Fragment, useState, useEffect } from 'react'
import { Fade } from '@material-ui/core';
import { CircularLoader } from 'Components';
import { usePrevious } from 'Hooks';
import PropTypes from 'prop-types'
import CircularOverlay from './CircularOverlay';

function FadeOutLoader(props) {
	const [loading, setLoading] = useState(false)
	const [showLoader, setShowLoader] = useState(false)

	const on = props.on
	const prevOn = usePrevious(on)
	useEffect(() => {
		async function loadLoader() {
			const execute = async (on) => {
				if (on) {
					setLoading(true)
					setTimeout(async () => {
						setShowLoader(on)
						setLoading(false)
						await props.onChange()
					}, 1000);
				}
				else {
					setLoading(false)
					setShowLoader(false)
				}
			}
			if ((prevOn !== on) && on) {
				await execute(true)
			}
			if ((prevOn !== on) && !on) {
				await execute(false)
			}
		}
		loadLoader();
		return () => {

		}
	}, [on, prevOn, props])

	const { children, notCentered, circularClasses, overlay } = props

	return (
		<Fragment>
			{!overlay ?

				<Fade in={!loading}>
					{!showLoader ?
						children
						: <CircularLoader notCentered={notCentered} className={circularClasses} />}
				</Fade>
				: <div>
					<CircularOverlay overlay={showLoader} className={circularClasses} />
					{children}
				</div>

			}
		</Fragment>
	)
}

FadeOutLoader.propTypes = {
	on: PropTypes.bool.isRequired,
	notCentered: PropTypes.bool,
	circularClasses: PropTypes.object,
	onChange: PropTypes.func.isRequired,
}
export default FadeOutLoader

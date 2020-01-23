import React, {
	Fragment, useState
} from 'react'
import { IconButton, Menu, MenuItem, Button, Tooltip } from '@material-ui/core';
import { ItemG } from 'Components';
import { MoreVert } from 'variables/icons';
import { useLocalization } from 'Hooks';

const DMenu = (props) => {
	//#region Variables
	const [anchor, setAnchor] = useState(null)

	const t = useLocalization()
	const { menuItems, icon, button, divider, tooltip, buttonClassName } = props

	//#endregion

	//#region Handlers

	const handleOpenActionsDetails = event => {
		setAnchor(event.currentTarget)
		// setState({ anchor: event.currentTarget });
	}

	const handleCloseActionsDetails = () => {
		setAnchor(null)
		// setState({ anchor: null });
	}
	const handleMenuItemClick = (m) => e => {
		if (m.func) {
			m.func()
		}
		else {
			if (props.onChange)
				props.onChange(m.value)

		}
		handleCloseActionsDetails()
	}

	//#endregion
	return (
		<Fragment>
			{button && <Button
				aria-label='More'
				aria-owns={anchor ? 'long-menu' : null}
				aria-haspopup='true'
				style={{ color: 'rgba(0, 0, 0, 0.54)' }}
				onClick={handleOpenActionsDetails}>
				{icon ? icon : <MoreVert />}
			</Button>}
			{!button && <Tooltip title={tooltip ? tooltip : t('menus.menu')}>
				<IconButton
					aria-label='More'
					aria-owns={anchor ? 'long-menu' : null}
					aria-haspopup='true'
					classes={{
						root: buttonClassName
					}}
					onClick={handleOpenActionsDetails}>
					{icon ? icon : <MoreVert />}
				</IconButton>
			</Tooltip>}
			<Menu
				id='long-menu'
				anchorEl={anchor}
				open={Boolean(anchor)}
				onClose={handleCloseActionsDetails}
				disablePortal
				PaperProps={{ style: { minWidth: 200 } }}>
				{menuItems.map((m, i) => {
					if (m.dontShow)
						return null
					return <MenuItem divider={divider ? i === menuItems.length - 1 ? false : true : false} selected={m.selected} key={i}
						onClick={handleMenuItemClick(m)}>
						<ItemG container justify={'space-between'} alignItems={'center'}>
							{m.icon ? <ItemG style={{ display: 'flex', marginRight: 8 }}>{m.icon}</ItemG> : null}
							<ItemG xs>{m.label}</ItemG>
						</ItemG>
					</MenuItem>
				})}
			</Menu>
		</Fragment>
	)

}

export default DMenu

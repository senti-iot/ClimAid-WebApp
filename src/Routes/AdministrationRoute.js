import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Grid, Paper } from '@material-ui/core';

import { ItemG, GridContainer } from 'Components';
import AdministrationOrganisation from 'Components/Administration/AdministrationOrganisation';
import AdminBuildingsList from 'Components/Administration/AdminBuildingsList';
import AdminBuildingsAdd from 'Components/Administration/AdminBuildingsAdd';
import AdminBuildingsEdit from 'Components/Administration/AdminBuildingsEdit';
import AdminBuildingsView from 'Components/Administration/AdminBuildingsView';
import AdminZonesList from 'Components/Administration/AdminZonesList';
import AdminZonesAdd from 'Components/Administration/AdminZonesAdd';
import AdminZonesAddLevels from 'Components/Administration/AdminZonesAddLevels';
import AdminZonesEdit from 'Components/Administration/AdminZonesEdit';
import AdminUsersList from 'Components/Administration/AdminUsersList';
import AdminUsersAdd from 'Components/Administration/AdminUsersAdd';
import AdminDevicesList from 'Components/Administration/AdminDevicesList';
import AdminDevicesAdd from 'Components/Administration/AdminDevicesAdd';
import AdminDevicesEdit from 'Components/Administration/AdminDevicesEdit';
import AdminMenu from 'Components/Administration/AdminMenu';
import AdminInfobox from 'Components/Administration/AdminInfobox';
import adminStyles from 'Styles/adminStyles';

const AdministrationRoute = () => {
	const history = useHistory();

	const classes = adminStyles();

	return (
		<GridContainer spacing={2}>
			<ItemG xs={12}>
				<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={3}>
					<Grid container item xs={3} xl={2}>
						<Paper elevation={3} className={classes.adminPaperContainerMenu}>
							<AdminMenu />
						</Paper>
					</Grid>
					<Grid container item xs={6} xl={8}>
						<Switch>
							<Route path={'/administration/users/list'}>
								<AdminUsersList history={history} />
							</Route>
							<Route path={'/administration/users/add'}>
								<AdminUsersAdd history={history} />
							</Route>
							<Route path={['/administration/devices/:uuid/list', '/administration/devices/list']}>
								<AdminDevicesList history={history} />
							</Route>
							<Route path={['/administration/devices/:uuid/add', '/administration/devices/add']}>
								<AdminDevicesAdd history={history} />
							</Route>
							<Route path={'/administration/devices/:uuid/edit'}>
								<AdminDevicesEdit history={history} />
							</Route>
							<Route path={['/administration/zones/:uuid/list', '/administration/zones/list']}>
								<AdminZonesList history={history} />
							</Route>
							<Route path={'/administration/zones/add/levels'}>
								<AdminZonesAddLevels history={history} />
							</Route>
							<Route path={['/administration/zones/add/:uuid', '/administration/zones/add']}>
								<AdminZonesAdd history={history} />
							</Route>
							<Route path={'/administration/zones/:uuid/edit'}>
								<AdminZonesEdit history={history} />
							</Route>
							<Route path={'/administration/buildings/list'}>
								<AdminBuildingsList history={history} />
							</Route>
							<Route path={'/administration/buildings/add'}>
								<AdminBuildingsAdd history={history} />
							</Route>
							<Route path={'/administration/buildings/:uuid/edit'}>
								<AdminBuildingsEdit history={history} />
							</Route>
							<Route path={'/administration/buildings/view/:uuid'}>
								<AdminBuildingsView history={history} />
							</Route>
							<Route path={'/administration/organisation'}>
								<AdministrationOrganisation />
							</Route>
							<Redirect path={'*'} to={'/administration/organisation'}></Redirect>
						</Switch>
					</Grid>
					<Grid container item xs={3} xl={2}>
						<Paper elevation={3} className={classes.adminPaperContainer}>
							<AdminInfobox />
						</Paper>
					</Grid>
				</Grid>
			</ItemG>
		</GridContainer>
	);
}

export default AdministrationRoute;
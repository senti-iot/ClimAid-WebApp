import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';

import { ItemG, GridContainer } from 'Components';
import Administration from 'Components/Administration/Administration';
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

const AdministrationRoute = () => {
	const history = useHistory();

	return (
		<GridContainer spacing={2}>
			<ItemG xs={12}>
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
					<Route path={'/administration'}>
						<Administration />
					</Route>
					<Redirect path={'*'} to={'/administration'}></Redirect>
				</Switch>
			</ItemG>
		</GridContainer>
	);
}

export default AdministrationRoute;
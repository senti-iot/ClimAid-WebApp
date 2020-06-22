import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';

import { ItemG, GridContainer } from 'Components';
import Administration from 'Components/Administration/Administration';
import AdminBuildingsList from 'Components/Administration/AdminBuildingsList';
import AdminBuildingsAdd from 'Components/Administration/AdminBuildingsAdd';
import AdminBuildingsView from 'Components/Administration/AdminBuildingsView';
import AdminZonesList from 'Components/Administration/AdminZonesList';

const AdministrationRoute = () => {
	const history = useHistory();

	return (
		<GridContainer spacing={2}>
			<ItemG xs={12}>
				<Switch>
					<Route path={['/administration/zones/list/:uuid', '/administration/zones/list']}>
						<AdminZonesList history={history} />
					</Route>
					<Route path={'/administration/buildings/list'}>
						<AdminBuildingsList history={history} />
					</Route>
					<Route path={'/administration/buildings/add'}>
						<AdminBuildingsAdd history={history} />
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
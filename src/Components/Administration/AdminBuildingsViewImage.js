import React from 'react';

import { climaidApi } from 'data/climaid';

const AdminBuildingsViewImage = (props) => {
	return (
		<div>
			{props.building.image ? 
				<img style={{ maxWidth: 200 }} src={climaidApi.getBaseURL() + '/building/' + props.building.uuid + '/image'} alt="" />
				: "<p>Intet valgt</p>"
			}
		</div>
	);
}

export default AdminBuildingsViewImage;
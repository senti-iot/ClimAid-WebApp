import React from 'react';

const AdminBuildingsViewImage = (props) => {
	const { REACT_APP_CLIMAID_API_URL } = process.env;

	return (
		<div>
			{props.building.image ? 
				<img style={{ maxWidth: 200 }} src={REACT_APP_CLIMAID_API_URL + '/building/' + props.building.uuid + '/image'} alt="" />
				: "<p>Intet valgt</p>"
			}
		</div>
	);
}

export default AdminBuildingsViewImage;
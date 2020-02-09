import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Paper from '@material-ui/core/Paper';

import adminStyles from 'Styles/adminStyles';
import { getBuilding } from 'data/climaid';

const AdminBuildingsView = (props) => {
	const { uuid } = useParams();
	const [building, setBuilding] = useState(null);
	const classes = adminStyles();

	useEffect(() => {
		async function fetchData() {
			const data = await getBuilding(uuid);

			if (data) {
				setBuilding(data);
			}
		}

		fetchData();
	}, [uuid]);

	return (
		<Paper elevation={3} className={classes.adminPaperContainer}>
			{building ?
				<div>
					<h1 className={classes.adminHeader}>{building.name}</h1>
				</div>
				: ""}
		</Paper>
	)
}

export default AdminBuildingsView;
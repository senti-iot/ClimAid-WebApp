import React from 'react'
import { ItemG, GridContainer, InfoCard } from 'Components';
import { Business } from 'variables/icons';
import { useLocalization } from 'Hooks';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Grid } from '@material-ui/core';
import "leaflet/dist/leaflet.css";

const Area = () => {
	const t = useLocalization();
	const position = [57.0488, 9.9217];

	return (
		<Map center={position} zoom={18} style={{ height: "1000px", width: "100%" }}>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
			/>
			{/* <Marker position={position}>
				<Popup>Ja dav</Popup>
			</Marker> */}
		</Map>
	);
}

export default Area;
import React, { useEffect, useState } from 'react'
// import { useLocalization } from 'Hooks';
import { Map, Marker, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

import CircularLoader from 'Components/Loaders/CircularLoader';
import { getBuildings } from 'data/climaid';

const MapContainer = () => {
	const [buildings, setBuildings] = useState(null);
	const position = [57.0488, 9.9217];

	useEffect(() => {
		async function fetchData() {
			const data = await getBuildings();
			if (data) {
				setBuildings(data);
			}
		}

		fetchData();

		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
			iconUrl: require('leaflet/dist/images/marker-icon.png'),
			shadowUrl: require('leaflet/dist/images/marker-shadow.png')
		});
	}, []);

	const handleMarkerClick = (marker) => {
		console.log(marker);
	}

	return (
		<div style={{ height: "700px", width: "100%" }}>
			{buildings ?
				<Map center={position} zoom={18} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					/>
					{buildings.map(function(marker, index) {
						return (<Marker key={index} position={marker.latlong.split(',')} onClick={() => handleMarkerClick(marker)} />)
					})}
				</Map>
				: <CircularLoader /> }
		</div>
	);
}

export default MapContainer;
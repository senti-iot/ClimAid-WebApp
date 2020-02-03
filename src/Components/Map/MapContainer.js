import React from 'react'
// import { useLocalization } from 'Hooks';
import { Map, Marker, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

const MapContainer = () => {
	// const t = useLocalization();
	const position = [57.0488, 9.9217];
	const markerPos = [57.054010, 9.911410];
	const markers = [position, markerPos];

	React.useEffect(() => {
		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
			iconUrl: require('leaflet/dist/images/marker-icon.png'),
			shadowUrl: require('leaflet/dist/images/marker-shadow.png')
		});
	});

	const handleMarkerClick = (marker) => {
		console.log(marker);
	}

	return (
		<Map center={position} zoom={18} scrollWheelZoom={false} style={{ height: "1000px", width: "100%" }}>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
			/>
			{markers.map(function(marker, index) {
				console.log(marker);

				return (<Marker key={index} position={marker} onClick={() => handleMarkerClick(marker)} />)
			})}
		</Map>
	);
}

export default MapContainer;
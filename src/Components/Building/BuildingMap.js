import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router';
import { Map, ZoomControl } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

import buildingStyles from 'Styles/buildingStyles';

function BuildingMap(props) {
	const history = useHistory();
	const classes = buildingStyles();
	const mapRef = useRef(null);
	const { REACT_APP_CLIMAID_API_URL } = process.env;

	useEffect(() => {
		//leaflet hack to fix marker images
		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
			iconUrl: require('leaflet/dist/images/marker-icon.png'),
			shadowUrl: require('leaflet/dist/images/marker-shadow.png')
		});

		const w = 2550, h = 1691;
		const url = REACT_APP_CLIMAID_API_URL + '/building/' + props.building.uuid + '/image';

		if (mapRef.current !== null) {
			let map = mapRef.current.leafletElement;

			// calculate the edges of the image, in coordinate space
			var southWest = map.unproject([0, h], map.getMaxZoom() - 1);
			var northEast = map.unproject([w, 0], map.getMaxZoom() - 1);
			var bounds = new L.LatLngBounds(southWest, northEast);

			L.imageOverlay(url, bounds).addTo(map);
			map.setMaxBounds(bounds);

			var markers = [];
			var layerGroup = L.layerGroup(markers);
			layerGroup.addTo(map);

			var rectBounds = [[-134, 30], [-134, 68], [-180, 30], [-180, 68]];
			var rect = L.rectangle(rectBounds, { color: 'green', weight: 1 }).on('click', function (e) {
				handleMarkerClick(1);
			});
			layerGroup.addLayer(rect);

			var rectBounds1 = [[-120, 145], [-120, 193], [-163, 145], [-163, 193]];
			var rect2 = L.rectangle(rectBounds1, { color: 'blue', weight: 1 }).on('click', function (e) {
				handleMarkerClick(2);
			});
			layerGroup.addLayer(rect2);
		}
	});

	const handleMarkerClick = (roomId) => {
		history.push('/room/' + roomId);
	}

	return (
		<Map
			ref={mapRef}
			center={[0, 0]}
			minZoom={2}
			maxZoom={4}
			zoom={2}
			zoomControl={false}
			crs={L.CRS.Simple}
			scrollWheelZoom={false}
			className={classes.buildingMap}
		>
			<ZoomControl position="bottomright" />
		</Map>
	);
}

export default BuildingMap;
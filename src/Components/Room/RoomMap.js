import React, { useEffect, useRef } from 'react'
import { Map, ZoomControl } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

import buildingStyles from 'Styles/buildingStyles';
import { climaidApi } from 'data/climaid';

function RoomMap(props) {
	const classes = buildingStyles();
	const mapRef = useRef(null);
	const room = props.room;

	const markerIcon = L.Icon.extend({
		options: {
			iconSize: [50, 84],
			iconAnchor: [25, 84]
		}
	});

	const markerIconGood = new markerIcon({ iconUrl: '/images/marker1.svg' });
	// const markerIconAcceptable = new markerIcon({ iconUrl: '/images/marker2.svg' });
	// const markerIconUnacceptable = new markerIcon({ iconUrl: '/images/marker3.svg' });
	// const markerIconVeryUnacceptable = new markerIcon({ iconUrl: '/images/marker4.svg' });

	useEffect(() => {
		//leaflet hack to fix marker images
		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
			iconUrl: require('leaflet/dist/images/marker-icon.png'),
			shadowUrl: require('leaflet/dist/images/marker-shadow.png')
		});

		const w = 1440, h = 1080;
		const url = climaidApi.getBaseURL() + '/room/' + room.uuid + '/image';

		if (mapRef.current !== null) {
			let leafletMap = mapRef.current.leafletElement;

			// calculate the edges of the image, in coordinate space
			var southWest = leafletMap.unproject([0, h], leafletMap.getMaxZoom() - 1);
			var northEast = leafletMap.unproject([w, 0], leafletMap.getMaxZoom() - 1);
			var bounds = new L.LatLngBounds(southWest, northEast);
			L.imageOverlay(url, bounds).addTo(leafletMap);
			leafletMap.setMaxBounds(bounds);

			let markers = room.devices.map(device => {
				let position = device.position.split(',');
				return L.marker({ lat: position[0], lng: position[1] }, { icon: markerIconGood });
			});

			var layerGroup = L.layerGroup(markers);
			layerGroup.addTo(leafletMap);

			// leafletMap.on('click', function (e) {
			// 	var coord = e.latlng;
			// 	console.log(coord);
			// 	layerGroup.addLayer(L.marker(L.latLng(e.latlng)));
			// });

		}
	});

	return (
		<Map
			ref={mapRef}
			center={[0, 0]}
			minZoom={3}
			maxZoom={4}
			zoom={3}
			zoomControl={false}
			crs={L.CRS.Simple}
			scrollWheelZoom={false}
			className={classes.buildingMap}
		>
			<ZoomControl position="bottomright" />
		</Map>
	);
}

export default RoomMap;
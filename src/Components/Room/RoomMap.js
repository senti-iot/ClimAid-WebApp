import React, { useEffect, useRef, useState } from 'react'
import { Map } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';

import buildingStyles from 'Styles/buildingStyles';
import { climaidApi } from 'data/climaid';
import WeatherOnMap from 'Components/Room/WeatherOnMap';
import ComfortChart from 'Components/Building/ComfortChart';

function RoomMap(props) {
	const classes = buildingStyles();
	const mapRef = useRef(null);
	const room = props.room;
	const [draggable, setDraggable] = useState(false);
	const [comfortDiagramOpen, setComfortDiagramOpen] = useState(false);

	const markerIcon = L.Icon.extend({
		options: {
			iconSize: [50, 84],
			iconAnchor: [25, 84]
		}
	});

	useEffect(() => {
		//leaflet hack to fix marker images
		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
			iconUrl: require('leaflet/dist/images/marker-icon.png'),
			shadowUrl: require('leaflet/dist/images/marker-shadow.png')
		});

		// const w = 1440, h = 1080;
		// const url = ;

		if (mapRef.current !== null) {
			var leafletMap = mapRef.current.leafletElement;

			leafletMap.eachLayer(function (layer) {
				leafletMap.removeLayer(layer);
			});

			let buildingImage = new Image();
			buildingImage.onload = function () {
				// calculate the edges of the image, in coordinate space
				let southWest = leafletMap.unproject([0, this.height], leafletMap.getMaxZoom() - 1);
				let northEast = leafletMap.unproject([this.width, 0], leafletMap.getMaxZoom() - 1);
				let bounds = new L.LatLngBounds(southWest, northEast);
				L.imageOverlay(buildingImage.src, bounds).addTo(leafletMap);
				leafletMap.setMaxBounds(bounds);
			}
			buildingImage.src = climaidApi.getBaseURL() + '/room/' + room.uuid + '/image';

			let markers = [];
			// eslint-disable-next-line array-callback-return
			room.devices.map(device => {
				if (device.position && device.position.length) {
					let position = device.position.split(',');
					markers.push(L.marker({ lat: position[0], lng: position[1] }, { icon: new markerIcon({ iconUrl: '/images/marker1.svg' }) }));
				}
			});

			let layerGroup = L.layerGroup(markers);
			layerGroup.addTo(leafletMap);

			leafletMap.on('zoomend', function () {
				if (leafletMap.getZoom() === leafletMap.getMinZoom()) {
					setDraggable(false);
				} else {
					setDraggable(true);
				}
			});

			leafletMap.on('click', function (e) {
				var coord = e.latlng;
				console.log(coord);
				// layerGroup.addLayer(L.marker(L.latLng(e.latlng)));
			});

		}
	}, [room.uuid]);

	const openComfortDiagram = () => {
		setComfortDiagramOpen(true);
	}

	const closeComfortDiagram = () => {
		setComfortDiagramOpen(false);
	}

	return (
		<>
			<Map
				ref={mapRef}
				center={[0, 0]}
				minZoom={3}
				maxZoom={4}
				zoom={3}
				zoomControl={false}
				crs={L.CRS.Simple}
				scrollWheelZoom={false}
				touchZoom={false}
				doubleClickZoom={false}
				dragging={draggable}
				className={classes.buildingMap}
				attributionControl={false}
				style={{ backgroundColor: '#f5f5f5' }}
			>
				<WeatherOnMap room={room} />

				<div style={{ float: 'right', marginTop: 20, marginRight: 20 }}>
					<Button variant="contained" onClick={openComfortDiagram} style={{ backgroundColor: "#006367", color: '#fff' }}>Komfort diagram</Button>
				</div>
			</Map>

			{comfortDiagramOpen ?
				<Backdrop style={{ zIndex: 1000 }} open={comfortDiagramOpen}>
					<ComfortChart rooms={[room]} type="building" onClose={closeComfortDiagram} />
				</Backdrop>
				: ""}
		</>
	);
}

export default RoomMap;
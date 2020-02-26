import React, { useEffect, useRef, useState } from 'react'
import { Map, ZoomControl } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

import buildingStyles from 'Styles/buildingStyles';
import RoomInfo from 'Components/Room/RoomInfo';
import { climaidApi } from 'data/climaid';

function BuildingMap(props) {
	const [showingRoom, setShowingRoom] = useState(null);
	const [draggable, setDraggable] = useState(false);
	const classes = buildingStyles();
	const mapRef = useRef(null);
	const building = props.building;
	const rooms = props.rooms;

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

	const colors = { good: '#3fbfad', acceptable: '#e28117', unacceptable: '#d1463d', veryunacceptable: '#e56363' }

	useEffect(() => {
		//leaflet hack to fix marker images
		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
			iconUrl: require('leaflet/dist/images/marker-icon.png'),
			shadowUrl: require('leaflet/dist/images/marker-shadow.png')
		});

		const w = 2550, h = 1691;
		const url = climaidApi.getBaseURL() + '/building/' + building.uuid + '/image';

		if (mapRef.current !== null) {
			var leafletMap = mapRef.current.leafletElement;

			// calculate the edges of the image, in coordinate space
			let southWest = leafletMap.unproject([0, h], leafletMap.getMaxZoom() - 1);
			let northEast = leafletMap.unproject([w, 0], leafletMap.getMaxZoom() - 1);
			let bounds = new L.LatLngBounds(southWest, northEast);

			L.imageOverlay(url, bounds).addTo(leafletMap);
			leafletMap.setMaxBounds(bounds);

			let markers = [];
			let layerGroup = L.layerGroup(markers);
			layerGroup.addTo(leafletMap);

			leafletMap.on('zoomend', function () {
				if (leafletMap.getZoom() === leafletMap.getMinZoom()) {
					setDraggable(false);
				} else {
					setDraggable(true);
				}
			});


			// eslint-disable-next-line array-callback-return
			rooms.map(room => {
				if (room.bounds.length) {
					const rect = L.rectangle(room.bounds, { color: colors.good, weight: 1 });
					layerGroup.addLayer(rect);

					const marker = L.marker(rect.getBounds().getCenter(), { icon: markerIconGood }).on('click', function () {
						handleRoomClick(room);
					});

					layerGroup.addLayer(marker);
				}
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [climaidApi, building, rooms]);

	const handleRoomClick = (room) => {
		console.log(showingRoom);
		setShowingRoom(room);
		// if (showingRoom && room.uuid !== showingRoom.uuid) {
		// 	setShowingRoom(null);
		// 	setShowingRoom(room);
		// 	console.log(4);
		// } else if (!showingRoom) {
		// 	console.log(3);
		// 	setShowingRoom(room);
		// } else {
		// 	console.log(2);
		// 	setShowingRoom(null);
		// }
	}

	return (
		<>
			<Map
				ref={mapRef}
				center={[0, 0]}
				minZoom={2}
				maxZoom={4}
				zoom={2}
				zoomControl={false}
				crs={L.CRS.Simple}
				scrollWheelZoom={false}
				dragging={draggable}
				className={classes.buildingMap}
				attributionControl={false}
			>
				<ZoomControl position="bottomright" />
			</Map>

			{showingRoom && 
				<div style={{ position: 'absolute', left: 38, top: 158, width: 600, zIndex: 1000 }}>
					<RoomInfo room={showingRoom} />
				</div>
			}
		</>
	);
}

export default BuildingMap;
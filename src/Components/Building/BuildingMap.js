import React, { useEffect, useRef, useState } from 'react'
import { Map, ZoomControl } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

import buildingStyles from 'Styles/buildingStyles';
import RoomInfo from 'Components/Room/RoomInfo';

function BuildingMap(props) {
	const [showingRoom, setShowingRoom] = useState(null);
	const classes = buildingStyles();
	const mapRef = useRef(null);
	const { REACT_APP_CLIMAID_API_URL } = process.env;
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
		const url = REACT_APP_CLIMAID_API_URL + '/building/' + building.uuid + '/image';

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
	}, [REACT_APP_CLIMAID_API_URL, building, rooms]);

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
				className={classes.buildingMap}
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
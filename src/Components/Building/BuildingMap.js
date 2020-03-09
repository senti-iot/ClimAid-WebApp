import React, { useEffect, useRef, useState } from 'react'
import { Map, ZoomControl } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';

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

	const colors = { good: 'rgba(63,191,173,0.8)', acceptable: 'rgba(226,129,23,0.8)', unacceptable: 'rgba(209,70,61,0.8)', veryunacceptable: 'rgba(229,99,99,0.8)' }

	useEffect(() => {
		//leaflet hack to fix marker images
		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
			iconUrl: require('leaflet/dist/images/marker-icon.png'),
			shadowUrl: require('leaflet/dist/images/marker-shadow.png')
		});

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
			buildingImage.src = climaidApi.getBaseURL() + '/building/' + building.uuid + '/image';

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

			leafletMap.on('click', function(e) {
				console.log(e.latlng);
			});

			// eslint-disable-next-line array-callback-return
			rooms.map(room => {
				if (room.bounds.length) {
					let roomOverlay;
					if (room.bounds.length > 2) {
						roomOverlay = L.polygon(room.bounds, { color: colors.good, weight: 1 });
					} else {
						roomOverlay = L.rectangle(room.bounds, { color: colors.good, weight: 1 });
					}
					layerGroup.addLayer(roomOverlay);

					const marker = L.marker(roomOverlay.getBounds().getCenter(), { icon: markerIconGood }).on('click', function () {
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

	const closeRoomInfo = () => {
		setShowingRoom(null);
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
				<div style={{ position: 'absolute', left: 38, top: 158, width: 500, zIndex: 1000 }}>
					<div style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }} onClick={closeRoomInfo}><CloseTwoToneIcon /></div>
					<RoomInfo room={showingRoom} />
				</div>
			}
		</>
	);
}

export default BuildingMap;
import React, { useEffect, useRef, useState } from 'react'
import { Map, ZoomControl } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';

import buildingStyles from 'Styles/buildingStyles';
import RoomInfo from 'Components/Room/RoomInfo';
import { climaidApi, getRoomColorData } from 'data/climaid';
import ComfortChart from 'Components/Building/ComfortChart';

function BuildingMap(props) {
	const [showingRoom, setShowingRoom] = useState(null);
	const [draggable, setDraggable] = useState(false);
	const [comfortDiagramOpen, setComfortDiagramOpen] = useState(false);
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

	const colors = ['rgba(63,191,173,0.8)', 'rgba(226,129,23,0.8)', 'rgba(209,70,61,0.8)', 'rgba(229,99,99,0.8)'];

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

			// leafletMap.on('click', function(e) {
			// 	console.log(e.latlng);
			// });

			// eslint-disable-next-line array-callback-return
			rooms.map(async room => {
				if (room.bounds && room.bounds.length) {
					let device = null;
					let color = 0;
					if (room.devices.length) {
						device = room.devices[0];
						let colorData = await getRoomColorData([device.device]);

						if (colorData) {
							color = colorData.color;
						}
					}

					let roomOverlay;
					if (room.bounds.length > 2) {
						roomOverlay = L.polygon(room.bounds, { color: colors[color - 1], weight: 1 });
					} else {
						roomOverlay = L.rectangle(room.bounds, { color: colors[color - 1], weight: 1 });
					}
					layerGroup.addLayer(roomOverlay);

					const marker = L.marker(roomOverlay.getBounds().getCenter(), { icon: new markerIcon({ iconUrl: '/images/marker' + color + '.svg' }) }).on('click', function () {
						handleRoomClick(room);
					});

					layerGroup.addLayer(marker);
				}
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [building, rooms]);

	const handleRoomClick = (room) => {
		setShowingRoom(room);
	}

	const closeRoomInfo = () => {
		setShowingRoom(null);
	}

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

				<div style={{ float: 'right', marginTop: 20, marginRight: 20 }}>
					<Button variant="contained" onClick={openComfortDiagram} style={{ backgroundColor: "#006367", color: '#fff' }}>Komfort diagram</Button>
				</div>
			</Map>

			{showingRoom && 
				<div style={{ position: 'absolute', left: 38, top: 158, width: 500, zIndex: 1000 }}>
					<div style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }} onClick={closeRoomInfo}><CloseTwoToneIcon /></div>
					<RoomInfo room={showingRoom} />
				</div>
			}

			<Backdrop style={{ zIndex: 2000 }} open={comfortDiagramOpen} onClick={closeComfortDiagram}>
				<ComfortChart rooms={rooms} type="building" />
			</Backdrop>
		</>
	);
}

export default BuildingMap;
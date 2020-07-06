import React, { useEffect, useRef, useState } from 'react'
import { Map, ZoomControl } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { Grid } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import buildingStyles from 'Styles/buildingStyles';
import { climaidApi, getRoomColorData } from 'data/climaid';

function AdminBuildingMap(props) {
	const [draggable, setDraggable] = useState(false);
	const classes = buildingStyles();
	const mapRef = useRef(null);
	const building = props.building;
	const rooms = props.rooms;

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

			leafletMap.on('click', function (e) {
				console.log(e.latlng);
			});

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
				}
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [building, rooms]);

	const handleZoneChange = event => {
		console.log(event.target.value);
	}

	return (
		<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={3}>
			<Grid container item xs={3}>
				<div style={{ borderWidth: 1 }}>
					<RadioGroup>
						{rooms.map(room => {
							return (<FormControlLabel
								key={room.uuid}
								value={room.uuid}
								control={<Radio color="primary" onChange={handleZoneChange} />}
								label={room.name}
								labelPlacement="end"
							/>)
						})}
					</RadioGroup>
				</div>
			</Grid>
			<Grid container item xs={9}>
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
			</Grid>
		</Grid>
	);
}

export default AdminBuildingMap;
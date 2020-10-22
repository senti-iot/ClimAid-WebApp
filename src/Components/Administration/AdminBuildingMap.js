import React, { useEffect, useRef, useState } from 'react'
import { Map, ZoomControl } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import "leaflet-draw/dist/leaflet.draw.css";
import 'leaflet-draw';
import { Grid } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import buildingStyles from 'Styles/buildingStyles';
import { climaidApi } from 'data/climaid';

function AdminBuildingMap(props) {
	const [draggable, setDraggable] = useState(false);
	const [locations, setLocations] = useState({});
	const [selectedZone, setSelectedZone] = useState(null);
	const [layerGroup, setLayerGroup] = useState(null);
	const classes = buildingStyles();
	const mapRef = useRef(null);
	const building = props.building;
	const rooms = props.rooms;

	useEffect(() => {
		if (rooms) {
			let newLocations = {};
			// eslint-disable-next-line array-callback-return
			rooms.map(async room => {
				newLocations[room.uuid] = JSON.stringify(room.bounds);
			});

			setLocations(newLocations);
		}
	}, [rooms]);

	useEffect(() => {
		if (mapRef.current !== null) {
			//leaflet hack to fix marker images
			delete L.Icon.Default.prototype._getIconUrl;

			L.Icon.Default.mergeOptions({
				iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
				iconUrl: require('leaflet/dist/images/marker-icon.png'),
				shadowUrl: require('leaflet/dist/images/marker-shadow.png')
			});

			let leafletMap = mapRef.current.leafletElement;

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

			let drawnItems = new L.FeatureGroup();
			leafletMap.addLayer(drawnItems);
			setLayerGroup(drawnItems);

			let drawControl = new L.Control.Draw({
				position: 'topright',
				draw: {
					polygon: {
						allowIntersection: false,
						showArea: true,
						drawError: {
							color: '#ff0000',
							timeout: 1000
						}
					},
					polyline: false,
					circle: false,
					marker: false,
					circlemarker: false
				},
				edit: {
					featureGroup: drawnItems,
					remove: false
				}
			});
			leafletMap.addControl(drawControl);

			leafletMap.on('draw:created', function (e) {
				drawnItems.addLayer(e.layer);
			});

			// leafletMap.on('draw:edited', function (e) {
			// });

			leafletMap.on('zoomend', function () {
				if (leafletMap.getZoom() === leafletMap.getMinZoom()) {
					setDraggable(false);
				} else {
					setDraggable(true);
				}
			});
		}
	}, [building.uuid]);

	const handleZoneChange = zone => {
		let l;
		layerGroup.eachLayer((layer) => {
			l = layer;
		});
		if (selectedZone && l) {
			let newLocations = { ...locations };

			let latlngs = l.getLatLngs();
			let coords = [];
			// eslint-disable-next-line array-callback-return
			latlngs[0].map((point) => {
				coords.push([point.lat, point.lng]);
			});

			newLocations[selectedZone] = JSON.stringify(coords);
			setLocations(newLocations);

			props.saveLocations(newLocations);
		}

		layerGroup.eachLayer((layer) => {
			layerGroup.removeLayer(layer);
		});

		if (locations[zone]) {
			let bounds = JSON.parse(locations[zone]);

			if (bounds) {
				let zoneLayer;
				if (bounds.length > 2) {
					zoneLayer = L.polygon(bounds);
				} else {
					zoneLayer = L.rectangle(bounds);
				}

				layerGroup.addLayer(zoneLayer);
			}
		}

		setSelectedZone(zone);
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
								control={<Radio color="primary" onChange={(e) => handleZoneChange(e.target.value)} />}
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
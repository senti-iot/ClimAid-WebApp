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

function AdminZoneMap(props) {
	const [draggable, setDraggable] = useState(false);
	const [locations, setLocations] = useState({});
	const [selectedDevice, setSelectedDevice] = useState(null);
	const [layerGroup, setLayerGroup] = useState(null);
	const classes = buildingStyles();
	const mapRef = useRef(null);
	const zone = props.zone;
	const devices = props.devices;

	useEffect(() => {
		if (devices) {
			let newLocations = {};
			// eslint-disable-next-line array-callback-return
			devices.map(async device => {
				newLocations[device.uuid] = JSON.stringify(device.position);
			});

			setLocations(newLocations);
		}
	}, [devices]);

	useEffect(() => {
		if (mapRef.current !== null) {
			//leaflet hack to fix marker images
			delete L.Icon.Default.prototype._getIconUrl;

			L.Icon.Default.mergeOptions({
				iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
				iconUrl: require('leaflet/dist/images/marker-icon.png'),
				shadowUrl: require('leaflet/dist/images/marker-shadow.png')
			});

			const markerIcon = L.Icon.extend({
				options: {
					iconSize: [50, 84],
					iconAnchor: [25, 84],
					popupAnchor: [-3, -76],
					iconUrl: '/images/marker1.svg'
				}
			});

			let leafletMap = mapRef.current.leafletElement;

			leafletMap.eachLayer(function (layer) {
				leafletMap.removeLayer(layer);
			});

			let zoneImage = new Image();
			zoneImage.onload = function () {
				// calculate the edges of the image, in coordinate space
				let southWest = leafletMap.unproject([0, this.height], leafletMap.getMaxZoom() - 1);
				let northEast = leafletMap.unproject([this.width, 0], leafletMap.getMaxZoom() - 1);
				let bounds = new L.LatLngBounds(southWest, northEast);
				L.imageOverlay(zoneImage.src, bounds).addTo(leafletMap);
				leafletMap.setMaxBounds(bounds);
			}
			zoneImage.src = climaidApi.getBaseURL() + '/room/' + zone.uuid + '/image';

			let drawnItems = new L.FeatureGroup();
			leafletMap.addLayer(drawnItems);
			setLayerGroup(drawnItems);

			let drawControl = new L.Control.Draw({
				position: 'topright',
				draw: {
					polygon: false,
					polyline: false,
					circle: false,
					marker: {
						icon: new markerIcon()
					},
					circlemarker: false,
					rectangle: false
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

			leafletMap.on('zoomend', function () {
				if (leafletMap.getZoom() === leafletMap.getMinZoom()) {
					setDraggable(false);
				} else {
					setDraggable(true);
				}
			});
		}
	}, [zone.uuid]);

	const handleDeviceChange = device => {
		let l;
		layerGroup.eachLayer((layer) => {
			l = layer;
		});

		if (selectedDevice && l) {
			let newLocations = { ...locations };

			newLocations[selectedDevice] = JSON.stringify([l._latlng.lat, l._latlng.lng]);

			setLocations(newLocations);

			props.saveLocations(newLocations);
		}

		layerGroup.eachLayer((layer) => {
			layerGroup.removeLayer(layer);
		});

		if (locations[device] && locations[device].length) {
			let bounds = JSON.parse(locations[device]);

			if (bounds && bounds.length) {
				const deviceLayer = L.marker(bounds, {
					'icon': L.icon({
						iconSize: [50, 84],
						iconAnchor: [25, 84],
						popupAnchor: [-3, -76],
						iconUrl: '/images/marker1.svg'
					})
				});
				layerGroup.addLayer(deviceLayer);
			}
		}

		setSelectedDevice(device);
	}

	return (
		<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={3}>
			<Grid container item xs={3}>
				<div style={{ borderWidth: 1 }}>
					<RadioGroup>
						{devices.map(device => {
							return (<FormControlLabel
								key={device.uuid}
								value={device.uuid}
								control={<Radio color="primary" onChange={(e) => handleDeviceChange(e.target.value)} />}
								label={device.device}
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

export default AdminZoneMap;
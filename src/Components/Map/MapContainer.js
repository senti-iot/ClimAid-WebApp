import React, { useEffect, useRef, useState } from 'react'
// import { useLocalization } from 'Hooks';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { MeetingRoom, ArrowForward, ArrowBack } from 'variables/icons';
import otherStyles from 'Styles/otherStyles';
import { getBuildings } from 'data/climaid';

const MapContainer = (props) => {
	const [buildings, setBuildings] = useState(null);
	const [displayOverlay, setDisplayOverlay] = useState(false);
	const mapRef = useRef(null);
	const position = [57.0488, 9.9217];
	const classes = otherStyles();

	useEffect(() => {
		async function fetchData() {
			const data = await getBuildings();
			if (data) {
				plotMarkers(data);
			}
		}

		fetchData();

		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
			iconUrl: require('leaflet/dist/images/marker-icon.png'),
			shadowUrl: require('leaflet/dist/images/marker-shadow.png')
		});
	}, []);

	const plotMarkers = (data) => {
		setBuildings(data);

		if (mapRef.current !== null) {
			let leafletMap = mapRef.current.leafletElement;

			let markers = data.map((markerData, index) => {
				let marker = null;
				if (markerData.latlong.length) {
					marker = new L.marker(markerData.latlong.split(','));
					marker.on('click', function (e) {
						handleMarkerClick(markerData)
					});
				}
				return marker;
			});

			let featureGroup = new L.featureGroup(markers);
			featureGroup.addTo(leafletMap);
			leafletMap.fitBounds(featureGroup.getBounds());
		}
	}

	const handleMarkerClick = (marker) => {
		console.log(marker);
	}

	const handleGoToBuilding = (uuid) => {
		props.history.push('/building/' + uuid);
	}

	const toogleOverlay = () => {
		if (!displayOverlay) {
			setDisplayOverlay(true);
		} else {
			setDisplayOverlay(false);
		}
	}

	return (
		<div style={{ height: "700px", width: "100%" }}>
			{!displayOverlay ? 
				<div className={classes.mapInfoContainerToggleOff} onClick={toogleOverlay}>
					<ArrowForward style={{ color: '#b9bdbe' }} fontSize="large" />
				</div>
				: ""}

			{buildings && displayOverlay ?
				<div className={classes.mapInfoContainer}>
					<div className={classes.mapInfoContainerToggleOn} onClick={toogleOverlay}>
						<ArrowBack  />
					</div>
					<h1 className={classes.mapInfoContainerHeader}>God eftermiddag Helle<br />En bygning vælges nedenfor</h1>
					<h2 className={classes.mapInfoContainerSubHeader}>Her har du en liste af alle registrerede bygninger udstyret med en ERS Co2 indeklima sensorer</h2>
					<div className={classes.mapInfoContainerBuildingsContainer}>
						<Table className={classes.table} aria-label="buildings table" style={{ boxShadow: "none" }}>
							<TableBody>
								{buildings.map((building, index) => (
									<TableRow key={building.uuid} style={{ backgroundColor: index % 2 ? '#f6f7ff' : '#ffffff', height: 40 }}>
										<TableCell style={{ borderBottom: "none", borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}></TableCell>
										<TableCell style={{ borderBottom: "none" }} onClick={() => handleGoToBuilding(building.uuid)}>
											{building.name}
										</TableCell>
										<TableCell style={{ borderBottom: "none", borderTopRightRadius: 20, borderBottomRightRadius: 20 }} align="right"><MeetingRoom /></TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
				: ""}
			<Map
				ref={mapRef}
				center={position}
				zoom={18}
				zoomControl={false}
				scrollWheelZoom={false}
				style={{ height: "100%", width: "100%" }}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				/>
				<ZoomControl position="bottomright" />
			</Map>
		</div>
	);
}

export default MapContainer;
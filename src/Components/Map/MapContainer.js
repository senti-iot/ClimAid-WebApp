import React, { useEffect, useRef, useState } from 'react';
import { Map, TileLayer, ZoomControl, Marker, Popup, FeatureGroup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import { Grid } from '@material-ui/core';

import { MeetingRoom, ArrowForward, ArrowBack } from 'variables/icons';
import otherStyles from 'Styles/otherStyles';
import { getBuildings, getBuildingColorData, getBuildingDevices } from 'data/climaid';
import MapPopupBuilding from 'Components/Map/MapPopupBuilding';
import { useSelector } from 'Hooks';
import { ItemG } from 'Components';

const MapContainer = (props) => {
	const [buildings, setBuildings] = useState(null);
	const [displayOverlay, setDisplayOverlay] = useState(false);
	const mapRef = useRef(null);
	const groupRef = useRef(null);
	const position = [57.0488, 9.9217];
	const classes = otherStyles();
	const user = useSelector(state => state.settings.user)

	const markerIcon = L.Icon.extend({
		options: {
			iconSize: [50, 84],
			iconAnchor: [25, 84],
			popupAnchor: [-3, -76]
		}
	});

	useEffect(() => {
		async function fetchData() {
			const data = await getBuildings();

			if (data) {
				let buildingsWithColor = [];

				await Promise.all(
					data.map(async building => {
						let devicesFiltered = [];
						const devices = await getBuildingDevices(building.uuid);
						// eslint-disable-next-line array-callback-return
						devices.map(device => {
							if (device.type === 'data') {
								devicesFiltered.push(device.device);
							}
						})

						if (devicesFiltered.length) {
							let colorData = await getBuildingColorData(devicesFiltered, 'hour');

							if (colorData && colorData.length) {
								building.color = colorData[0].color;
							} else {
								building.color = 1;
							}
						}

						buildingsWithColor.push(building);
					})
				);

				setBuildings(buildingsWithColor);
			}
		}

		fetchData();

		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
			iconUrl: require('leaflet/dist/images/marker-icon.png'),
			shadowUrl: require('leaflet/dist/images/marker-shadow.png')
		});

		const zoomToFitMarkers = () => {
			if (!mapRef.current || !groupRef.current) {
				setTimeout(function () {
					zoomToFitMarkers();
				}, 500);
			} else {
				const map = mapRef.current.leafletElement;
				const group = groupRef.current.leafletElement;

				try {
					map.fitBounds(group.getBounds());
				} catch (e) {
					console.log('Could not fit bouds: ', e);
				}
			}
		}

		zoomToFitMarkers();
	}, []);

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

	const getWelcomeTime = () => {
		let string = "";
		const hour = moment().hour();

		if (hour >= 0 && hour < 6) {
			string = "God nat";
		} else if (hour >= 6 && hour < 9) {
			string = "God morgen";
		} else if (hour >= 9 && hour < 12) {
			string = "God formiddag";
		} else if (hour >= 12 && hour < 14) {
			string = "God middag";
		} else if (hour >= 14 && hour < 18) {
			string = "God eftermiddag";
		} else if (hour >= 18 && hour <= 23) {
			string = "God aften";
		}

		return string;
	}

	return (
		<div style={{ height: "1100px", width: "100%" }}>
			{!displayOverlay ? 
				<div className={classes.mapInfoContainerToggleOff} onClick={toogleOverlay}>
					<ArrowForward style={{ color: '#b9bdbe' }} fontSize="large" />
				</div>
				: 
				<div className={classes.mapInfoContainer}>
					<div className={classes.mapInfoContainerToggleOn} onClick={toogleOverlay}>
						<ArrowBack  />
					</div>
					<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={0}>
						<ItemG xs={7}>
							<h1 className={classes.mapInfoContainerHeader}>{getWelcomeTime()} {user.firstName}<br />En bygning vælges nedenfor</h1>
							<h2 className={classes.mapInfoContainerSubHeader}>Her har du en liste af alle registrerede bygninger udstyret med en ERS Co2 indeklima sensorer</h2>
						</ItemG>
						<ItemG xs={5}>
							<img src="/images/velkommen.svg" alt="" style={{ maxWidth: 300 }} />
						</ItemG>
					</Grid>
					<br />
					<br />

					<div className={classes.mapInfoContainerBuildingsContainer}>
						<Table className={classes.table} aria-label="buildings table" style={{ boxShadow: "none" }}>
							<TableBody>
								{buildings.map((building, index) => (
									<TableRow key={building.uuid} style={{ backgroundColor: index % 2 ? '#f6f7ff' : '#ffffff', height: 40, cursor: 'pointer' }}>
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
			}

			<Map
				ref={mapRef}
				center={position}
				zoom={18}
				maxZoom={19}
				zoomControl={false}
				scrollWheelZoom={false}
				style={{ height: "100%", width: "100%" }}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				/>
				<ZoomControl position="bottomright" />

				{buildings ? 
					<FeatureGroup ref={groupRef}>
						{buildings.map(building => {
							return (
								<Marker key={building.uuid} position={building.latlong.split(',')} icon={new markerIcon({ iconUrl: '/images/marker' + building.color + '.svg' })}>
									<Popup maxWidth={400} maxHeight={550} closeButton="">
										<MapPopupBuilding building={building} history={props.history} />
									</Popup>
								</Marker>
							);
						})}
					</FeatureGroup>
					: ""}
			</Map>
		</div>
	);
}

export default MapContainer;
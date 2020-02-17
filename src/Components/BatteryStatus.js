import React from 'react';

const BatteryStatus = (props) => {
	return (
		<div style={{ position: 'relative' }}>
			<div style={{ position: 'absolute', left: 35, top: 7, fontSize: 12, color: '#000' }}>{props.charge}%</div>
			<img src="/images/battery.svg" alt={props.charge} style={{ maxWidth: 45, marginTop: 5 }} />
		</div>
		
	);
}

export default BatteryStatus;
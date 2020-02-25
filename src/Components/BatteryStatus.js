import React from 'react';

const BatteryStatus = (props) => {
	return (
		<div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<div style={{ position: 'absolute', top: 7, fontSize: 12, color: '#000', width: 44, paddingRight: 4 }}>{props.charge}%</div>
			<img src="/images/battery.svg" alt={props.charge} style={{ width: 45, marginTop: 5 }} />
		</div>
		
	);
}

export default BatteryStatus;
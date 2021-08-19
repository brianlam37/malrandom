import React from 'react';
const Spinner = ({ type }) => {
	if (type === 'big') {
		return (
			<div className='spinner-page-container'>
				<div className='spinner spinner-big'>
					<div className='spinner-text'>Loading</div>
					<div className='spinner-sector spinner-sector-white  spinner-big'></div>
					<div className='spinner-sector spinner-sector-blue  spinner-big'></div>
					<div className='spinner-sector spinner-sector-grey  spinner-big'></div>
				</div>
			</div>
		);
	}
	return (
		<div className='spinner'>
			<div className='spinner-text'>Loading</div>
			<div className='spinner-sector spinner-sector-white'></div>
			<div className='spinner-sector spinner-sector-blue'></div>
			<div className='spinner-sector spinner-sector-grey'></div>
		</div>
	);
};

export default Spinner;

import React from 'react';
import axios from 'axios';

//Component for to switch dashboard series item to current series
const CurrentButton = ({
	type,
	setLoader,
	setCurrent,
	item,
	setData,
	setRandom,
}) => {
	const ifHasCurrent = () => {
		if (localStorage.getItem(item)) {
			return true;
		}
		return false;
	};
	const switchCurrent = async () => {
		setLoader(true);
		setCurrent(localStorage.getItem(item));
		try {
			const response = await axios.get(
				`https://api.jikan.moe/v3/${type}/${localStorage.getItem(item)}`
			);
			setLoader(false);
			setData(response.data);
			setRandom(false);
		} catch (err) {
			setLoader(false);
			console.log(err);
		}
	};

	return (
		<button
			className='dark-button button width100'
			onClick={() => switchCurrent()}
			disabled={!ifHasCurrent()}
		>
			Current {type}
		</button>
	);
};

export default CurrentButton;

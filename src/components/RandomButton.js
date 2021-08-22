import React from 'react';
import axios from 'axios';
const RandomButton = ({
	type,
	setRandom,
	setLoader,
	lastWord,
	setData,
	userData,
}) => {
	const getRandom = async () => {
		setRandom(true);
		setLoader(true);
		const listLength = userData[`${type}_stats`][`plan_to_${lastWord}`];
		try {
			const randomIndex = Math.floor(Math.random() * listLength);
			const pageNumber = Math.ceil(randomIndex / 300);
			const pageIndex = randomIndex - (pageNumber - 1) * 300;
			const response = await axios.get(
				`https://api.jikan.moe/v3/user/${userData.username}/${type}list/planto${lastWord}/${pageNumber}`
			);
			const randomSeries = response.data[type][pageIndex];
			const seriesData = await axios.get(
				`https://api.jikan.moe/v3/${type}/${randomSeries.mal_id}`
			);

			setLoader(false);
			setData(seriesData.data);
		} catch (err) {
			console.log(err);
			setLoader(false);
		}
	};
	return (
		<button
			className='dark-button width100'
			onClick={() => getRandom(type)}
			disabled={!userData}
		>
			Random {type}
		</button>
	);
};

export default RandomButton;
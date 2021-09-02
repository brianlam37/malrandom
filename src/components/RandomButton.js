import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

//To get a random series on the dashboard
const RandomButton = ({
	type,
	setRandom,
	setLoader,
	lastWord,
	setData,
	userData,
}) => {
	const [clicked, setClicked] = useState(false);
	const randomCallback = useCallback(
		(random) => {
			setRandom(random);
		},
		[setRandom]
	);
	const dataCallback = useCallback(
		(random) => {
			setData(random);
		},
		[setData]
	);
	const loaderCallback = useCallback(
		(random) => {
			setLoader(random);
		},
		[setLoader]
	);
	const clickCallback = useCallback(
		(random) => {
			setClicked(random);
		},
		[setClicked]
	);
	useEffect(() => {
		const source = axios.CancelToken.source();

		const getRandom = async () => {
			randomCallback(true);
			loaderCallback(true);
			const listLength = userData[`${type}_stats`][`plan_to_${lastWord}`];
			try {
				const randomIndex = Math.floor(Math.random() * listLength) + 1;

				const pageNumber = Math.ceil(randomIndex / 300);

				let pageIndex;
				if (pageNumber > 1) {
					pageIndex = pageNumber * 300 - randomIndex - 1;
				} else {
					pageIndex = randomIndex - 1;
				}

				const response = await axios.get(
					`https://api.jikan.moe/v3/user/${userData.username}/${type}list/planto${lastWord}/${pageNumber}`,
					{
						cancelToken: source.token,
					}
				);
				const randomSeries = response.data[type][pageIndex];
				const seriesData = await axios.get(
					`https://api.jikan.moe/v3/${type}/${randomSeries.mal_id}`,
					{
						cancelToken: source.token,
					}
				);

				loaderCallback(false);
				dataCallback(seriesData.data);
				clickCallback(false);
			} catch (err) {
				if (axios.isCancel(err)) {
				} else {
					loaderCallback(false);
					clickCallback(false);
					console.log(err);
				}
			}
		};
		if (userData && clicked) {
			getRandom();
		}

		return () => {
			source.cancel();
		};
	}, [
		lastWord,
		type,
		userData,
		dataCallback,
		loaderCallback,
		randomCallback,
		clicked,
		clickCallback,
	]);

	return (
		<button
			className='dark-button button width100'
			onClick={() => setClicked(true)}
			disabled={!userData}
		>
			Random {type}
		</button>
	);
};

export default RandomButton;

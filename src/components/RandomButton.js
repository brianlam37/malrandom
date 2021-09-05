import React, { useEffect, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './Dashboard';
import { MessageContext } from '../App';
//To get a random series on the dashboard
const RandomButton = (props) => {
	const { type, setRandom, setLoader, lastWord, setData } = props;
	const { userData } = useContext(UserContext);
	const { setMessage } = useContext(MessageContext);
	const [clicked, setClicked] = useState(false);
	const randomCallback = useCallback(
		(random) => {
			setRandom(random);
		},
		[setRandom]
	);
	const dataCallback = useCallback(
		(data) => {
			setData(data);
		},
		[setData]
	);
	const loaderCallback = useCallback(
		(loader) => {
			setLoader(loader);
		},
		[setLoader]
	);
	const clickCallback = useCallback(
		(click) => {
			setClicked(click);
		},
		[setClicked]
	);
	const messageCallback = useCallback(
		(message) => {
			setMessage(message);
		},
		[setMessage]
	);
	useEffect(() => {
		const source = axios.CancelToken.source();

		const getRandom = async () => {
			const listLength = userData[`${type}_stats`][`plan_to_${lastWord}`];
			try {
				randomCallback(true);
				loaderCallback(true);

				const pageNumber = Math.ceil(
					Math.random() * Math.ceil(listLength / 300)
				);

				const response = await axios.get(
					`https://api.jikan.moe/v3/user/${userData.username}/${type}list/planto${lastWord}/${pageNumber}`,
					{
						cancelToken: source.token,
					}
				);
				const randomIndex = Math.floor(
					Math.random() * response.data[type].length
				);
				const randomSeries = response.data[type][randomIndex];
				console.log(
					type,
					randomIndex,
					pageNumber,
					response.data[type].length
				);
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
					console.log(err);
					messageCallback(err.response.data.message);
					loaderCallback(false);
					clickCallback(false);
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
		messageCallback,
	]);

	return (
		<button
			className='dark-button button width100 capital-text'
			onClick={() => setClicked(true)}
			disabled={!userData}
		>
			Random {type}
		</button>
	);
};

export default RandomButton;

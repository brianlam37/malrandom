import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CurrentButton from './CurrentButton';
import RandomButton from './RandomButton';
import DashboardSeries from './DashboardSeries';
//Component which holds all of the dashboard info per series
const DashboardColumn = ({ setData, data, type, item, word, userData }) => {
	const [isLoading, setLoader] = useState(false);
	const [isRandom, setIsRandom] = useState(false);
	const [current, setCurrent] = useState();
	const dataCallback = useCallback(
		(data) => {
			setData(data);
		},
		[setData]
	);

	useEffect(() => {
		const getRandom = async () => {
			if (localStorage.getItem(item)) {
				setLoader(true);
				setCurrent(localStorage.getItem(item));
				try {
					const response = await axios.get(
						`https://api.jikan.moe/v3/${type}/${localStorage.getItem(
							item
						)}`
					);
					setLoader(false);
					dataCallback(response.data);
				} catch (err) {
					setLoader(false);
					console.log(err);
				}
			}
		};
		let mounted = true;
		if (mounted) {
			getRandom();
		}
		return () => (mounted = false);
	}, [item, type, dataCallback]);
	return (
		<div className='currentRandomColumn'>
			<DashboardSeries
				data={data}
				loader={isLoading}
				type={type}
				setCurrent={setCurrent}
				setRandom={setIsRandom}
				item={item}
				current={current}
				randomBoolean={isRandom}
				word={word}
			/>
			<CurrentButton
				type={type}
				setLoader={setLoader}
				item={item}
				setData={setData}
				setCurrent={setCurrent}
				setRandom={setIsRandom}
			/>
			<RandomButton
				type={type}
				setLoader={setLoader}
				setRandom={setIsRandom}
				setData={setData}
				lastWord={word}
				userData={userData}
			/>
		</div>
	);
};
export default DashboardColumn;

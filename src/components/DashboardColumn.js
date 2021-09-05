import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CurrentButton from './CurrentButton';
import RandomButton from './RandomButton';
import DashboardSeries from './DashboardSeries';
//Component which holds all of the dashboard info per series
const DashboardColumn = (props) => {
	const { setData, data, type, item, word } = props;
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
		const source = axios.CancelToken.source();
		const getSeries = async () => {
			try {
				const response = await axios.get(
					`https://api.jikan.moe/v3/${type}/${localStorage.getItem(
						item
					)}`,
					{
						cancelToken: source.token,
					}
				);

				setLoader(false);
				dataCallback(response.data);
			} catch (err) {
				if (axios.isCancel(err)) {
				} else {
					setLoader(false);
				}
				console.log(err);
			}
		};
		if (localStorage.getItem(item)) {
			setLoader(true);
			setCurrent(localStorage.getItem(item));
			getSeries();
		}

		return () => {
			source.cancel();
		};
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
			/>
		</div>
	);
};
export default DashboardColumn;

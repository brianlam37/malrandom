import React from 'react';
import Spinner from './Spinner';
import ListItem from './ListItem';
//Component which displays the series info
const DashboardSeries = ({
	data,
	loader,
	type,
	setCurrent,
	setRandom,
	item,
	word,
	current,
	randomBoolean,
}) => {
	const handleClick = (series, current) => {
		if (series.mal_id.toString() !== current) {
			localStorage.setItem(item, series.mal_id);
			setCurrent(series.mal_id.toString());
			setRandom(false);
		} else if (series.mal_id.toString() === current) {
			localStorage.removeItem(item);
			setCurrent(null);
		}
	};
	if (loader) {
		return <Spinner />;
	}
	if (data) {
		const isRandom = (randomBoolean) => {
			if (randomBoolean) {
				return <div>Random {type}:</div>;
			} else {
				return <div>Currently {word}ing</div>;
			}
		};

		return (
			<>
				{isRandom(randomBoolean)}
				<ListItem
					data={data}
					type={type}
					location={'dashboard'}
					current={current}
					handleClick={() => {
						handleClick(data, current, setCurrent);
					}}
				/>
			</>
		);
	}
	return null;
};

export default DashboardSeries;

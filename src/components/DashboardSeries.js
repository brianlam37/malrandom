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
	const isRandom = (randomBoolean) => {
		if (randomBoolean) {
			return (
				<div className='dashboard-series-random-current'>
					Random {type}:
				</div>
			);
		} else {
			return (
				<div className='dashboard-series-random-current'>
					Currently {word}ing:
				</div>
			);
		}
	};
	if (loader) {
		return (
			<>
				{isRandom(randomBoolean)}
				<div className='list-item'>
					<div className='list-item-img'>
						<Spinner />
					</div>
					<div className='list-item-info'>Loading</div>
					<div className='list-item-status'>
						<div>
							-<div className='dot'></div>-
						</div>
						<div className='total'>-</div>
					</div>
				</div>
			</>
		);
	}
	if (data) {
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
	return (
		<>
			{isRandom(randomBoolean)}
			<div className='list-item'>
				<div className='list-item-img'>Nothing here :(</div>
				<div className='list-item-info'>Click Random Button Below</div>
				<div className='list-item-status'>
					<div>
						-<div className='dot'></div>-
					</div>
					<div className='total'>-</div>
				</div>
			</div>
		</>
	);
};

export default DashboardSeries;

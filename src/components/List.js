import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import ListItem from './ListItem';
import Spinner from './Spinner';
const List = ({ type }) => {
	const [malUser, setMalUser] = useState(
		localStorage.getItem('malRandomUser') || null
	);
	const [current, setCurrent] = useState();

	const [list, setList] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [maxPages, setMaxPages] = useState(1);
	useEffect(() => {
		setMalUser(localStorage.getItem('malRandomUser'));
	}, []);
	useEffect(() => {
		if (type === 'manga') {
			setCurrent(localStorage.getItem('malRandomManga'));
		} else {
			setCurrent(localStorage.getItem('malRandomAnime'));
		}
	}, [type]);
	const getList = useCallback(
		async (pages, lastLetter) => {
			let dataList = [];
			for (let i = 1; i <= pages; i++) {
				const response = await axios.get(
					`https://api.jikan.moe/v3/user/${malUser}/${type}list/pt${lastLetter}/${i}`
				);
				const randomData = response.data[type];
				dataList = dataList.concat(randomData);
				if (i === pages) {
					return dataList;
				}
			}
		},
		[type, malUser]
	);
	useEffect(() => {
		const asyncEffect = async () => {
			let mounted = true;
			if (malUser) {
				setLoading(true);
				try {
					let user = await axios.get(
						`https://api.jikan.moe/v3/user/${malUser}`
					);
					let lastLetter = '';
					let pages = 1;
					if (type === 'manga') {
						lastLetter = 'r';
						pages = Math.ceil(
							user.data.manga_stats.plan_to_read / 300
						);
						setMaxPages(pages);
					} else {
						lastLetter = 'w';
						pages = Math.ceil(
							user.data.anime_stats.plan_to_watch / 300
						);
						setMaxPages(pages);
					}
					let dataList = await getList(pages, lastLetter);
					if (mounted) {
						setList(dataList);
						setLoading(false);
					}
				} catch (err) {
					console.log(err);
					setLoading(false);
				}
			}
			// axios
			// 	.get(
			// 		`https://api.jikan.moe/v3/user/${malUser}/${type}list/pt${lastLetter}`
			// 	)
			// 	.then((response) => {
			// 		if (mounted) {
			// 			setList(response.data[type]);
			// 			setLoading(false);
			// 		}
			// 	})
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});
			return () => (mounted = false);
		};
		asyncEffect();
	}, [malUser, type, getList]);
	const handleClick = (item) => {
		if (type === 'manga' && item.mal_id.toString() !== current) {
			localStorage.setItem('malRandomManga', item.mal_id);
			setCurrent(item.mal_id.toString());
		} else if (type === 'manga' && item.mal_id.toString() === current) {
			localStorage.removeItem('malRandomManga');
			setCurrent(null);
		} else if (type === 'anime' && item.mal_id.toString() === current) {
			localStorage.removeItem('malRandomAnime');
			setCurrent(null);
		} else if (type === 'anime' && item.mal_id.toString() !== current) {
			localStorage.setItem('malRandomAnime', item.mal_id);
			setCurrent(item.mal_id.toString());
		}
	};
	const checkLoading = () => {
		if (isLoading) {
			return <Spinner type={'big'} />;
		} else {
			return (
				<>
					<a
						href={`https://myanimelist.net/${type}list/${localStorage.getItem(
							'malRandomUser'
						)}`}
						rel='noopener noreferrer'
					>
						View your list on MyAnimeList
					</a>
					<div className='lists'>
						{list.map((l, index) => {
							return (
								<ListItem
									key={l.title + index}
									item={l}
									type={type}
									current={current}
									handleClick={handleClick}
								/>
							);
						}, 0)}
					</div>
				</>
			);
		}
	};
	return (
		<div className='lists-container'>
			<Navbar />
			{checkLoading()}
		</div>
	);
};

export default List;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import UserProfile from './UserProfile';
import Spinner from './Spinner';
import ListItem from './ListItem';

const UserPage = () => {
	const [malUser, setUser] = useState(
		localStorage.getItem('malRandomUser') || ''
	);
	const [searchData, setSearchData] = useState(null);
	const [userData, setUserData] = useState(null);
	const [clicked, setClicked] = useState(false);
	const [show, setShow] = useState(false);
	const [isMangaLoading, setMangaLoader] = useState(false);
	const [isAnimeLoading, setAnimeLoader] = useState(false);
	const [isSearchLoading, setSearchLoader] = useState(false);
	const [isLoading, setLoader] = useState(false);
	const [isRandomManga, setIsRandomManga] = useState(false);
	const [isRandomAnime, setIsRandomAnime] = useState(false);
	const [animeData, setAnimeData] = useState(null);
	const [currentAnime, setCurrentAnime] = useState();
	const [currentManga, setCurrentManga] = useState();
	const [mangaData, setMangaData] = useState(null);
	let timeOut = useRef();
	useEffect(() => {
		if (localStorage.getItem('malRandomUser')) {
			setLoader(true);
			axios
				.get(
					`https://api.jikan.moe/v3/user/${localStorage.getItem(
						'malRandomUser'
					)}`
				)
				.then((response) => {
					setLoader(false);
					setUserData(response.data);
				})
				.catch((err) => {
					setLoader(false);
					console.log(err);
				});
		}
	}, []);
	useEffect(() => {
		if (localStorage.getItem('malRandomAnime')) {
			setAnimeLoader(true);
			setCurrentAnime(localStorage.getItem('malRandomAnime'));
			axios
				.get(
					`https://api.jikan.moe/v3/anime/${localStorage.getItem(
						'malRandomAnime'
					)}`
				)
				.then((response) => {
					setAnimeLoader(false);
					setAnimeData(response.data);
				})
				.catch((err) => {
					setAnimeLoader(false);
					console.log(err);
				});
		}
		if (localStorage.getItem('malRandomManga')) {
			setCurrentManga(localStorage.getItem('malRandomManga'));
			setMangaLoader(true);
			axios
				.get(
					`https://api.jikan.moe/v3/manga/${localStorage.getItem(
						'malRandomManga'
					)}`
				)
				.then((response) => {
					setMangaLoader(false);
					setMangaData(response.data);
				})
				.catch((err) => {
					setMangaLoader(false);
					console.log(err);
				});
		}
	}, []);

	const handleSetUser = () => {
		localStorage.setItem('malRandomUser', searchData.username);
		if (localStorage.getItem('malRandomUser') === searchData.username) {
			setShow(true);
			localStorage.removeItem('malRandomAnime');
			localStorage.removeItem('malRandomManga');
			setMangaData(null);
			setAnimeData(null);
			clearTimeout(timeOut.current);
			setUserData(searchData);
		} else {
			setShow(true);
			clearTimeout(timeOut.current);
		}
	};

	useEffect(() => {
		timeOut.current = setTimeout(() => {
			setShow(false);
		}, 2000);
	}, [show, timeOut]);

	const handleSearch = (e) => {
		e.preventDefault();
		setSearchLoader(true);
		setSearchData(null);
		axios
			.get(`https://api.jikan.moe/v3/user/${malUser}`)
			.then((response) => {
				setSearchLoader(false);
				setSearchData(response.data);
				setClicked(true);
			})
			.catch((err) => {
				console.log(err);
				setSearchLoader(false);
				setSearchData(null);
				setClicked(true);
			});
	};

	const drawButton = () => {
		if (clicked && !isSearchLoading && !searchData) {
			return <div>No results...</div>;
		}
		if (clicked && !isSearchLoading && searchData) {
			return (
				<>
					<hr />
					<button
						className='primary-button'
						onClick={handleSetUser}
						disabled={show}
					>
						Set User
					</button>
				</>
			);
		}
	};
	const checkData = (data, loader, type) => {
		const handleClick = (item, current, setCurrent) => {
			if (type === 'manga' && item.mal_id.toString() !== current) {
				localStorage.setItem('malRandomManga', item.mal_id);
				setCurrent(item.mal_id.toString());
				setIsRandomManga(false);
			} else if (type === 'manga' && item.mal_id.toString() === current) {
				localStorage.removeItem('malRandomManga');
				setCurrent(null);
			} else if (type === 'anime' && item.mal_id.toString() === current) {
				localStorage.removeItem('malRandomAnime');
				setCurrent(null);
			} else if (type === 'anime' && item.mal_id.toString() !== current) {
				localStorage.setItem('malRandomAnime', item.mal_id);
				setCurrent(item.mal_id.toString());
				setIsRandomAnime(false);
			}
		};
		if (loader) {
			return <Spinner />;
		}
		if (data) {
			const setCurrent =
				type === 'manga' ? setCurrentManga : setCurrentAnime;
			const current = type === 'manga' ? currentManga : currentAnime;
			const isRandom = (randomBoolean) => {
				if (randomBoolean) {
					return <div>Random {type}:</div>;
				} else {
					return (
						<div>
							Currently{' '}
							{type === 'manga' ? 'reading:' : 'watching:'}{' '}
						</div>
					);
				}
			};

			return (
				<>
					{isRandom(type === 'manga' ? isRandomManga : isRandomAnime)}
					<ListItem
						item={data}
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
	};
	const drawRandomButton = (type) => {
		return (
			<button
				className='dark-button'
				onClick={() => getRandom(type)}
				disabled={!userData}
			>
				Random {type}
			</button>
		);
	};

	const getRandom = async (type) => {
		let lastLetter = '';
		let listLength = 0;
		if (type === 'manga') {
			lastLetter = 'r';
			setIsRandomManga(true);
			setMangaLoader(true);
			listLength = userData.manga_stats.plan_to_read;
		} else {
			lastLetter = 'w';
			setIsRandomAnime(true);
			setAnimeLoader(true);
			listLength = userData.anime_stats.plan_to_watch;
		}

		try {
			const randomIndex = Math.floor(Math.random() * listLength);
			const pageNumber = Math.ceil(randomIndex / 300);
			const pageIndex = randomIndex - (pageNumber - 1) * 300;
			const response = await axios.get(
				`https://api.jikan.moe/v3/user/${malUser}/${type}list/pt${lastLetter}/${pageNumber}`
			);
			const randomSeries = response.data[type][pageIndex];
			const seriesData = await axios.get(
				`https://api.jikan.moe/v3/${type}/${randomSeries.mal_id}`
			);
			if (type === 'manga') {
				setMangaLoader(false);
				setMangaData(seriesData.data);
			} else {
				setAnimeLoader(false);
				setAnimeData(seriesData.data);
			}
		} catch (err) {
			console.log(err);
			if (type === 'manga') {
				setMangaLoader(false);
			} else {
				setAnimeLoader(false);
			}
		}
	};
	return (
		<>
			<Navbar />
			<h3 className='page-title'>User Dashboard</h3>
			<div className='user-page'>
				<div className='user-info'>
					<UserProfile
						data={userData}
						isLoading={isLoading}
						type='normal'
					/>
				</div>

				<div className='user-currents'>
					<div className='currentRandomColumn'>
						{checkData(animeData, isAnimeLoading, 'anime')}
						{drawRandomButton('anime')}
					</div>
					<div className='currentRandomColumn'>
						{checkData(mangaData, isMangaLoading, 'manga')}
						{drawRandomButton('manga')}
					</div>
				</div>

				<div className='user-info'>
					<h4>Not You?</h4>
					<form>
						<label htmlFor='username'>MyAnimeList Username:</label>
						<div>
							<input
								name='username'
								value={malUser}
								onChange={(e) => setUser(e.target.value)}
								required
							></input>
							<button onClick={(e) => handleSearch(e)}>
								<i className='fas fa-search'></i>
							</button>
						</div>
					</form>
					<UserProfile
						data={searchData}
						isLoading={isSearchLoading}
					/>

					{drawButton()}
					{/* {notification()} */}
				</div>
			</div>
		</>
	);
};

export default UserPage;

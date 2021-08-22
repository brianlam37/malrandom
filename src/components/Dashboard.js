import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import UserProfile from './UserProfile';
import CurrentButton from './CurrentButton';
import RandomButton from './RandomButton';
import DashboardSeries from './DashboardSeries';
import DashboardForm from './DashboardForm';
const Dashboard = () => {
	const [userData, setUserData] = useState(null);
	const [isMangaLoading, setMangaLoader] = useState(false);
	const [isAnimeLoading, setAnimeLoader] = useState(false);
	const [isLoading, setLoader] = useState(false);
	const [isRandomManga, setIsRandomManga] = useState(false);
	const [isRandomAnime, setIsRandomAnime] = useState(false);
	const [animeData, setAnimeData] = useState(null);
	const [currentAnime, setCurrentAnime] = useState();
	const [currentManga, setCurrentManga] = useState();
	const [mangaData, setMangaData] = useState(null);
	useEffect(() => {
		const getUser = async () => {
			if (localStorage.getItem('malRandomUser')) {
				setLoader(true);
				try {
					const response = await axios.get(
						`https://api.jikan.moe/v3/user/${localStorage.getItem(
							'malRandomUser'
						)}`
					);
					setLoader(false);
					setUserData(response.data);
				} catch (err) {
					setLoader(false);
					console.log(err);
				}
			}
		};
		getUser();
	}, []);
	useEffect(() => {
		const getRandomAnime = async () => {
			if (localStorage.getItem('malRandomAnime')) {
				setAnimeLoader(true);
				setCurrentAnime(localStorage.getItem('malRandomAnime'));
				try {
					const response = await axios.get(
						`https://api.jikan.moe/v3/anime/${localStorage.getItem(
							'malRandomAnime'
						)}`
					);
					setAnimeLoader(false);
					setAnimeData(response.data);
				} catch (err) {
					setAnimeLoader(false);
					console.log(err);
				}
			}
		};
		getRandomAnime();
	}, []);
	useEffect(() => {
		const getRandomManga = async () => {
			if (localStorage.getItem('malRandomManga')) {
				setCurrentManga(localStorage.getItem('malRandomManga'));
				setMangaLoader(true);
				try {
					const response = await axios.get(
						`https://api.jikan.moe/v3/manga/${localStorage.getItem(
							'malRandomManga'
						)}`
					);
					setMangaLoader(false);
					setMangaData(response.data);
				} catch (err) {
					setMangaLoader(false);
					console.log(err);
				}
			}
		};
		getRandomManga();
	}, []);
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
						<DashboardSeries
							data={animeData}
							loader={isAnimeLoading}
							type={'anime'}
							setCurrent={setCurrentAnime}
							setRandom={setIsRandomAnime}
							item='malRandomAnime'
							current={currentAnime}
							randomBoolean={isRandomAnime}
							word={'watch'}
						/>
						<CurrentButton
							type={'anime'}
							setLoader={setAnimeLoader}
							item={'malRandomAnime'}
							setData={setAnimeData}
							setCurrent={setCurrentAnime}
							setRandom={setIsRandomAnime}
						/>
						<RandomButton
							type={'anime'}
							setLoader={setAnimeLoader}
							setRandom={setIsRandomAnime}
							setData={setAnimeData}
							lastWord={'watch'}
							userData={userData}
						/>
					</div>
					<div className='currentRandomColumn'>
						<DashboardSeries
							data={mangaData}
							loader={isMangaLoading}
							type={'manga'}
							setCurrent={setCurrentManga}
							setRandom={setIsRandomManga}
							item='malRandomManga'
							current={currentManga}
							randomBoolean={isRandomManga}
							word={'read'}
						/>
						<CurrentButton
							type={'manga'}
							setLoader={setMangaLoader}
							item={'malRandomManga'}
							setData={setMangaData}
							setCurrent={setCurrentManga}
							setRandom={setIsRandomManga}
						/>
						<RandomButton
							type={'manga'}
							setLoader={setMangaLoader}
							setRandom={setIsRandomManga}
							setData={setMangaData}
							lastWord={'read'}
							userData={userData}
						/>
					</div>
				</div>
				<DashboardForm
					setAnimeData={setAnimeData}
					setMangaData={setMangaData}
					setUserData={setUserData}
				/>
			</div>
		</>
	);
};

export default Dashboard;

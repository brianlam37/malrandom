import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import DashboardForm from './DashboardForm';
import DashboardColumn from './DashboardColumn';
//Component for the user page
const Dashboard = () => {
	const [userData, setUserData] = useState(null);
	const [isLoading, setLoader] = useState(false);
	const [animeData, setAnimeData] = useState(null);
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

	return (
		<>
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
					<DashboardColumn
						setData={setAnimeData}
						type='anime'
						item='malRandomAnime'
						word='watch'
						data={animeData}
						userData={userData}
					/>
					<DashboardColumn
						setData={setMangaData}
						type='manga'
						item='malRandomManga'
						word='read'
						data={mangaData}
						userData={userData}
					/>
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

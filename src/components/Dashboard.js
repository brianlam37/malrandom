import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import DashboardForm from './DashboardForm';
import DashboardColumn from './DashboardColumn';
import Modal from './Modal';
import Spinner from './Spinner';
//Component for the user page
const Dashboard = () => {
	const [userData, setUserData] = useState(null);
	const [isLoading, setLoader] = useState(false);
	const [animeData, setAnimeData] = useState(null);
	const [mangaData, setMangaData] = useState(null);
	const [show, setShow] = useState(false);
	useEffect(() => {
		const source = axios.CancelToken.source();
		const getUser = async () => {
			if (localStorage.getItem('malRandomUser')) {
				setLoader(true);
				try {
					const response = await axios.get(
						`https://api.jikan.moe/v3/user/${localStorage.getItem(
							'malRandomUser'
						)}`,
						{
							cancelToken: source.token,
						}
					);

					setLoader(false);
					setUserData(response.data);
				} catch (err) {
					if (axios.isCancel(err)) {
					} else {
						setLoader(false);
						console.log(err);
					}
				}
			}
		};
		getUser();
		return () => {
			source.cancel();
		};
	}, []);
	const onToggle = () => {
		setShow(!show);
	};
	const noUser = () => {
		if (userData) {
			return (
				<UserProfile
					data={userData}
					isLoading={isLoading}
					type='normal'
					show={true}
				/>
			);
		}
		if (isLoading) {
			return <Spinner />;
		}
		return (
			<DashboardForm
				setAnimeData={setAnimeData}
				setMangaData={setMangaData}
				setUserData={setUserData}
			/>
		);
	};
	return (
		<div className='title-content-container'>
			<h3 className='page-title'>User Dashboard</h3>

			<div className='user-page'>
				<div className='user-info'>
					<div className='dashboard-settings' onClick={onToggle}>
						<i className='fas fa-cog'></i>
					</div>
					{noUser()}
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
			</div>

			<Modal show={show} toggle={onToggle}>
				<div className='user-info'>
					<DashboardForm
						setAnimeData={setAnimeData}
						setMangaData={setMangaData}
						setUserData={setUserData}
					/>
				</div>
			</Modal>
		</div>
	);
};

export default Dashboard;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
//Component to switch users
const DashboardForm = ({ setAnimeData, setMangaData, setUserData }) => {
	const [malUser, setUser] = useState('');
	const [show, setShow] = useState(false);
	const [searchData, setSearchData] = useState(null);
	const [isSearchLoading, setSearchLoader] = useState(false);
	const [clicked, setClicked] = useState(false);
	let timeOut = useRef();
	useEffect(() => {
		timeOut.current = setTimeout(() => {
			setShow(false);
		}, 2000);
	}, [show, timeOut]);
	const handleSearch = (e) => {
		e.preventDefault();
		setClicked(true);
		setSearchLoader(true);
		setSearchData(null);
	};
	useEffect(() => {
		let mounted = true;
		const effect = async () => {
			if (isSearchLoading) {
				try {
					const response = await axios.get(
						`https://api.jikan.moe/v3/user/${malUser}`
					);
					if (mounted) {
						setSearchLoader(false);
						setSearchData(response.data);
					}
				} catch (err) {
					console.log(err);
					if (mounted) {
						setSearchLoader(false);
						setSearchData(null);
					}
				}
			}
		};
		effect();
		return () => (mounted = false);
	}, [isSearchLoading, malUser]);
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
			setSearchLoader(false);
		} else {
			setShow(true);
			clearTimeout(timeOut.current);
		}
	};
	const drawButton = () => {
		if (clicked && !isSearchLoading && !searchData) {
			return <div>No results...</div>;
		}
		if (clicked && !isSearchLoading && searchData) {
			return (
				<>
					<button
						className='primary-button button set-user-button'
						onClick={handleSetUser}
						disabled={show}
					>
						Set User
					</button>
				</>
			);
		}
	};
	return (
		<>
			<form className='user-form'>
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
			<UserProfile data={searchData} isLoading={isSearchLoading} />
			{drawButton()}
		</>
	);
};
export default DashboardForm;

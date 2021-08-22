import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
const DashboardForm = ({ setAnimeData, setMangaData, setUserData }) => {
	const [malUser, setUser] = useState(
		localStorage.getItem('malRandomUser') || ''
	);
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
	const handleSearch = async (e) => {
		e.preventDefault();
		setSearchLoader(true);
		setSearchData(null);
		try {
			const response = await axios.get(
				`https://api.jikan.moe/v3/user/${malUser}`
			);
			setSearchLoader(false);
			setSearchData(response.data);
			setClicked(true);
		} catch (err) {
			console.log(err);
			setSearchLoader(false);
			setSearchData(null);
			setClicked(true);
		}
	};
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
	return (
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
			<UserProfile data={searchData} isLoading={isSearchLoading} />
			{drawButton()}
		</div>
	);
};
export default DashboardForm;

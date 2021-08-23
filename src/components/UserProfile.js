import React from 'react';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
//The component that shows the user info on the dashboard
const UserProfile = ({ data, isLoading, type }) => {
	const checkImg = (data) => {
		if (!data.image_url) {
			return (
				<div className='no-img'>
					<i className='fa fa-camera'></i>
					<span className='text'>No Picture</span>
				</div>
			);
		} else {
			return (
				<img
					src={data.image_url}
					alt={`${data.username}'s profile pic`}
				/>
			);
		}
	};
	const displayLists = () => {
		if (data.username === localStorage.getItem('malRandomUser')) {
			return (
				<div className='lists'>
					<button className='dark-button'>
						<Link to='/list/anime/1'>Anime List</Link>
					</button>
					<button className='dark-button'>
						<Link to='/list/manga/1'>Manga List</Link>
					</button>
				</div>
			);
		}
	};
	if (type === 'normal') {
		if (!data && !isLoading) {
			return <div>Nobody here</div>;
		}
	}
	if (isLoading && !data) {
		return <Spinner />;
	} else if (data) {
		return (
			<div className='user-profile'>
				<div>
					<h4>{data.username}</h4>
					{checkImg(data)}
				</div>
				<a target='_blank' rel='noopener noreferrer' href={data.url}>
					Link to MAL Profile
				</a>
				{displayLists()}
			</div>
		);
	}
	return <></>;
};
export default UserProfile;

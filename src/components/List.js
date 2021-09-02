import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListItem from './ListItem';
import Spinner from './Spinner';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
//The component which displays the list per page
const List = ({ type }) => {
	const [malUser, setMalUser] = useState(
		localStorage.getItem('malRandomUser') || null
	);
	const [maxPages, setMaxPages] = useState(1);
	const [current, setCurrent] = useState();
	const [list, setList] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const item = type === 'manga' ? 'malRandomManga' : 'malRandomAnime';
	const lastWord = type === 'manga' ? 'read' : 'watch';
	const title = type === 'manga' ? 'Manga' : 'Anime';
	let { id } = useParams();
	useEffect(() => {
		setMalUser(localStorage.getItem('malRandomUser'));
	}, []);
	useEffect(() => {
		const source = axios.CancelToken.source();
		const asyncEffect = async () => {
			if (malUser) {
				try {
					const response = await axios.get(
						`https://api.jikan.moe/v3/user/${malUser}`,
						{
							cancelToken: source.token,
						}
					);
					const pageData =
						response.data[`${type}_stats`][`plan_to_${lastWord}`];
					setMaxPages(Math.ceil(pageData / 300));
				} catch (err) {
					if (axios.isCancel(err)) {
					} else {
						console.log(err);
					}
				}
			}
		};
		asyncEffect();
		return () => {
			source.cancel();
		};
	}, [lastWord, malUser, type]);
	useEffect(() => {
		setCurrent(item);
	}, [item]);
	useEffect(() => {
		const source = axios.CancelToken.source();
		const asyncEffect = async () => {
			if (malUser) {
				setLoading(true);
				try {
					const response = await axios.get(
						`https://api.jikan.moe/v3/user/${malUser}/${type}list/planto${lastWord}/${id}`,
						{
							cancelToken: source.token,
						}
					);
					const randomData = response.data[type];
					setList(randomData);
					setLoading(false);
				} catch (err) {
					if (axios.isCancel(err)) {
					} else {
						setLoading(false);

						console.log(err);
					}
				}
			}
		};
		asyncEffect();
		return () => {
			source.cancel();
		};
	}, [malUser, type, id, lastWord]);
	const pager = () => {
		const pages = [];
		for (let i = 1; i <= maxPages; i++) {
			pages.push(i);
		}
		return (
			<div className='pager'>
				<button
					className='dark-button button left-button'
					disabled={id === '1'}
				>
					<Link to={`/list/${type}/${parseInt(id) - 1}`}>
						{' '}
						<i className='fas fa-chevron-left'></i>
					</Link>
				</button>
				<div className='dropdown'>
					<div className='top-text'>
						<span>{id}</span> <i className='fa fa-caret-down'></i>
					</div>
					<div id='dropdown-container'>
						{pages.map((p) => {
							return (
								<Link
									className='dropdown-button '
									key={`/list/${type}/${p}`}
									to={`/list/${type}/${p}`}
								>
									{p}
								</Link>
							);
						})}
					</div>
				</div>
				<button
					className='dark-button button right-button'
					disabled={id === maxPages.toString()}
				>
					<Link to={`/list/${type}/${parseInt(id) + 1}`}>
						{' '}
						<i className='fas fa-chevron-right'></i>
					</Link>
				</button>
			</div>
		);
	};
	if (isLoading) {
		return <Spinner type={'big'} />;
	} else {
		const handleClick = (series, current) => {
			if (series.mal_id.toString() !== current) {
				localStorage.setItem(item, series.mal_id);
				setCurrent(series.mal_id.toString());
			} else if (series.mal_id.toString() === current) {
				localStorage.removeItem(item);
				setCurrent(null);
			}
		};
		return (
			<>
				<h2 id='list-title'>{title} List</h2>
				{pager()}
				<a
					id='list-link'
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
								data={l}
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

export default List;
